import subprocess
import sys

from pathlib import Path
from urllib.parse import parse_qs, urlparse


ROOT_DIR = (
    Path(__file__)
    .resolve()
    .parent
    .parent
)

PYTHON_LOCAL = (
    ROOT_DIR
    / ".venv"
    / "Scripts"
    / "python.exe"
)

COLETOR = (
    ROOT_DIR
    / "automation"
    / "coletor_ml.py"
)

LOG_FILE = (
    ROOT_DIR
    / "automation"
    / "hawk_launcher.log"
)


def main():

    if len(sys.argv) < 2:
        return

    url = sys.argv[1]

    parametros = parse_qs(
        urlparse(url).query
    )

    turno = (
        parametros
        .get("turno", [""])[0]
        .strip()
    )

    data_operacao = (
        parametros
        .get("data", [""])[0]
        .strip()
    )

    turnos_validos = {
        "Manhã",
        "Tarde",
        "Noite",
    }

    if turno not in turnos_validos:
        raise ValueError(
            f"Turno inválido: {turno}"
        )

    if not data_operacao:
        raise ValueError(
            "Data da operação não informada."
        )

    if not PYTHON_LOCAL.exists():
        raise FileNotFoundError(
            f"Python da .venv não encontrado: "
            f"{PYTHON_LOCAL}"
        )

    comando = [
        str(PYTHON_LOCAL),
        str(COLETOR),
        "--automatico",
        "--turno",
        turno,
        "--data",
        data_operacao,
    ]

    with LOG_FILE.open(
        "a",
        encoding="utf-8",
    ) as log:

        subprocess.Popen(
            comando,
            cwd=str(ROOT_DIR),
            stdout=log,
            stderr=subprocess.STDOUT,
            creationflags=subprocess.CREATE_NO_WINDOW,
        )


if __name__ == "__main__":
    main()