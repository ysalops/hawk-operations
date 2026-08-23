import json
import os
import sys

from pathlib import Path
from urllib.error import HTTPError, URLError
from http.cookiejar import CookieJar
from urllib.request import (
    Request,
    build_opener,
    HTTPCookieProcessor,
)


# CONFIGURAÇÕES

BASE_DIR = (
    Path(__file__)
    .resolve()
    .parent
)
ROOT_DIR = BASE_DIR.parent


def carregar_env_local():
    arquivo_env = ROOT_DIR / ".env"

    if not arquivo_env.exists():
        return

    for linha in arquivo_env.read_text(
        encoding="utf-8"
    ).splitlines():

        linha = linha.strip()

        if (
            not linha
            or linha.startswith("#")
            or "=" not in linha
        ):
            continue

        chave, valor = linha.split("=", 1)

        os.environ.setdefault(
            chave.strip(),
            valor.strip().strip('"').strip("'"),
        )


carregar_env_local()


HAWK_BASE_URL = (
    os.getenv(
        "HAWK_BASE_URL",
        "http://127.0.0.1:8000",
    )
    .strip()
    .rstrip("/")
)

HAWK_ACCESS_PASSWORD = (
    os.getenv(
        "HAWK_ACCESS_PASSWORD",
        "",
    )
    .strip()
)

URL_LOGIN = (
    f"{HAWK_BASE_URL}/auth/login"
)

URL_IMPORTACAO = (
    f"{HAWK_BASE_URL}/coleta/importar"
)

ARQUIVO_COLETA = (
    BASE_DIR
    / "coleta_exemplo.json"
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

def criar_cliente_hawk():

    if not HAWK_ACCESS_PASSWORD:
        raise RuntimeError(
            "A senha do Hawk não foi configurada."
        )

    cookies = CookieJar()

    cliente = build_opener(
        HTTPCookieProcessor(
            cookies
        )
    )

    corpo_login = json.dumps(
        {
            "password":
                HAWK_ACCESS_PASSWORD
        }
    ).encode(
        "utf-8"
    )

    requisicao_login = Request(
        URL_LOGIN,
        data=corpo_login,
        headers={
            "Content-Type":
                "application/json",
            "Accept":
                "application/json",
            "User-Agent":
                "Hawk-Collector/1.0",
        },
        method="POST",
    )

    try:
        with cliente.open(
            requisicao_login,
            timeout=TEMPO_LIMITE_SEGUNDOS,
        ) as resposta:

            if resposta.status != 200:
                raise RuntimeError(
                    "O Hawk recusou "
                    "a autenticação."
                )

    except HTTPError as error:
        raise RuntimeError(
            "Não foi possível autenticar "
            f"no Hawk. HTTP {error.code}."
        ) from error

    return cliente

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
    cliente = criar_cliente_hawk()
        
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
        with cliente.open(
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