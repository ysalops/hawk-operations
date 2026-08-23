import argparse
import json
import time
import traceback

from datetime import date, datetime
from pathlib import Path
from zoneinfo import ZoneInfo

from playwright.sync_api import Response, sync_playwright

from importar_coleta import (
    enviar_coleta,
    exibir_resultado,
)

from normalizador import (
    normalizar_coleta,
)


# CONFIGURAÇÕES

URL_MONITORAMENTO = (
    "https://envios.adminml.com/"
    "logistics/monitoring-distribution"
)

TRECHO_URL_ROTAS = (
    "get-routes-list"
)

TRANSPORTADORA_ESPERADA = (
    "hawk transportes"
)

BASE_ESPERADA = (
    "SSP17"
)

TEMPO_LIMITE_SEGUNDOS = (
    1800
)

FUSO_HORARIO_OPERACAO = (
    ZoneInfo("America/Sao_Paulo")
)


# CAMINHOS

BASE_DIR = (
    Path(__file__)
    .resolve()
    .parent
)

PROFILE_DIR = (
    BASE_DIR
    / ".browser-profile"
)

CAPTURAS_DIR = (
    BASE_DIR
    / "capturas"
)

ARQUIVO_BRUTO = (
    BASE_DIR
    / "coleta_bruta_real.json"
)

ARQUIVO_NORMALIZADO = (
    BASE_DIR
    / "coleta_normalizada.json"
)

ARQUIVO_STATUS = (
    BASE_DIR
    / "coletor_status.json"
)

CAPTURAS_DIR.mkdir(
    parents=True,
    exist_ok=True,
)


# STATUS DO COLETOR

def salvar_status(
    status,
    mensagem,
    **dados_extras,
):

    dados = {
        "status": status,
        "mensagem": mensagem,
        "atualizado_em": datetime.now().isoformat(
            timespec="seconds"
        ),
        **dados_extras,
    }

    arquivo_temporario = (
        ARQUIVO_STATUS
        .with_suffix(".tmp")
    )

    arquivo_temporario.write_text(
        json.dumps(
            dados,
            indent=4,
            ensure_ascii=False,
        ),
        encoding="utf-8",
    )

    arquivo_temporario.replace(
        ARQUIVO_STATUS
    )


# SALVAR JSON

def salvar_json(
    caminho,
    dados,
):

    caminho.parent.mkdir(
        parents=True,
        exist_ok=True,
    )

    with caminho.open(
        "w",
        encoding="utf-8",
    ) as arquivo:

        json.dump(
            dados,
            arquivo,
            indent=4,
            ensure_ascii=False,
        )


# CAPTURAR PÁGINA PARA DIAGNÓSTICO

def capturar_pagina(
    pagina,
):

    agora = datetime.now().strftime(
        "%Y%m%d_%H%M%S"
    )

    arquivo_html = (
        CAPTURAS_DIR
        / f"pagina_{agora}.html"
    )

    arquivo_texto = (
        CAPTURAS_DIR
        / f"texto_{agora}.txt"
    )

    arquivo_imagem = (
        CAPTURAS_DIR
        / f"pagina_{agora}.png"
    )

    try:
        arquivo_html.write_text(
            pagina.content(),
            encoding="utf-8",
        )
    except Exception as error:
        print(
            "⚠️ Não foi possível salvar o HTML:",
            error,
        )

    try:
        texto = (
            pagina
            .locator("body")
            .inner_text()
        )

        arquivo_texto.write_text(
            texto,
            encoding="utf-8",
        )
    except Exception as error:
        print(
            "⚠️ Não foi possível salvar o texto:",
            error,
        )

    try:
        pagina.screenshot(
            path=str(
                arquivo_imagem
            ),
            full_page=True,
        )
    except Exception as error:
        print(
            "⚠️ Não foi possível salvar a imagem:",
            error,
        )

    print()
    print(
        "📸 Diagnóstico da página salvo."
    )
    print(
        f"Pasta: {CAPTURAS_DIR}"
    )


# ESTADO DA CAPTURA DE REDE

def criar_estado_captura():

    return {
        "dados": None,
        "url": None,
        "capturado_em": None,
        "erro": None,
    }


# IDENTIFICAR REQUISIÇÃO DE ROTAS

def eh_requisicao_lista_rotas(
    url,
):

    return (
        TRECHO_URL_ROTAS
        in
        url.casefold()
    )


# CAPTURAR RESPOSTA GET-ROUTES-LIST

def criar_manipulador_resposta(
    estado_captura,
):

    def ao_receber_resposta(
        resposta: Response,
    ):

        if not eh_requisicao_lista_rotas(
            resposta.url
        ):
            return

        try:
            if not resposta.ok:
                estado_captura["erro"] = (
                    "A API de rotas respondeu com "
                    f"HTTP {resposta.status}."
                )
                return

            dados = resposta.json()

            if not isinstance(
                dados,
                dict,
            ):
                estado_captura["erro"] = (
                    "A resposta de rotas não é "
                    "um objeto JSON."
                )
                return

            rotas = dados.get(
                "routes"
            )

            if not isinstance(
                rotas,
                list,
            ):
                estado_captura["erro"] = (
                    "O campo 'routes' não foi "
                    "encontrado na resposta da API."
                )
                return

            estado_captura["dados"] = dados
            estado_captura["url"] = resposta.url

            estado_captura["capturado_em"] = (
                datetime.now().isoformat(
                    timespec="seconds"
                )
            )

            estado_captura["erro"] = None

            agora = datetime.now().strftime(
                "%Y%m%d_%H%M%S"
            )

            arquivo_resposta = (
                CAPTURAS_DIR
                / f"get_routes_list_{agora}.json"
            )

            salvar_json(
                arquivo_resposta,
                dados,
            )

            print()
            print(
                "✅ Resposta get-routes-list capturada."
            )
            print(
                f"📦 {len(rotas)} rota(s) recebida(s)."
            )

        except Exception as error:
            estado_captura["erro"] = (
                "Falha ao interpretar a resposta "
                f"get-routes-list: {error}"
            )

            print()
            print(
                "⚠️ Falha ao ler get-routes-list:"
            )
            print(
                str(error)
            )

    return ao_receber_resposta


# TRADUZIR STATUS DO LAST MILE

def valor_verdadeiro(
    valor,
):

    if isinstance(
        valor,
        bool,
    ):
        return valor

    if isinstance(
        valor,
        (int, float),
    ):
        return valor > 0

    texto = str(
        valor
        or
        ""
    ).strip().casefold()

    return texto not in {
        "",
        "0",
        "false",
        "none",
        "null",
        "nao",
        "não",
    }


def rota_tem_ambulancia(
    rota,
):

    flags = (
        rota.get("flags")
        or
        {}
    )

    return (
        valor_verdadeiro(
            rota.get(
                "hasAmbulance"
            )
        )
        or
        valor_verdadeiro(
            flags.get(
                "hasAmbulance"
            )
        )
    )


def traduzir_status_rota(
    rota,
):

    status_ml = str(
        rota.get("status")
        or
        ""
    ).strip().casefold()

    substatus_ml = str(
        rota.get("substatus")
        or
        ""
    ).strip().casefold()

    # A ambulância é o destaque operacional mais
    # importante quando aparece na rota.
    if rota_tem_ambulancia(
        rota
    ):
        return "AMBULANCIA"

    if status_ml in {
        "close",
        "closed",
        "complete",
        "completed",
        "concluded",
        "finished",
    }:
        return "CONCLUIDA"

    if status_ml in {
        "return_to_station",
        "returning_to_station",
        "returned_to_station",
    }:
        return "RETORNANDO_ESTACAO"

    if status_ml in {
        "active",
        "in_progress",
        "on_route",
        "started",
    }:
        return "EM_ROTA"

    if substatus_ml in {
        "started",
        "in_progress",
        "on_route",
    }:
        return "EM_ROTA"

    if status_ml in {
        "loading",
        "loaded",
        "ready",
        "ready_to_start",
        "assigned",
        "pending",
        "created",
    }:
        return "CARREGANDO"

    # Fallback seguro:
    # se já houve primeiro movimento, consideramos
    # que o veículo está em rota.
    primeiro_movimento = (
        rota.get(
            "dateFirstMovement"
        )
    )

    if isinstance(
        primeiro_movimento,
        (int, float),
    ) and primeiro_movimento > 0:
        return "EM_ROTA"

    return "CARREGANDO"


# EXTRAIR REGISTROS DA RESPOSTA

def extrair_registros_da_pagina(
    pagina,
    estado_captura,
    data_operacao=None,
):

    dados = (
        estado_captura.get("dados")
    )

    if not dados:
        return []

    rotas = (
        dados.get("routes")
        or
        []
    )

    registros = []

    ignorados_transportadora = 0
    ignorados_base = 0
    ignorados_sem_placa = 0
    ignorados_outra_data = 0
    datas_encontradas = set()
    contagem_status = {}

    for rota in rotas:

        if not isinstance(
            rota,
            dict,
        ):
            continue

        init_date = (
            rota.get("initDate")
        )

        data_rota = None

        if isinstance(
            init_date,
            (int, float),
        ) and init_date > 0:
            data_rota = (
                datetime.fromtimestamp(
                    init_date,
                    tz=FUSO_HORARIO_OPERACAO,
                )
                .date()
                .isoformat()
            )

            datas_encontradas.add(
                data_rota
            )

        if (
            data_operacao
            and
            data_rota
            and
            data_rota
            !=
            data_operacao
        ):
            ignorados_outra_data += 1
            continue

        transportadora = str(
            rota.get("carrier")
            or
            ""
        ).strip()

        base = str(
            rota.get("serviceCenterId")
            or
            rota.get("facilityId")
            or
            ""
        ).strip().upper()

        if (
            transportadora
            and
            transportadora.casefold()
            !=
            TRANSPORTADORA_ESPERADA
        ):
            ignorados_transportadora += 1
            continue

        if (
            base
            and
            base
            !=
            BASE_ESPERADA
        ):
            ignorados_base += 1
            continue

        veiculo = (
            rota.get("vehicle")
            or
            {}
        )

        motorista = (
            rota.get("driver")
            or
            {}
        )

        placa = str(
            veiculo.get("license")
            or
            ""
        ).strip().upper()

        if not placa:
            ignorados_sem_placa += 1
            continue

        nome_motorista = str(
            motorista.get("driverName")
            or
            ""
        ).strip()

        rota_id = str(
            rota.get("id")
            or
            ""
        ).strip()

        cluster = str(
            rota.get("cluster")
            or
            ""
        ).strip()

        tipo_veiculo = str(
            veiculo.get("description")
            or
            rota.get(
                "vehicleDescriptionForFilter"
            )
            or
            ""
        ).strip()

        status_hawk = (
            traduzir_status_rota(
                rota
            )
        )

        contagem_status[
            status_hawk
        ] = (
            contagem_status.get(
                status_hawk,
                0,
            )
            +
            1
        )

        registros.append({
            "placa": placa,
            "tipo_veiculo": (
                tipo_veiculo
                or
                None
            ),
            "motorista": (
                nome_motorista
                or
                None
            ),
            "rota_id": (
                rota_id
                or
                None
            ),
            "status": status_hawk,
            "cluster": (
                cluster
                or
                None
            ),
            "observacao": None,
        })

    print()
    print(
        "🔎 Resultado do filtro da API:"
    )
    print(
        f"• Registros válidos: {len(registros)}"
    )

    for (
        status_nome,
        quantidade,
    ) in sorted(
        contagem_status.items()
    ):
        print(
            f"• {status_nome}: {quantidade}"
        )

    if ignorados_transportadora:
        print(
            "• Outra transportadora: "
            f"{ignorados_transportadora}"
        )

    if ignorados_base:
        print(
            "• Outra base: "
            f"{ignorados_base}"
        )

    if ignorados_sem_placa:
        print(
            "• Sem placa: "
            f"{ignorados_sem_placa}"
        )

    if ignorados_outra_data:
        print(
            "• Outra data: "
            f"{ignorados_outra_data}"
        )

    if (
        data_operacao
        and
        not registros
        and
        ignorados_outra_data
        and
        ignorados_outra_data
        ==
        len(rotas)
    ):
        datas_texto = (
            ", ".join(
                sorted(datas_encontradas)
            )
            or
            "não identificada"
        )

        raise ValueError(
            "As rotas capturadas são da(s) data(s) "
            f"{datas_texto}, mas o Hawk solicitou "
            f"{data_operacao}. Ajuste a data no Hawk "
            "ou abra a data correta no monitoramento."
        )

    return registros


# OBTER PÁGINA ATUAL

def obter_pagina_atual(
    navegador,
    pagina_padrao,
):

    paginas = [
        pagina
        for pagina in navegador.pages
        if not pagina.is_closed()
    ]

    if paginas:
        return paginas[-1]

    return pagina_padrao


# SOLICITAR NOVA RESPOSTA DA PÁGINA

def atualizar_pagina_monitoramento(
    pagina,
):

    if pagina.is_closed():
        return

    try:
        if (
            "envios.adminml.com"
            in
            pagina.url.casefold()
        ):
            pagina.reload(
                wait_until="domcontentloaded",
                timeout=120000,
            )
    except Exception as error:
        print(
            "⚠️ Não foi possível atualizar a página:",
            error,
        )

def traduzir_status_dom(
    texto,
):

    texto = (
        texto
        or
        ""
    ).strip().casefold()

    if (
        "ambulância" in texto
        or
        "ambulancia" in texto
    ):
        return "AMBULANCIA"

    if (
        "concluída" in texto
        or
        "concluida" in texto
        or
        "completada" in texto
    ):
        return "CONCLUIDA"

    if (
        "voltando para a estação" in texto
        or
        "retorno à estação" in texto
    ):
        return "RETORNANDO_ESTACAO"

    if (
        "em andamento" in texto
        or
        "em rota" in texto
    ):
        return "EM_ROTA"

    return "CARREGANDO"


def extrair_registros_do_dom(
    pagina,
):

    if (
        "monitoring-distribution"
        not in pagina.url.casefold()
    ):
        return []

    linhas = pagina.locator(
        "li.monitoring-row"
    )

    quantidade = linhas.count()

    if quantidade == 0:
        return []

    registros = []

    for indice in range(
        quantidade
    ):

        linha = linhas.nth(
            indice
        )

        try:
            # ROTA / CLUSTER

            cabecalho_locator = (
                linha.locator(
                    ".monitoring-row__promise-container p"
                )
                .first
            )

            if (
                cabecalho_locator.count()
                == 0
            ):
                continue

            cabecalho = (
                cabecalho_locator
                .inner_text()
                .strip()
            )

            partes_rota = [
                parte.strip()
                for parte in cabecalho.split(
                    "·",
                    1,
                )
            ]

            cluster = (
                partes_rota[0]
                if partes_rota
                else None
            )

            rota_id = None

            if (
                len(partes_rota)
                > 1
            ):
                rota_id = (
                    partes_rota[1]
                    .replace("#", "")
                    .strip()
                )

            # PLACA E TIPO

            placa_locator = (
                linha.locator(
                    "p.monitoring-row-details__license"
                )
                .first
            )

            if (
                placa_locator.count()
                == 0
            ):
                continue

            texto_veiculo = (
                placa_locator
                .inner_text()
                .strip()
            )

            partes_veiculo = [
                parte.strip()
                for parte in texto_veiculo.split(
                    "·",
                    1,
                )
            ]

            placa = (
                partes_veiculo[0]
                .strip()
                .upper()
            )

            tipo_veiculo = (
                partes_veiculo[1]
                if len(partes_veiculo) > 1
                else None
            )

            if not placa:
                continue

            # BASE / CICLO

            ciclo_locator = (
                linha.locator(
                    ".monitoring-row-details__cycle p"
                )
                .first
            )

            ciclo = ""

            if (
                ciclo_locator.count()
                > 0
            ):
                ciclo = (
                    ciclo_locator
                    .inner_text()
                    .strip()
                )

            if (
                ciclo
                and
                BASE_ESPERADA
                not in ciclo.upper()
            ):
                continue

            # MOTORISTA

            motorista_locator = (
                linha.locator(
                    ".monitoring-row-details__driver-name"
                )
                .first
            )

            motorista = None

            if (
                motorista_locator.count()
                > 0
            ):
                motorista = (
                    motorista_locator
                    .inner_text()
                    .strip()
                    or None
                )

            # STATUS

            status_locators = (
                linha.locator(
                    ".monitoring-row-details__name-container p"
                )
            )

            textos_status = []

            for status_indice in range(
                status_locators.count()
            ):
                texto_status = (
                    status_locators
                    .nth(status_indice)
                    .inner_text()
                    .strip()
                )

                if texto_status:
                    textos_status.append(
                        texto_status
                    )

            if textos_status:
                texto_status_final = (
                    " ".join(
                        textos_status
                    )
                )
            else:
                texto_status_final = (
                    linha.inner_text()
                )

            status = traduzir_status_dom(
                texto_status_final
            )

            registros.append({
                "placa": placa,
                "tipo_veiculo": (
                    tipo_veiculo
                    or None
                ),
                "motorista": motorista,
                "rota_id": rota_id,
                "status": status,
                "cluster": (
                    cluster
                    or None
                ),
                "observacao": (
                    f"Origem DOM Mercado Livre"
                    + (
                        f" | {ciclo}"
                        if ciclo
                        else ""
                    )
                ),
            })

        except Exception as error:
            print(
                "⚠️ Linha ignorada:",
                error,
            )

    if registros:
        print()
        print(
            "✅ Dados encontrados diretamente na página."
        )
        print(
            f"📦 {len(registros)} rota(s) encontradas."
        )

    return registros

# AGUARDAR PÁGINA AUTOMATICAMENTE

def aguardar_registros_automaticamente(
    navegador,
    pagina_inicial,
    estado_captura,
    data_operacao,
    tempo_limite=TEMPO_LIMITE_SEGUNDOS,
):

    print()
    print(
        "⏳ Aguardando a página operacional..."
    )
    print(
        "Faça o login normalmente e abra "
        "a página de Monitoramento Last Mile."
    )

    salvar_status(
        "AGUARDANDO_PAGINA",
        (
            "Navegador aberto. Faça o login e "
            "acesse a página de Monitoramento Last Mile."
        ),
    )

    inicio = time.time()
    ultima_atualizacao = 0.0

    while (
        time.time()
        -
        inicio
        <
        tempo_limite
    ):

        pagina = obter_pagina_atual(
            navegador,
            pagina_inicial,
        )

        if pagina.is_closed():
            raise RuntimeError(
                "O navegador foi fechado."
            )

        registros = extrair_registros_do_dom(
            pagina
        )

        if registros:
            return (
                pagina,
                registros,
            )


        registros = extrair_registros_da_pagina(
            pagina,
            estado_captura,
            data_operacao=data_operacao,
        )

        if registros:
            return (
                pagina,
                registros,
            )

        agora = time.time()

        if (
            "monitoring-distribution"
            in
            pagina.url.casefold()
            and
            agora - ultima_atualizacao >= 20
        ):
            atualizar_pagina_monitoramento(
                pagina
            )
            ultima_atualizacao = agora

        time.sleep(2)

    erro_captura = (
        estado_captura.get("erro")
    )

    if erro_captura:
        raise TimeoutError(
            "Tempo limite atingido. Último erro: "
            f"{erro_captura}"
        )

    raise TimeoutError(
        "Tempo limite atingido aguardando "
        "a resposta get-routes-list."
    )


# MONTAR COLETA BRUTA

def montar_coleta_bruta(
    registros,
    turno,
    data_operacao,
):

    return {
        "data": data_operacao,
        "turno": turno,
        "origem": "HAWK_COLLECTOR",
        "registros": registros,
    }


# PROCESSAR E ENVIAR

def processar_coleta(
    coleta_bruta,
):

    salvar_status(
        "PROCESSANDO",
        "Processando dados coletados.",
    )

    salvar_json(
        ARQUIVO_BRUTO,
        coleta_bruta,
    )

    print()
    print(
        "💾 Coleta bruta salva."
    )

    resultado = normalizar_coleta(
        coleta_bruta
    )

    coleta_normalizada = (
        resultado["coleta"]
    )

    pendencias = (
        resultado["pendencias"]
    )

    salvar_json(
        ARQUIVO_NORMALIZADO,
        coleta_normalizada,
    )

    print(
        "💾 Coleta normalizada salva."
    )

    if pendencias:
        print()
        print(
            "⚠️ PENDÊNCIAS DE NORMALIZAÇÃO"
        )

        for pendencia in pendencias:
            print(
                "• "
                +
                pendencia.get(
                    "motivo",
                    "Pendência desconhecida.",
                )
            )

    registros = (
        coleta_normalizada
        .get("registros", [])
    )

    if not registros:
        salvar_status(
            "SEM_REGISTROS",
            "Nenhum registro válido foi encontrado.",
            pendencias=pendencias,
        )

        print()
        print(
            "⚠️ Nenhum registro válido "
            "para enviar ao Hawk."
        )

        return None

    salvar_status(
        "ENVIANDO",
        (
            f"Enviando {len(registros)} "
            "registro(s) para o Hawk."
        ),
    )

    print()
    print(
        "📡 Enviando dados para o Hawk..."
    )

    resultado_importacao = enviar_coleta(
        coleta_normalizada
    )

    exibir_resultado(
        resultado_importacao
    )

    salvar_status(
        "CONCLUIDO",
        "Sincronização concluída com sucesso.",
        recebidos=resultado_importacao.get(
            "recebidos",
            0,
        ),
        importados=resultado_importacao.get(
            "importados",
            0,
        ),
        atualizados=resultado_importacao.get(
            "atualizados",
            0,
        ),
        ignorados=resultado_importacao.get(
            "ignorados",
            0,
        ),
        pendencias=resultado_importacao.get(
            "pendencias",
            [],
        ),
    )

    return resultado_importacao


# MODO MANUAL

def executar_modo_manual(
    navegador,
    pagina,
    estado_captura,
    turno,
    data_operacao,
):

    print()
    print(
        "1. Faça o login normalmente."
    )
    print(
        "2. Abra Monitoramento Last Mile."
    )
    print(
        "3. Aguarde a lista de rotas aparecer."
    )
    print()

    input(
        "Quando a lista estiver carregada, "
        "pressione ENTER..."
    )

    pagina = obter_pagina_atual(
        navegador,
        pagina,
    )

    if not estado_captura.get("dados"):
        atualizar_pagina_monitoramento(
            pagina
        )

        limite = time.time() + 60

        while (
            time.time()
            <
            limite
            and
            not estado_captura.get("dados")
        ):
            time.sleep(1)

    capturar_pagina(
        pagina
    )

    print()
    print(
        "🔎 Extraindo registros..."
    )

    registros = extrair_registros_da_pagina(
        pagina,
        estado_captura,
        data_operacao=data_operacao,
    )

    print(
        f"{len(registros)} "
        "registro(s) encontrado(s)."
    )

    if not turno:
        turno = input(
            "Informe o turno "
            "(Manhã, Tarde ou Noite): "
        ).strip()

    coleta_bruta = montar_coleta_bruta(
        registros=registros,
        turno=turno,
        data_operacao=data_operacao,
    )

    processar_coleta(
        coleta_bruta
    )


# MODO AUTOMÁTICO

def executar_modo_automatico(
    navegador,
    pagina,
    estado_captura,
    turno,
    data_operacao,
):

    print()
    print(
        "🤖 Modo automático ativado."
    )

    pagina, registros = (
        aguardar_registros_automaticamente(
            navegador=navegador,
            pagina_inicial=pagina,
            estado_captura=estado_captura,
            data_operacao=data_operacao,
        )
    )

    salvar_status(
        "COLETANDO",
        (
            f"{len(registros)} "
            "registro(s) encontrado(s)."
        ),
    )

    print()
    print(
        f"✅ {len(registros)} "
        "registro(s) encontrado(s)."
    )

    capturar_pagina(
        pagina
    )

    coleta_bruta = montar_coleta_bruta(
        registros=registros,
        turno=turno,
        data_operacao=data_operacao,
    )

    processar_coleta(
        coleta_bruta
    )


# EXECUÇÃO PRINCIPAL

def executar(
    automatico=False,
    turno=None,
    data_operacao=None,
):

    print()
    print(
        "========================================"
    )
    print(
        " HAWK COLLECTOR"
    )
    print(
        "========================================"
    )
    print()

    if not data_operacao:
        data_operacao = (
            date.today()
            .isoformat()
        )

    if automatico and not turno:
        salvar_status(
            "ERRO",
            (
                "O turno precisa ser informado "
                "no modo automático."
            ),
        )

        raise ValueError(
            "Informe o turno para executar "
            "o coletor automaticamente."
        )

    salvar_status(
        "INICIANDO",
        "Iniciando o coletor.",
    )

    navegador = None

    try:
        with sync_playwright() as playwright:

            print(
                "🌐 Abrindo navegador..."
            )

            navegador = (
                playwright
                .chromium
                .launch_persistent_context(
                    user_data_dir=str(
                        PROFILE_DIR
                    ),
                    headless=False,
                    service_workers="block",
                    viewport={
                        "width": 1440,
                        "height": 900,
                    },
                )
            )

            estado_captura = (
                criar_estado_captura()
            )

            navegador.on(
                "response",
                criar_manipulador_resposta(
                    estado_captura
                ),
            )

            pagina = (
                navegador.pages[0]
                if navegador.pages
                else navegador.new_page()
            )

            if (
                pagina.url
                ==
                "about:blank"
            ):
                pagina.goto(
                    URL_MONITORAMENTO,
                    wait_until="domcontentloaded",
                    timeout=120000,
                )

            elif (
                "envios.adminml.com"
                not in
                pagina.url.casefold()
            ):
                pagina.goto(
                    URL_MONITORAMENTO,
                    wait_until="domcontentloaded",
                    timeout=120000,
                )

            else:
                atualizar_pagina_monitoramento(
                    pagina
                )

            print()
            print(
                "✅ Navegador aberto."
            )

            if automatico:
                executar_modo_automatico(
                    navegador=navegador,
                    pagina=pagina,
                    estado_captura=estado_captura,
                    turno=turno,
                    data_operacao=data_operacao,
                )

            else:
                executar_modo_manual(
                    navegador=navegador,
                    pagina=pagina,
                    estado_captura=estado_captura,
                    turno=turno,
                    data_operacao=data_operacao,
                )

                print()
                input(
                    "Pressione ENTER para "
                    "fechar o navegador..."
                )

    except Exception as error:
        print()
        print(
            "❌ Erro no coletor:"
        )
        print(
            str(error)
        )

        traceback.print_exc()

        salvar_status(
            "ERRO",
            str(error),
        )

        raise

    finally:
        if navegador:
            try:
                navegador.close()
            except Exception:
                pass


# ARGUMENTOS DO TERMINAL

def obter_argumentos():

    parser = argparse.ArgumentParser(
        description=(
            "Hawk Operations Collector"
        )
    )

    parser.add_argument(
        "--automatico",
        action="store_true",
        help=(
            "Executa sem depender de comandos "
            "no terminal."
        ),
    )

    parser.add_argument(
        "--turno",
        type=str,
        default=None,
    )

    parser.add_argument(
        "--data",
        type=str,
        default=None,
    )

    return parser.parse_args()


# INICIALIZAÇÃO

if __name__ == "__main__":

    argumentos = obter_argumentos()

    executar(
        automatico=argumentos.automatico,
        turno=argumentos.turno,
        data_operacao=argumentos.data,
    )