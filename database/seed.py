from sqlalchemy import select

from backend.database import (
    Base,
    SessionLocal,
    engine,
)

from backend.models import Veiculo


# Garante que todas as tabelas existam
# antes de executar o seed.
Base.metadata.create_all(
    bind=engine
)


PLACAS = [
    "TAT0E31",
    "TAS1H32",
    "TAT0E26",
    "SDQ4E27",
    "SDQ2A89",
    "TAS6J81",
    "TAS6J83",
    "TAS6J97",
    "TAS7A15",
    "TAS6J79",
    "TAS6J87",
    "TAS6J88",
    "TAS6J89",
    "TAS6J80",
    "TAS6J90",
    "TAS6J92",
    "TAS7A14",
    "TAS6J85",
    "TAS7A12",
    "TAS6J86",
    "TAS6J55",

    "TBF2C98",
    "TBF2D48",
    "TBF2D47",
    "TBF2D53",
    "TBF2C89",
    "TBF2C95",
    "TBF2D20",
    "TBF2C99",
    "TBF2C90",
    "TBJ6G71",
    "TBF2D31",
    "TBF2D43",
    "TBF2D44",
    "TBF2C96",
    "TBJ6G82",
    "TBF2C87",
    "TBJ6G86",
    "TBF2D55",
    "TBF2D24",

    "RUL7F51",
    "RUL7F50",
    "TYT9J04",
    "TYT9J07",
    "TYT9J08-SDD",
    "TYT9J09",
    "TYT9J12",
    "TYT9J15",
    "TYT9J16",
    "TYT9J13-SDD",
    "TYT9J01",
    "TYT9J02-SDD",
    "TYT9J06-SDD",
    "TYT9J10",
    "UBG6D17",

    # Veículos encontrados
    # na lista de manutenção
    "TAS9F61",
    "TBF2F86",
    "TBF2D21",
    "TBF2F89",
    "RUM3C45",
    "RUL7F56",
    "RUM3C22",
    "TAS6J75",
    "TAS7A20",
    "TAS6J93",
    "TAS0E26",
    "TBF2D59",
    "TBF2D27",
    "TBF2F50",
    "TBJ6G73",
]


def criar_frota():

    db = SessionLocal()

    try:

        adicionados = 0
        existentes = 0

        for placa_original in PLACAS:

            placa = (
                placa_original
                .strip()
                .upper()
            )

            veiculo_existente = db.scalar(

                select(
                    Veiculo
                )
                .where(

                    Veiculo.placa
                    ==
                    placa

                )

            )

            if veiculo_existente:

                existentes += 1

                continue


            veiculo = Veiculo(

                placa=
                    placa,

                tipo=
                    None,

                categoria=
                    "Frota fixa",

                observacao=
                    None,

                ativo=
                    True,

            )


            db.add(
                veiculo
            )


            adicionados += 1


        db.commit()


        print("")
        print(
            "Seed concluído com sucesso."
        )

        print(
            f"Veículos adicionados: "
            f"{adicionados}"
        )

        print(
            f"Veículos já existentes: "
            f"{existentes}"
        )

        print(
            f"Total processado: "
            f"{len(PLACAS)}"
        )


    except Exception as erro:

        db.rollback()


        print("")
        print(
            "Erro ao cadastrar frota:"
        )

        print(
            erro
        )


    finally:

        db.close()


if __name__ == "__main__":

    criar_frota()