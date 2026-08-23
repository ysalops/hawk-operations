"""Substitui a base operacional pelo panorama informado em 18/07/2026.

Uso dentro do container:
    python -m backend.reset_base_20260718 --confirmar

ATENÇÃO: remove veículos, motoristas, ajudantes, operações e manutenções atuais.
"""

import argparse
from datetime import date

# Importar main garante create_all + migrações leves antes do reset.
from backend import main as _main  # noqa: F401
from backend import models
from backend.database import SessionLocal

DATA = date(2026, 7, 18)
TURNO = "Não informado"

FROTA = [
    ("TAS0E26", "CARREGANDO", "426292126", "vitória", None),
    ("TAT0E31", "CARREGANDO", "426218248", "ana caroline", None),
    ("SDQ4E27", "SEM_CLASSIFICACAO", None, "Henrique gouveia", "*"),
    ("TAS6J97", "CARREGANDO", "426166483", "Henrique gouveia", None),
    ("TAS7A15", "IMPEDIDO", None, None, None),
    ("TAS6J79", "CARREGANDO", "426168996", "alexandre C", None),
    ("TAS6J87", "FOLGA", None, None, None),
    ("TAS6J88", "CARREGANDO", "426194973", "Carlito", None),
    ("TAS6J80", "CARREGANDO", "426279946", "Paulo vitor", None),
    ("TAS6J92", "SEM_CLASSIFICACAO", "426192110", "Camila", None),
    ("TAS7A14", "FOLGA", None, None, None),
    ("TAS7A12", "IMPEDIDO", None, None, "sem drive"),
    ("TAS9F55", "CARREGANDO", "426237274", "Lucas Gustavo", None),
    ("TBF2C98", "CARREGANDO", "426083197", "Leandro rodrigues", None),
    ("TBF2D48", "CARREGANDO", "426248222", "Gustavo Salvi", None),
    ("TBF2D44", "INDISPONIVEL_MOTORISTA", None, None, "sem drive"),
    ("TBF2D47", "IMPEDIDO", None, "airam soares", "pausado pelo meli"),
    ("TBF2C99", "CARREGANDO", "426086746", "camilo", None),
    ("TBJ6G71", "CARREGANDO", "426086291", "Vinicius Alexandre", None),
    ("TBF2C96", "CARREGANDO", "426176367", "Gustavo Gonçalves", None),
    ("TBJ6G86", "CARREGANDO", "426186720", "natan silva", None),
    ("TBF2D55", "CARREGANDO", "426082469", None, None),
    ("TBF2D24", "CARREGANDO", "426082924", "rogerio Luiz", None),
    ("TBF2F86", "IMPEDIDO", None, "gabriela barbosa", None),
    ("RUL7F56", "CARREGANDO", "426248656", None, None),
    ("RUL7F51", "IMPEDIDO", None, "Welis", None),
    ("RUM3C22", "CARREGANDO", "426164138", "Matheus Brandão", None),
    ("TYT9J04", "CARREGANDO", "426165384", None, None),
    ("TYT9J07", "CARREGANDO", "426179230", "Leonardo", None),
    ("TYT9J08", "CARREGANDO", "426167442", "adriely", None),
    ("TYT9J09", "CARREGANDO", "426207405", "reinaldo", None),
    ("TYT9J12", "CARREGANDO", "424952690", "Dener Oliveira", None),
    ("TYT9J15", "CARREGANDO", "426280968", "Pedro Henrique", None),
    ("TYT9J16", "SEM_CLASSIFICACAO", None, None, None),
    ("TYT9J13", "SEM_CLASSIFICACAO", "426236910", None, None),
    ("TYT9J01", "CARREGANDO", "426261368", "Thiago Andrade", None),
    ("TYT9J02", "IMPEDIDO", None, "marcos roberto", "pausado pelo loss"),
    ("TYT9J06", "IMPEDIDO", None, "Eduardo carvalho", "drive sofreu sinistro dia 29/07"),
    ("TYT9J10", "CARREGANDO", "426225696", "valdiomar", None),
    ("UBG6D17", "CARREGANDO", "426175436", "Lucas p", None),
]

MANUTENCOES = [
    ("TAS1H32", "colisão"),
    ("TAS6J86", "troca de pneus"),
    ("TAS7A20", ""),
    ("TBF2D48", "pneus, bateria, porta lateral, luz de injeção"),
    ("TBF2C96", "pneus e freio"),
    ("TBF2D53", "freios"),
    ("TBF2D27", "turbina"),
    ("TBF2C90", "turbina"),
    ("TBJ6G73", ""),
    ("RUL7F50", ""),
    ("TBL2E79", ""),
]


def executar() -> None:
    db = SessionLocal()
    try:
        # Ordem importante por causa das relações.
        db.query(models.Operacao).delete(synchronize_session=False)
        db.query(models.Manutencao).delete(synchronize_session=False)
        db.query(models.Ajudante).delete(synchronize_session=False)
        db.query(models.Motorista).delete(synchronize_session=False)
        db.query(models.Veiculo).delete(synchronize_session=False)
        db.query(models.PanoramaConfiguracao).delete(synchronize_session=False)
        db.flush()

        placas = {item[0] for item in FROTA} | {item[0] for item in MANUTENCOES}
        veiculos = {}
        for placa in sorted(placas):
            veiculo = models.Veiculo(
                placa=placa.upper(),
                tipo=None,
                categoria="Frota fixa",
                observacao=None,
                ativo=True,
            )
            db.add(veiculo)
            db.flush()
            veiculos[placa.upper()] = veiculo

        motoristas = {}
        for _, _, _, nome, _ in FROTA:
            if not nome:
                continue
            chave = nome.strip().casefold()
            if chave not in motoristas:
                motorista = models.Motorista(
                    nome=nome.strip(),
                    cpf=None,
                    telefone=None,
                    cnh=None,
                    categoria_cnh=None,
                    validade_cnh=None,
                    observacao=None,
                    ativo=True,
                )
                db.add(motorista)
                db.flush()
                motoristas[chave] = motorista

        for placa, status, rota, nome, observacao in FROTA:
            motorista_id = None
            if nome:
                motorista_id = motoristas[nome.strip().casefold()].id
            db.add(
                models.Operacao(
                    data=DATA,
                    turno=TURNO,
                    veiculo_id=veiculos[placa.upper()].id,
                    motorista_id=motorista_id,
                    ajudante_id=None,
                    rota_id=rota,
                    status=status,
                    observacao=observacao,
                    origem="PANORAMA_INFORMADO",
                )
            )

        for placa, motivo in MANUTENCOES:
            db.add(
                models.Manutencao(
                    veiculo_id=veiculos[placa.upper()].id,
                    motivo=motivo or "Motivo não informado",
                    data_entrada=DATA,
                    previsao_retorno=None,
                    data_retorno=None,
                    status="EM_MANUTENCAO",
                )
            )

        db.add(
            models.PanoramaConfiguracao(
                id=1,
                unidade="SSP17: SBC",
                operador="Operador",
            )
        )

        db.commit()

        print("Base substituída com sucesso.")
        print(f"Veículos únicos cadastrados: {len(placas)}")
        print(f"Motoristas identificados: {len(motoristas)}")
        print(f"Registros de frota em {DATA.strftime('%d/%m/%Y')}: {len(FROTA)}")
        print(f"Manutenções: {len(MANUTENCOES)}")
        print("Ajudantes: 0 (nenhum nome de ajudante foi fornecido no panorama).")
        print("Observação: o texto recebido informa 58 veículos, mas contém 49 placas únicas.")
    except Exception:
        db.rollback()
        raise
    finally:
        db.close()


if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("--confirmar", action="store_true")
    args = parser.parse_args()
    if not args.confirmar:
        raise SystemExit(
            "Reset não executado. Use --confirmar somente depois de fazer backup."
        )
    executar()
