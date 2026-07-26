import json
import os
import sys

from pathlib import Path
from urllib.error import HTTPError, URLError
from urllib.request import Request, urlopen


# CONFIGURAÇÕES

BASE_DIR = (
    Path(__file__)
    .resolve()
    .parent
)

ARQUIVO_COLETA = (
    BASE_DIR
    / "coleta_exemplo.json"
)

URL_IMPORTACAO = (
    os.getenv(
        "HAWK_IMPORT_URL",
        "http://127.0.0.1:8000/coleta/importar",
    )
)

TEMPO_LIMITE_SEGUNDOS = 30


# CARREGAR ARQUIVO DE TESTE

def carregar_coleta(
    caminho=ARQUIVO_COLETA,
):
    caminho = Path(caminho)

    if not caminho.exists():
        raise FileNotFoundError(
            "Arquivo de coleta não encontrado: "
            f"{caminho}"
        )

    try:
        with caminho.open(
            "r",
            encoding="utf-8",
        ) as arquivo:
            dados = json.load(
                arquivo
            )

    except json.JSONDecodeError as error:
        raise ValueError(
            "O arquivo JSON possui um erro. "
            f"Linha {error.lineno}, "
            f"coluna {error.colno}: "
            f"{error.msg}"
        ) from error

    if not isinstance(
        dados,
        dict,
    ):
        raise ValueError(
            "A coleta precisa ser um objeto JSON."
        )

    return dados


# LER RESPOSTA JSON

def interpretar_resposta_json(
    conteudo,
    contexto,
):
    if not conteudo:
        raise RuntimeError(
            f"{contexto} retornou uma resposta vazia."
        )

    try:
        dados = json.loads(
            conteudo
        )

    except json.JSONDecodeError as error:
        raise RuntimeError(
            f"{contexto} retornou uma resposta "
            "que não é um JSON válido."
        ) from error

    if not isinstance(
        dados,
        dict,
    ):
        raise RuntimeError(
            f"{contexto} retornou um formato inesperado."
        )

    return dados


# ENVIAR COLETA

def enviar_coleta(
    dados,
):
    if not isinstance(
        dados,
        dict,
    ):
        raise ValueError(
            "Os dados da coleta precisam ser "
            "um objeto JSON."
        )

    registros = dados.get(
        "registros"
    )

    if not isinstance(
        registros,
        list,
    ):
        raise ValueError(
            "O campo 'registros' precisa ser uma lista."
        )

    corpo = json.dumps(
        dados,
        ensure_ascii=False,
    ).encode(
        "utf-8"
    )

    requisicao = Request(
        URL_IMPORTACAO,
        data=corpo,
        headers={
            "Content-Type": (
                "application/json; charset=utf-8"
            ),
            "Accept": "application/json",
            "User-Agent": "Hawk-Collector/1.0",
        },
        method="POST",
    )

    try:
        with urlopen(
            requisicao,
            timeout=TEMPO_LIMITE_SEGUNDOS,
        ) as resposta:
            conteudo = (
                resposta
                .read()
                .decode(
                    "utf-8"
                )
            )

            return interpretar_resposta_json(
                conteudo=conteudo,
                contexto="O Hawk",
            )

    except HTTPError as error:
        try:
            corpo_erro = (
                error
                .read()
                .decode(
                    "utf-8"
                )
            )

        except Exception:
            corpo_erro = ""

        detalhe = (
            f"Status HTTP {error.code}."
        )

        if corpo_erro:
            try:
                dados_erro = json.loads(
                    corpo_erro
                )

                detalhe_api = (
                    dados_erro.get(
                        "detail"
                    )
                    if isinstance(
                        dados_erro,
                        dict,
                    )
                    else None
                )

                if detalhe_api:
                    detalhe += (
                        f" Detalhe: {detalhe_api}"
                    )

                else:
                    detalhe += (
                        " Resposta: "
                        f"{corpo_erro}"
                    )

            except json.JSONDecodeError:
                detalhe += (
                    " Resposta: "
                    f"{corpo_erro}"
                )

        raise RuntimeError(
            "O Hawk recusou a importação. "
            f"{detalhe}"
        ) from error

    except URLError as error:
        motivo = getattr(
            error,
            "reason",
            error,
        )

        raise RuntimeError(
            "Não foi possível conectar ao "
            "Hawk Operations em "
            f"{URL_IMPORTACAO}. "
            "Confirme se o servidor está rodando com "
            "'python -m uvicorn backend.main:app "
            f"--reload'. Motivo: {motivo}"
        ) from error

    except TimeoutError as error:
        raise RuntimeError(
            "O Hawk demorou mais de "
            f"{TEMPO_LIMITE_SEGUNDOS} segundos "
            "para responder."
        ) from error


# EXIBIR RESULTADO

def exibir_resultado(
    resultado,
):
    if not isinstance(
        resultado,
        dict,
    ):
        raise ValueError(
            "O resultado da importação possui "
            "um formato inválido."
        )

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
        "📥 Recebidos: "
        f"{resultado.get('recebidos', 0)}"
    )

    print(
        "✅ Importados: "
        f"{resultado.get('importados', 0)}"
    )

    print(
        "🔄 Atualizados: "
        f"{resultado.get('atualizados', 0)}"
    )

    print(
        "⚠️ Ignorados: "
        f"{resultado.get('ignorados', 0)}"
    )

    pendencias = resultado.get(
        "pendencias",
        [],
    )

    if not isinstance(
        pendencias,
        list,
    ):
        pendencias = []

    if pendencias:
        print()
        print(
            "PENDÊNCIAS"
        )
        print(
            "----------------------------------------"
        )

        for pendencia in pendencias:
            if not isinstance(
                pendencia,
                dict,
            ):
                continue

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


# EXECUÇÃO MANUAL DE TESTE

def executar():
    print()
    print(
        "Carregando arquivo de coleta..."
    )

    dados = carregar_coleta()

    quantidade = len(
        dados.get(
            "registros",
            [],
        )
    )

    print(
        f"{quantidade} registro(s) encontrado(s)."
    )

    print(
        "Enviando dados para o Hawk..."
    )

    resultado = enviar_coleta(
        dados
    )

    exibir_resultado(
        resultado
    )


# INICIALIZAÇÃO

if __name__ == "__main__":
    try:
        executar()

    except Exception as error:
        print()
        print(
            "❌ Erro durante a importação:"
        )
        print(
            str(
                error
            )
        )
        print()

        sys.exit(
            1
        )