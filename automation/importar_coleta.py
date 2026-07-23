import json
import sys
from pathlib import Path
from urllib.error import HTTPError, URLError
from urllib.request import Request, urlopen


# CONFIGURAÇÕES

BASE_DIR = Path(__file__).resolve().parent

ARQUIVO_COLETA = (
    BASE_DIR
    / "coleta_exemplo.json"
)

URL_IMPORTACAO = (
    "http://127.0.0.1:8000/coleta/importar"
)


# CARREGAR ARQUIVO

def carregar_coleta():

    if not ARQUIVO_COLETA.exists():

        print()
        print(
            "❌ Arquivo de coleta não encontrado:"
        )

        print(
            ARQUIVO_COLETA
        )

        print()

        sys.exit(
            1
        )


    try:

        with ARQUIVO_COLETA.open(
            "r",
            encoding="utf-8",
        ) as arquivo:

            return json.load(
                arquivo
            )


    except json.JSONDecodeError as error:

        print()
        print(
            "❌ O arquivo JSON possui um erro."
        )

        print(
            f"Linha: {error.lineno}"
        )

        print(
            f"Coluna: {error.colno}"
        )

        print(
            f"Detalhe: {error.msg}"
        )

        print()

        sys.exit(
            1
        )


# ENVIAR COLETA

def enviar_coleta(
    dados
):

    corpo = (
        json.dumps(
            dados
        )
        .encode(
            "utf-8"
        )
    )


    requisicao = Request(

        URL_IMPORTACAO,

        data=
            corpo,

        headers={

            "Content-Type":
                "application/json",

            "Accept":
                "application/json",

        },

        method=
            "POST",

    )


    try:

        with urlopen(
            requisicao
        ) as resposta:

            conteudo = (
                resposta
                .read()
                .decode(
                    "utf-8"
                )
            )


            return json.loads(
                conteudo
            )


    except HTTPError as error:

        corpo_erro = (
            error
            .read()
            .decode(
                "utf-8"
            )
        )


        print()
        print(
            "❌ O Hawk recusou a importação."
        )

        print(
            f"Status HTTP: {error.code}"
        )

        print()


        try:

            detalhe = json.loads(
                corpo_erro
            )

            print(
                json.dumps(
                    detalhe,
                    indent=2,
                    ensure_ascii=False,
                )
            )


        except json.JSONDecodeError:

            print(
                corpo_erro
            )


        sys.exit(
            1
        )


    except URLError:

        print()
        print(
            "❌ Não foi possível conectar "
            "ao Hawk Operations."
        )

        print()
        print(
            "Confirme se o servidor está rodando:"
        )

        print()
        print(
            "uvicorn backend.main:app --reload"
        )

        print()

        sys.exit(
            1
        )


# EXIBIR RESULTADO

def exibir_resultado(
    resultado
):

    print()
    print(
        "========================================"
    )

    print(
        " HAWK COLLECTOR - IMPORTAÇÃO"
    )

    print(
        "========================================"
    )

    print()

    print(
        f"📥 Recebidos: "
        f"{resultado.get('recebidos', 0)}"
    )

    print(
        f"✅ Importados: "
        f"{resultado.get('importados', 0)}"
    )

    print(
        f"🔄 Atualizados: "
        f"{resultado.get('atualizados', 0)}"
    )

    print(
        f"⚠️ Ignorados: "
        f"{resultado.get('ignorados', 0)}"
    )


    pendencias = (
        resultado.get(
            "pendencias",
            []
        )
    )


    if pendencias:

        print()
        print(
            "PENDÊNCIAS"
        )

        print(
            "----------------------------------------"
        )


        for pendencia in pendencias:

            placa = (
                pendencia.get(
                    "placa"
                )
                or
                "Sem placa"
            )


            motivo = (
                pendencia.get(
                    "motivo"
                )
                or
                "Motivo não informado"
            )


            print(
                f"• {placa}: {motivo}"
            )


    else:

        print()
        print(
            "🎉 Nenhuma pendência encontrada."
        )


    print()
    print(
        "Importação concluída."
    )

    print()


# EXECUÇÃO

def executar():

    print()
    print(
        "Carregando arquivo de coleta..."
    )


    dados = (
        carregar_coleta()
    )


    quantidade = len(

        dados.get(
            "registros",
            []
        )

    )


    print(
        f"{quantidade} registro(s) encontrado(s)."
    )


    print(
        "Enviando dados para o Hawk..."
    )


    resultado = (
        enviar_coleta(
            dados
        )
    )


    exibir_resultado(
        resultado
    )


if __name__ == "__main__":

    executar()