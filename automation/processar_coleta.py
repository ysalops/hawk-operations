import json
import sys
from pathlib import Path

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


ARQUIVO_BRUTO = (
    BASE_DIR
    / "coleta_bruta_exemplo.json"
)


ARQUIVO_NORMALIZADO = (
    BASE_DIR
    / "coleta_normalizada.json"
)


# CARREGAR ARQUIVO BRUTO

def carregar_dados_brutos():

    if not ARQUIVO_BRUTO.exists():

        print()
        print(
            "❌ Arquivo bruto não encontrado:"
        )

        print(
            ARQUIVO_BRUTO
        )

        print()

        sys.exit(
            1
        )


    try:

        with ARQUIVO_BRUTO.open(

            "r",

            encoding=
                "utf-8",

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


# SALVAR JSON NORMALIZADO

def salvar_coleta_normalizada(
    coleta
):

    with ARQUIVO_NORMALIZADO.open(

        "w",

        encoding=
            "utf-8",

    ) as arquivo:

        json.dump(

            coleta,

            arquivo,

            indent=
                4,

            ensure_ascii=
                False,

        )


# MOSTRAR PENDÊNCIAS DE NORMALIZAÇÃO

def exibir_pendencias_normalizacao(
    pendencias
):

    if not pendencias:

        print(
            "✅ Nenhuma pendência na normalização."
        )

        return


    print()

    print(
        "⚠️ PENDÊNCIAS DE NORMALIZAÇÃO"
    )

    print(
        "----------------------------------------"
    )


    for pendencia in pendencias:

        linha = (
            pendencia.get(
                "linha"
            )
            or
            "?"
        )


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

            f"Linha {linha}"

            f" • {placa}"

            f" • {motivo}"

        )


# EXECUÇÃO

def executar():

    print()

    print(
        "========================================"
    )

    print(
        " HAWK COLLECTOR - PROCESSAMENTO"
    )

    print(
        "========================================"
    )

    print()


    # 1. CARREGAR DADOS

    print(
        "📥 Carregando dados brutos..."
    )


    dados_brutos = (
        carregar_dados_brutos()
    )


    quantidade_bruta = len(

        dados_brutos.get(
            "registros",
            []
        )

    )


    print(

        f"{quantidade_bruta} "

        "registro(s) recebido(s)."

    )


    # 2. NORMALIZAR

    print()

    print(
        "🔄 Normalizando dados..."
    )


    resultado_normalizacao = (

        normalizar_coleta(
            dados_brutos
        )

    )


    coleta = (

        resultado_normalizacao[
            "coleta"
        ]

    )


    pendencias = (

        resultado_normalizacao[
            "pendencias"
        ]

    )


    quantidade_normalizada = len(

        coleta.get(
            "registros",
            []
        )

    )


    print(

        f"✅ {quantidade_normalizada} "

        "registro(s) normalizado(s)."

    )


    exibir_pendencias_normalizacao(
        pendencias
    )


    # 3. SALVAR RESULTADO

    salvar_coleta_normalizada(
        coleta
    )


    print()

    print(
        "💾 Coleta normalizada salva em:"
    )

    print(
        ARQUIVO_NORMALIZADO
    )


    # 4. VERIFICAR SE HÁ DADOS

    if (
        quantidade_normalizada
        ==
        0
    ):

        print()

        print(
            "⚠️ Nenhum registro válido "
            "para enviar ao Hawk."
        )

        print()

        return


    # 5. ENVIAR PARA O HAWK

    print()

    print(
        "📡 Enviando dados para o Hawk..."
    )


    resultado_importacao = (

        enviar_coleta(
            coleta
        )

    )


    # 6. RESULTADO

    exibir_resultado(
        resultado_importacao
    )


# INICIALIZAÇÃO

if __name__ == "__main__":

    executar()