import re


# =====================================================
# STATUS PADRÃO DO HAWK
# =====================================================

STATUS_VALIDOS = {
    "CARREGANDO",
    "RESERVA_CARREGANDO",
    "FOLGA",
    "IMPEDIDO",
    "SEM_CARGA",
    "OUTRO_SERVICE",
    "INDISPONIVEL_MOTORISTA",
}


# =====================================================
# TRADUÇÃO DOS STATUS DO SITE
# =====================================================

MAPA_STATUS = {

    # CARREGANDO

    "carregando":
        "CARREGANDO",

    "em rota":
        "CARREGANDO",

    "loaded":
        "CARREGANDO",

    "loading":
        "CARREGANDO",


    # RESERVA

    "reserva":
        "RESERVA_CARREGANDO",

    "carro reserva":
        "RESERVA_CARREGANDO",

    "reserva carregando":
        "RESERVA_CARREGANDO",


    # FOLGA

    "folga":
        "FOLGA",

    "day off":
        "FOLGA",


    # IMPEDIDO

    "impedido":
        "IMPEDIDO",

    "impedido de rodar":
        "IMPEDIDO",

    "bloqueado":
        "IMPEDIDO",


    # SEM CARGA

    "sem carga":
        "SEM_CARGA",

    "no load":
        "SEM_CARGA",


    # OUTRO SERVICE

    "outro service":
        "OUTRO_SERVICE",

    "outro serviço":
        "OUTRO_SERVICE",

    "another service":
        "OUTRO_SERVICE",


    # MOTORISTA INDISPONÍVEL

    "indisponivel motorista":
        "INDISPONIVEL_MOTORISTA",

    "indisponível motorista":
        "INDISPONIVEL_MOTORISTA",

    "motorista indisponivel":
        "INDISPONIVEL_MOTORISTA",

    "motorista indisponível":
        "INDISPONIVEL_MOTORISTA",

}


# =====================================================
# TEXTO
# =====================================================

def limpar_texto(
    valor
):

    if valor is None:

        return None


    texto = str(
        valor
    ).strip()


    return (
        texto
        if texto
        else None
    )


# =====================================================
# PLACA
# =====================================================

def normalizar_placa(
    placa
):

    placa = limpar_texto(
        placa
    )


    if not placa:

        return None


    placa = (
        placa
        .upper()
        .strip()
    )


    placa = re.sub(
        r"\s+",
        "",
        placa,
    )


    return placa


# =====================================================
# MOTORISTA
# =====================================================

def normalizar_motorista(
    motorista
):

    motorista = limpar_texto(
        motorista
    )


    if not motorista:

        return None


    return " ".join(

        parte.capitalize()

        for parte in motorista.split()

    )


# =====================================================
# TURNO
# =====================================================

def normalizar_turno(
    turno
):

    turno = limpar_texto(
        turno
    )


    if not turno:

        return None


    mapa = {

        "manha":
            "Manhã",

        "manhã":
            "Manhã",

        "morning":
            "Manhã",

        "tarde":
            "Tarde",

        "afternoon":
            "Tarde",

        "noite":
            "Noite",

        "night":
            "Noite",

    }


    chave = (
        turno
        .strip()
        .lower()
    )


    return mapa.get(
        chave,
        turno,
    )


# =====================================================
# STATUS
# =====================================================

def normalizar_status(
    status
):

    status = limpar_texto(
        status
    )


    if not status:

        return None


    # Já está no padrão Hawk

    status_maiusculo = (

        status
        .strip()
        .upper()

    )


    if (
        status_maiusculo
        in STATUS_VALIDOS
    ):

        return status_maiusculo


    # Traduz status externo

    chave = (

        status
        .strip()
        .lower()

    )


    return MAPA_STATUS.get(
        chave
    )


# =====================================================
# REGISTRO
# =====================================================

def normalizar_registro(
    registro
):

    placa = normalizar_placa(

        registro.get(
            "placa"
        )

    )


    motorista = normalizar_motorista(

        registro.get(
            "motorista"
        )

    )


    rota_id = limpar_texto(

        registro.get(
            "rota_id"
        )

        or

        registro.get(
            "rota"
        )

    )


    status_original = (

        registro.get(
            "status"
        )

    )


    status = normalizar_status(
        status_original
    )


    observacao = limpar_texto(

        registro.get(
            "observacao"
        )

    )


    return {

        "placa":
            placa,

        "motorista":
            motorista,

        "rota_id":
            rota_id,

        "status":
            status,

        "observacao":
            observacao,

        "_status_original":
            status_original,

    }


# =====================================================
# COLETA COMPLETA
# =====================================================

def normalizar_coleta(
    dados
):

    registros_normalizados = []

    pendencias = []


    for indice, registro in enumerate(

        dados.get(
            "registros",
            []
        )

    ):

        registro_normalizado = (
            normalizar_registro(
                registro
            )
        )


        if (
            not
            registro_normalizado[
                "placa"
            ]
        ):

            pendencias.append({

                "linha":
                    indice + 1,

                "motivo":
                    "Registro sem placa.",

            })


            continue


        if (
            not
            registro_normalizado[
                "status"
            ]
        ):

            pendencias.append({

                "linha":
                    indice + 1,

                "placa":
                    registro_normalizado[
                        "placa"
                    ],

                "motivo":
                    (
                        "Status não reconhecido: "
                        f"{registro_normalizado['_status_original']}"
                    ),

            })


            continue


        registro_normalizado.pop(

            "_status_original",

            None,

        )


        registros_normalizados.append(

            registro_normalizado

        )


    coleta = {

        "data":
            dados.get(
                "data"
            ),

        "turno":
            normalizar_turno(

                dados.get(
                    "turno"
                )

            ),

        "origem":
            dados.get(
                "origem"
            )
            or
            "HAWK_COLLECTOR",

        "registros":
            registros_normalizados,

    }


    return {

        "coleta":
            coleta,

        "pendencias":
            pendencias,

    }