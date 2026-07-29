from __future__ import annotations

import os
from pathlib import Path

from sqlalchemy import create_engine, func, select, text

import backend.models  # registra todos os modelos
from backend.database import Base


BASE_DIR = Path(__file__).resolve().parent.parent
SQLITE_PATH = BASE_DIR / "database" / "hawk_operations.db"
SQLITE_URL = f"sqlite:///{SQLITE_PATH.as_posix()}"

POSTGRES_URL = os.getenv("POSTGRES_URL")

TABLE_ORDER = (
    "veiculos",
    "motoristas",
    "manutencoes",
    "operacoes",
)


def contar_registros(conexao, tabela):
    consulta = select(func.count()).select_from(tabela)
    return conexao.execute(consulta).scalar_one()


def main():
    if not POSTGRES_URL:
        raise RuntimeError(
            "A variável POSTGRES_URL não foi encontrada."
        )

    if not SQLITE_PATH.exists():
        raise FileNotFoundError(
            f"Banco SQLite não encontrado: {SQLITE_PATH}"
        )

    sqlite_engine = create_engine(SQLITE_URL)
    postgres_engine = create_engine(
        POSTGRES_URL,
        pool_pre_ping=True,
    )

    print("Criando as tabelas no PostgreSQL...")
    Base.metadata.create_all(bind=postgres_engine)

    tabelas = Base.metadata.tables

    with postgres_engine.connect() as destino:
        contagens_destino = {
            nome: contar_registros(destino, tabelas[nome])
            for nome in TABLE_ORDER
        }

    tabelas_com_dados = {
        nome: total
        for nome, total in contagens_destino.items()
        if total > 0
    }

    if tabelas_com_dados:
        raise RuntimeError(
            "A migração foi cancelada porque o PostgreSQL "
            f"já possui dados: {tabelas_com_dados}"
        )

    contagens_origem = {}

    with sqlite_engine.connect() as origem:
        with postgres_engine.begin() as destino:
            for nome in TABLE_ORDER:
                tabela = tabelas[nome]

                registros = [
                    dict(linha._mapping)
                    for linha in origem.execute(
                        select(tabela)
                    ).all()
                ]

                contagens_origem[nome] = len(registros)

                if registros:
                    destino.execute(
                        tabela.insert(),
                        registros,
                    )

                print(
                    f"{nome}: {len(registros)} registros copiados"
                )

            for nome in TABLE_ORDER:
                destino.execute(
                    text(
                        f"""
                        SELECT setval(
                            pg_get_serial_sequence(
                                '{nome}',
                                'id'
                            ),
                            COALESCE(MAX(id), 1),
                            MAX(id) IS NOT NULL
                        )
                        FROM "{nome}"
                        """
                    )
                )

    print()
    print("Verificando a migração...")

    with postgres_engine.connect() as destino:
        for nome in TABLE_ORDER:
            total_postgres = contar_registros(
                destino,
                tabelas[nome],
            )
            total_sqlite = contagens_origem[nome]

            situacao = (
                "OK"
                if total_postgres == total_sqlite
                else "DIVERGENTE"
            )

            print(
                f"{nome}: SQLite={total_sqlite} | "
                f"PostgreSQL={total_postgres} | "
                f"{situacao}"
            )

            if total_postgres != total_sqlite:
                raise RuntimeError(
                    f"Divergência encontrada em {nome}."
                )

    print()
    print("Migração concluída com sucesso.")


if __name__ == "__main__":
    main()
