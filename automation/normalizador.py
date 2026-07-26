import re
import unicodedata


# =====================================================
# STATUS PADRÃO DO HAWK
# =====================================================

STATUS_VALIDOS = {
    # STATUS VINDOS DO LAST MILE
    "CARREGANDO",
    "EM_ROTA",
    "CONCLUIDA",
    "RETORNANDO_ESTACAO",
    "AMBULANCIA",

    # STATUS MANUAIS DO HAWK
    "RESERVA_CARREGANDO",
    "FOLGA",
    "IMPEDIDO",
    "SEM_CARGA",
    "OUTRO_SERVICE",
    "INDISPONIVEL_MOTORISTA",
}


# Quando a mesma placa aparece em mais de uma rota,
# mantemos o status operacional mais relevante.
PRIORIDADE_STATUS = {
    "CONCLUIDA": 10,
    "CARREGANDO": 20,
    "EM_ROTA": 30,
    "RETORNANDO_ESTACAO": 40,
    "AMBULANCIA": 50,

    "RESERVA_CARREGANDO": 20,
    "FOLGA": 20,
    "IMPEDIDO": 20,
    "SEM_CARGA": 20,
    "OUTRO_SERVICE": 20,
    "INDISPONIVEL_MOTORISTA": 20,
}


# =====================================================
# TRADUÇÃO DOS STATUS EXTERNOS
# =====================================================

MAPA_STATUS = {
    # CARREGANDO
    "carregando": "CARREGANDO",
    "loaded": "CARREGANDO",
    "loading": "CARREGANDO",
    "ready": "CARREGANDO",
    "ready to start": "CARREGANDO",
    "ready_to_start": "CARREGANDO",
    "assigned": "CARREGANDO",
    "pending": "CARREGANDO",
    "created": "CARREGANDO",

    # EM ROTA
    "em rota": "EM_ROTA",
    "active": "EM_ROTA",
    "started": "EM_ROTA",
    "in progress": "EM_ROTA",
    "in_progress": "EM_ROTA",
    "on route": "EM_ROTA",
    "on_route": "EM_ROTA",

    # CONCLUÍDA
    "concluida": "CONCLUIDA",
    "concluída": "CONCLUIDA",
    "close": "CONCLUIDA",
    "closed": "CONCLUIDA",
    "complete": "CONCLUIDA",
    "completed": "CONCLUIDA",
    "concluded": "CONCLUIDA",
    "finished": "CONCLUIDA",

    # RETORNANDO PARA A ESTAÇÃO
    "retornando estacao": "RETORNANDO_ESTACAO",
    "retornando estação": "RETORNANDO_ESTACAO",
    "return to station": "RETORNANDO_ESTACAO",
    "return_to_station": "RETORNANDO_ESTACAO",
    "returning to station": "RETORNANDO_ESTACAO",
    "returning_to_station": "RETORNANDO_ESTACAO",
    "returned to station": "RETORNANDO_ESTACAO",
    "returned_to_station": "RETORNANDO_ESTACAO",

    # AMBULÂNCIA
    "ambulancia": "AMBULANCIA",
    "ambulância": "AMBULANCIA",
    "ambulance": "AMBULANCIA",

    # RESERVA
    "reserva": "RESERVA_CARREGANDO",
    "carro reserva": "RESERVA_CARREGANDO",
    "reserva carregando": "RESERVA_CARREGANDO",

    # FOLGA
    "folga": "FOLGA",
    "day off": "FOLGA",

    # IMPEDIDO
    "impedido": "IMPEDIDO",
    "impedido de rodar": "IMPEDIDO",
    "bloqueado": "IMPEDIDO",

    # SEM CARGA
    "sem carga": "SEM_CARGA",
    "no load": "SEM_CARGA",

    # OUTRO SERVICE
    "outro service": "OUTRO_SERVICE",
    "outro servico": "OUTRO_SERVICE",
    "outro serviço": "OUTRO_SERVICE",
    "another service": "OUTRO_SERVICE",

    # MOTORISTA INDISPONÍVEL
    "indisponivel motorista": "INDISPONIVEL_MOTORISTA",
    "indisponível motorista": "INDISPONIVEL_MOTORISTA",
    "motorista indisponivel": "INDISPONIVEL_MOTORISTA",
    "motorista indisponível": "INDISPONIVEL_MOTORISTA",
}


# =====================================================
# TEXTO
# =====================================================

def limpar_texto(valor):
    if valor is None:
        return None

    texto = str(
        valor
    ).strip()

    if not texto:
        return None

    return re.sub(
        r"\s+",
        " ",
        texto,
    )


def criar_chave_texto(valor):
    texto = limpar_texto(
        valor
    )

    if not texto:
        return None

    texto_sem_acento = "".join(
        caractere
        for caractere in unicodedata.normalize(
            "NFKD",
            texto,
        )
        if not unicodedata.combining(
            caractere
        )
    )

    return texto_sem_acento.casefold()


# =====================================================
# PLACA
# =====================================================

def normalizar_placa(placa):
    placa = limpar_texto(
        placa
    )

    if not placa:
        return None

    return re.sub(
        r"\s+",
        "",
        placa.upper(),
    )


# =====================================================
# MOTORISTA
# =====================================================

def normalizar_motorista(motorista):
    return limpar_texto(
        motorista
    )


# =====================================================
# TURNO
# =====================================================

def normalizar_turno(turno):
    chave = criar_chave_texto(
        turno
    )

    if not chave:
        return None

    mapa = {
        "manha": "Manhã",
        "morning": "Manhã",
        "am": "Manhã",

        "tarde": "Tarde",
        "afternoon": "Tarde",
        "pm": "Tarde",

        "noite": "Noite",
        "night": "Noite",
    }

    return mapa.get(
        chave,
        limpar_texto(
            turno
        ),
    )


# =====================================================
# STATUS
# =====================================================

def normalizar_status(status):
    status = limpar_texto(
        status
    )

    if not status:
        return None

    status_maiusculo = (
        status
        .strip()
        .upper()
    )

    if status_maiusculo in STATUS_VALIDOS:
        return status_maiusculo

    chave = criar_chave_texto(
        status
    )

    return MAPA_STATUS.get(
        chave
    )


# =====================================================
# REGISTRO
# =====================================================

def normalizar_registro(registro):
    if not isinstance(
        registro,
        dict,
    ):
        return {
            "placa": None,
            "tipo_veiculo": None,
            "motorista": None,
            "rota_id": None,
            "status": None,
            "cluster": None,
            "observacao": None,
            "_status_original": None,
            "_erro_estrutura": (
                "O registro não é um objeto JSON."
            ),
        }

    status_original = registro.get(
        "status"
    )

    return {
        "placa": normalizar_placa(
            registro.get(
                "placa"
            )
        ),

        "tipo_veiculo": limpar_texto(
            registro.get(
                "tipo_veiculo"
            )
            or
            registro.get(
                "tipo"
            )
        ),

        "motorista": normalizar_motorista(
            registro.get(
                "motorista"
            )
        ),

        "rota_id": limpar_texto(
            registro.get(
                "rota_id"
            )
            or
            registro.get(
                "rota"
            )
        ),

        "status": normalizar_status(
            status_original
        ),

        "cluster": limpar_texto(
            registro.get(
                "cluster"
            )
        ),

        "observacao": limpar_texto(
            registro.get(
                "observacao"
            )
        ),

        "_status_original": status_original,
        "_erro_estrutura": None,
    }


# =====================================================
# MESCLAR ROTAS DA MESMA PLACA
# =====================================================

def adicionar_texto_unico(
    texto_atual,
    novo_texto,
    separador=" / ",
):
    texto_atual = limpar_texto(
        texto_atual
    )

    novo_texto = limpar_texto(
        novo_texto
    )

    if not novo_texto:
        return texto_atual

    if not texto_atual:
        return novo_texto

    partes = [
        parte.strip()
        for parte in texto_atual.split(
            separador
        )
        if parte.strip()
    ]

    if novo_texto not in partes:
        partes.append(
            novo_texto
        )

    return separador.join(
        partes
    )


def escolher_status_mais_relevante(
    status_atual,
    novo_status,
):
    prioridade_atual = (
        PRIORIDADE_STATUS.get(
            status_atual,
            0,
        )
    )

    prioridade_nova = (
        PRIORIDADE_STATUS.get(
            novo_status,
            0,
        )
    )

    if prioridade_nova > prioridade_atual:
        return novo_status

    return status_atual


def mesclar_registro_existente(
    existente,
    novo,
    pendencias,
    linha,
):
    existente["rota_id"] = adicionar_texto_unico(
        existente.get(
            "rota_id"
        ),
        novo.get(
            "rota_id"
        ),
    )

    existente["cluster"] = adicionar_texto_unico(
        existente.get(
            "cluster"
        ),
        novo.get(
            "cluster"
        ),
    )

    existente["observacao"] = adicionar_texto_unico(
        existente.get(
            "observacao"
        ),
        novo.get(
            "observacao"
        ),
        separador=" || ",
    )

    existente["status"] = (
        escolher_status_mais_relevante(
            existente.get(
                "status"
            ),
            novo.get(
                "status"
            ),
        )
    )

    motorista_existente = limpar_texto(
        existente.get(
            "motorista"
        )
    )

    motorista_novo = limpar_texto(
        novo.get(
            "motorista"
        )
    )

    if (
        motorista_existente
        and
        motorista_novo
        and
        criar_chave_texto(
            motorista_existente
        )
        !=
        criar_chave_texto(
            motorista_novo
        )
    ):
        pendencias.append({
            "linha": linha,
            "placa": existente[
                "placa"
            ],
            "motivo": (
                "A mesma placa apareceu com motoristas "
                f"diferentes: {motorista_existente} / "
                f"{motorista_novo}. Foi mantido o primeiro."
            ),
        })

    elif (
        not motorista_existente
        and
        motorista_novo
    ):
        existente["motorista"] = (
            motorista_novo
        )

    tipo_existente = limpar_texto(
        existente.get(
            "tipo_veiculo"
        )
    )

    tipo_novo = limpar_texto(
        novo.get(
            "tipo_veiculo"
        )
    )

    if (
        tipo_existente
        and
        tipo_novo
        and
        criar_chave_texto(
            tipo_existente
        )
        !=
        criar_chave_texto(
            tipo_novo
        )
    ):
        pendencias.append({
            "linha": linha,
            "placa": existente[
                "placa"
            ],
            "motivo": (
                "A mesma placa apareceu com tipos "
                f"diferentes: {tipo_existente} / "
                f"{tipo_novo}. Foi mantido o primeiro."
            ),
        })

    elif (
        not tipo_existente
        and
        tipo_novo
    ):
        existente["tipo_veiculo"] = (
            tipo_novo
        )

    return existente


# =====================================================
# COLETA COMPLETA
# =====================================================

def normalizar_coleta(dados):
    registros_normalizados_por_placa = {}
    pendencias = []

    if not isinstance(
        dados,
        dict,
    ):
        return {
            "coleta": {
                "data": None,
                "turno": None,
                "origem": "HAWK_COLLECTOR",
                "registros": [],
            },
            "pendencias": [
                {
                    "linha": 0,
                    "motivo": (
                        "A coleta recebida não é "
                        "um objeto JSON."
                    ),
                }
            ],
        }

    registros_brutos = dados.get(
        "registros",
        [],
    )

    if not isinstance(
        registros_brutos,
        list,
    ):
        registros_brutos = []

        pendencias.append({
            "linha": 0,
            "motivo": (
                "O campo 'registros' não é uma lista."
            ),
        })

    for indice, registro in enumerate(
        registros_brutos,
        start=1,
    ):
        registro_normalizado = (
            normalizar_registro(
                registro
            )
        )

        erro_estrutura = (
            registro_normalizado.get(
                "_erro_estrutura"
            )
        )

        if erro_estrutura:
            pendencias.append({
                "linha": indice,
                "motivo": erro_estrutura,
            })
            continue

        placa = registro_normalizado[
            "placa"
        ]

        if not placa:
            pendencias.append({
                "linha": indice,
                "motivo": "Registro sem placa.",
            })
            continue

        if not registro_normalizado[
            "status"
        ]:
            pendencias.append({
                "linha": indice,
                "placa": placa,
                "motivo": (
                    "Status não reconhecido: "
                    f"{registro_normalizado['_status_original']}"
                ),
            })
            continue

        registro_normalizado.pop(
            "_status_original",
            None,
        )

        registro_normalizado.pop(
            "_erro_estrutura",
            None,
        )

        if (
            placa
            in
            registros_normalizados_por_placa
        ):
            registros_normalizados_por_placa[
                placa
            ] = mesclar_registro_existente(
                existente=(
                    registros_normalizados_por_placa[
                        placa
                    ]
                ),
                novo=registro_normalizado,
                pendencias=pendencias,
                linha=indice,
            )

        else:
            registros_normalizados_por_placa[
                placa
            ] = registro_normalizado

    turno_normalizado = normalizar_turno(
        dados.get(
            "turno"
        )
    )

    if not turno_normalizado:
        pendencias.append({
            "linha": 0,
            "motivo": (
                "Turno da coleta não informado."
            ),
        })

    data_coleta = limpar_texto(
        dados.get(
            "data"
        )
    )

    if not data_coleta:
        pendencias.append({
            "linha": 0,
            "motivo": (
                "Data da coleta não informada."
            ),
        })

    origem = (
        limpar_texto(
            dados.get(
                "origem"
            )
        )
        or
        "HAWK_COLLECTOR"
    ).upper()

    coleta = {
        "data": data_coleta,
        "turno": turno_normalizado,
        "origem": origem,
        "registros": list(
            registros_normalizados_por_placa.values()
        ),
    }

    return {
        "coleta": coleta,
        "pendencias": pendencias,
    }