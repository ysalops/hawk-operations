import argparse
import json
import time
import traceback

from datetime import date, datetime
from pathlib import Path

from playwright.sync_api import sync_playwright

from importar_coleta import (
    enviar_coleta,
    exibir_resultado,
)

from normalizador import (
    normalizar_coleta,
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

        "status":
            status,

        "mensagem":
            mensagem,

        "atualizado_em":
            datetime.now().isoformat(
                timespec="seconds"
            ),

        **dados_extras,

    }


    arquivo_temporario = (

        ARQUIVO_STATUS
        .with_suffix(
            ".tmp"
        )

    )


    arquivo_temporario.write_text(

        json.dumps(
            dados,
            indent=4,
            ensure_ascii=False,
        ),

        encoding=
            "utf-8",

    )


    arquivo_temporario.replace(
        ARQUIVO_STATUS
    )


# SALVAR JSON

def salvar_json(
    caminho,
    dados,
):

    with caminho.open(

        "w",

        encoding=
            "utf-8",

    ) as arquivo:

        json.dump(

            dados,

            arquivo,

            indent=
                4,

            ensure_ascii=
                False,

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
        /
        f"pagina_{agora}.html"

    )


    arquivo_texto = (

        CAPTURAS_DIR
        /
        f"texto_{agora}.txt"

    )


    arquivo_imagem = (

        CAPTURAS_DIR
        /
        f"pagina_{agora}.png"

    )


    # HTML

    arquivo_html.write_text(

        pagina.content(),

        encoding=
            "utf-8",

    )


    # TEXTO VISÍVEL

    texto = (

        pagina
        .locator(
            "body"
        )
        .inner_text()

    )


    arquivo_texto.write_text(

        texto,

        encoding=
            "utf-8",

    )


    # SCREENSHOT

    pagina.screenshot(

        path=
            str(
                arquivo_imagem
            ),

        full_page=
            True,

    )


    print()

    print(
        "📸 Diagnóstico da página salvo."
    )

    print(
        f"HTML: {arquivo_html.name}"
    )

    print(
        f"Texto: {arquivo_texto.name}"
    )

    print(
        f"Imagem: {arquivo_imagem.name}"
    )


# EXTRAIR REGISTROS DO SITE

def extrair_registros_da_pagina(
    pagina,
):

    """
    A extração real será configurada quando
    analisarmos a página operacional.

    Esta função deverá retornar:

    [
        {
            "placa": "RUL7F50",
            "motorista": "João Silva",
            "rota": "123456789",
            "status": "Carregando",
            "observacao": None,
        }
    ]
    """

    registros = []


    # =================================================
    # A EXTRAÇÃO REAL ENTRARÁ AQUI
    # =================================================


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


# AGUARDAR PÁGINA AUTOMATICAMENTE

def aguardar_registros_automaticamente(
    navegador,
    pagina_inicial,
    tempo_limite=1800,
):

    print()

    print(
        "⏳ Aguardando a página operacional..."
    )

    print(
        "Faça o login normalmente e abra "
        "a página com os dados da operação."
    )


    salvar_status(

        "AGUARDANDO_PAGINA",

        (
            "Navegador aberto. "
            "Faça o login e acesse "
            "a página operacional."
        ),

    )


    inicio = time.time()


    while (

        time.time()
        -
        inicio

        <

        tempo_limite

    ):

        pagina = (

            obter_pagina_atual(
                navegador,
                pagina_inicial,
            )

        )


        if pagina.is_closed():

            raise RuntimeError(
                "O navegador foi fechado."
            )


        try:

            registros = (

                extrair_registros_da_pagina(
                    pagina
                )

            )


            if registros:

                return (
                    pagina,
                    registros,
                )


        except Exception:

            # Durante login e navegação a página pode
            # mudar. O coletor simplesmente tenta de novo.

            pass


        time.sleep(
            3
        )


    raise TimeoutError(

        "Tempo limite atingido aguardando "
        "a página operacional."

    )


# MONTAR COLETA BRUTA

def montar_coleta_bruta(
    registros,
    turno,
    data_operacao,
):

    return {

        "data":
            data_operacao,

        "turno":
            turno,

        "origem":
            "HAWK_COLLECTOR",

        "registros":
            registros,

    }


# PROCESSAR E ENVIAR

def processar_coleta(
    coleta_bruta,
):

    salvar_status(

        "PROCESSANDO",

        "Processando dados coletados.",

    )


    # SALVAR DADOS BRUTOS

    salvar_json(
        ARQUIVO_BRUTO,
        coleta_bruta,
    )


    print()

    print(
        "💾 Coleta bruta salva."
    )


    # NORMALIZAR

    resultado = (

        normalizar_coleta(
            coleta_bruta
        )

    )


    coleta_normalizada = (

        resultado[
            "coleta"
        ]

    )


    pendencias = (

        resultado[
            "pendencias"
        ]

    )


    # SALVAR NORMALIZADO

    salvar_json(

        ARQUIVO_NORMALIZADO,

        coleta_normalizada,

    )


    print(
        "💾 Coleta normalizada salva."
    )


    # MOSTRAR PENDÊNCIAS

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
        .get(
            "registros",
            []
        )

    )


    if not registros:

        salvar_status(

            "SEM_REGISTROS",

            "Nenhum registro válido foi encontrado.",

            pendencias=
                pendencias,

        )


        print()

        print(
            "⚠️ Nenhum registro válido "
            "para enviar ao Hawk."
        )


        return None


    # ENVIAR AO HAWK

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


    resultado_importacao = (

        enviar_coleta(
            coleta_normalizada
        )

    )


    exibir_resultado(
        resultado_importacao
    )


    salvar_status(

        "CONCLUIDO",

        "Sincronização concluída com sucesso.",

        recebidos=
            resultado_importacao.get(
                "recebidos",
                0,
            ),

        importados=
            resultado_importacao.get(
                "importados",
                0,
            ),

        atualizados=
            resultado_importacao.get(
                "atualizados",
                0,
            ),

        ignorados=
            resultado_importacao.get(
                "ignorados",
                0,
            ),

        pendencias=
            resultado_importacao.get(
                "pendencias",
                [],
            ),

    )


    return resultado_importacao


# MODO MANUAL

def executar_modo_manual(
    navegador,
    pagina,
    turno,
    data_operacao,
):

    print()

    print(
        "1. Acesse o sistema normalmente."
    )

    print(
        "2. Faça o login com Okta/MFA."
    )

    print(
        "3. Abra a tela operacional."
    )

    print()


    input(

        "Quando estiver na página correta, "
        "pressione ENTER..."

    )


    pagina = (

        obter_pagina_atual(
            navegador,
            pagina,
        )

    )


    capturar_pagina(
        pagina
    )


    print()

    print(
        "🔎 Extraindo registros..."
    )


    registros = (

        extrair_registros_da_pagina(
            pagina
        )

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


    coleta_bruta = (

        montar_coleta_bruta(

            registros=
                registros,

            turno=
                turno,

            data_operacao=
                data_operacao,

        )

    )


    processar_coleta(
        coleta_bruta
    )


# MODO AUTOMÁTICO

def executar_modo_automatico(
    navegador,
    pagina,
    turno,
    data_operacao,
):

    print()

    print(
        "🤖 Modo automático ativado."
    )


    pagina, registros = (

        aguardar_registros_automaticamente(

            navegador=
                navegador,

            pagina_inicial=
                pagina,

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


    coleta_bruta = (

        montar_coleta_bruta(

            registros=
                registros,

            turno=
                turno,

            data_operacao=
                data_operacao,

        )

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

                    user_data_dir=
                        str(
                            PROFILE_DIR
                        ),

                    headless=
                        False,

                    viewport={

                        "width":
                            1440,

                        "height":
                            900,

                    },

                )

            )


            pagina = (

                navegador.pages[0]

                if navegador.pages

                else navegador.new_page()

            )


            # Página inicial provisória.
            # Depois colocaremos o endereço real.

            if (

                pagina.url
                ==
                "about:blank"

            ):

                pagina.goto(

                    "https://www.google.com"

                )


            print()

            print(
                "✅ Navegador aberto."
            )


            if automatico:

                executar_modo_automatico(

                    navegador=
                        navegador,

                    pagina=
                        pagina,

                    turno=
                        turno,

                    data_operacao=
                        data_operacao,

                )


            else:

                executar_modo_manual(

                    navegador=
                        navegador,

                    pagina=
                        pagina,

                    turno=
                        turno,

                    data_operacao=
                        data_operacao,

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
            str(
                error
            )
        )


        traceback.print_exc()


        salvar_status(

            "ERRO",

            str(
                error
            ),

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

        description=
            "Hawk Operations Collector"

    )


    parser.add_argument(

        "--automatico",

        action=
            "store_true",

        help=
            "Executa sem depender de comandos no terminal.",

    )


    parser.add_argument(

        "--turno",

        type=
            str,

        default=
            None,

    )


    parser.add_argument(

        "--data",

        type=
            str,

        default=
            None,

    )


    return parser.parse_args()


# INICIALIZAÇÃO

if __name__ == "__main__":

    argumentos = (
        obter_argumentos()
    )


    executar(

        automatico=
            argumentos.automatico,

        turno=
            argumentos.turno,

        data_operacao=
            argumentos.data,

    )