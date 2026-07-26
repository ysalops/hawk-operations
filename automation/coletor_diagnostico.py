from datetime import datetime
from pathlib import Path

from playwright.sync_api import sync_playwright


# CAMINHOS

BASE_DIR = Path(__file__).resolve().parent

PROFILE_DIR = (
    BASE_DIR
    / ".browser-profile"
)

CAPTURAS_DIR = (
    BASE_DIR
    / "capturas"
)


CAPTURAS_DIR.mkdir(
    parents=True,
    exist_ok=True,
)


# COLETOR DE DIAGNÓSTICO

def executar():
    print()
    print(
        "========================================"
    )
    print(
        " HAWK COLLECTOR - DIAGNÓSTICO"
    )
    print(
        "========================================"
    )
    print()


    with sync_playwright() as playwright:

        navegador = (
            playwright
            .chromium
            .launch_persistent_context(
                user_data_dir=str(
                    PROFILE_DIR
                ),
                headless=False,
                viewport={
                    "width": 1440,
                    "height": 900,
                },
            )
        )


        if navegador.pages:

            pagina = navegador.pages[0]

        else:

            pagina = navegador.new_page()


        print(
            "O navegador foi aberto."
        )

        print()
        print(
            "1. Faça o login normalmente."
        )

        print(
            "2. Passe pelo Okta/MFA."
        )

        print(
            "3. Abra a página onde aparecem "
            "os dados da operação."
        )

        print()
        print(
            "Quando a página estiver totalmente "
            "carregada, volte para este terminal."
        )

        print()


        input(
            "Pressione ENTER para capturar a página..."
        )


        agora = datetime.now().strftime(
            "%Y%m%d_%H%M%S"
        )


        # URL ATUAL

        url_atual = pagina.url


        # TÍTULO

        titulo = pagina.title()


        # HTML COMPLETO

        html = pagina.content()


        arquivo_html = (
            CAPTURAS_DIR
            /
            f"pagina_{agora}.html"
        )


        arquivo_html.write_text(
            html,
            encoding="utf-8",
        )


        # TEXTO VISÍVEL

        texto = (
            pagina
            .locator("body")
            .inner_text()
        )


        arquivo_texto = (
            CAPTURAS_DIR
            /
            f"texto_{agora}.txt"
        )


        arquivo_texto.write_text(
            texto,
            encoding="utf-8",
        )


        # SCREENSHOT

        arquivo_imagem = (
            CAPTURAS_DIR
            /
            f"pagina_{agora}.png"
        )


        pagina.screenshot(
            path=str(
                arquivo_imagem
            ),
            full_page=True,
        )


        # INFORMAÇÕES DA PÁGINA

        quantidade_tabelas = (
            pagina
            .locator("table")
            .count()
        )


        quantidade_linhas = (
            pagina
            .locator("tr")
            .count()
        )


        quantidade_botoes = (
            pagina
            .locator("button")
            .count()
        )


        print()
        print(
            "========================================"
        )

        print(
            " CAPTURA CONCLUÍDA"
        )

        print(
            "========================================"
        )

        print()

        print(
            f"Título: {titulo}"
        )

        print(
            f"URL: {url_atual}"
        )

        print()

        print(
            f"Tabelas encontradas: "
            f"{quantidade_tabelas}"
        )

        print(
            f"Linhas <tr> encontradas: "
            f"{quantidade_linhas}"
        )

        print(
            f"Botões encontrados: "
            f"{quantidade_botoes}"
        )

        print()

        print(
            "Arquivos salvos em:"
        )

        print(
            CAPTURAS_DIR
        )

        print()

        input(
            "Pressione ENTER para fechar o navegador..."
        )


        navegador.close()


# INICIALIZAÇÃO

if __name__ == "__main__":
    executar()