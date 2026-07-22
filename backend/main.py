from datetime import date
from pathlib import Path

from fastapi import Depends, FastAPI, HTTPException, status
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles
from sqlalchemy import select
from sqlalchemy.orm import Session

from backend import models, schemas
from backend.database import Base, engine, get_db


Base.metadata.create_all(bind=engine)

BASE_DIR = Path(__file__).resolve().parent.parent
FRONTEND_DIR = BASE_DIR / "frontend"


app = FastAPI(
    title="Hawk Operations API",
    description="API para gestão operacional de frota, motoristas e rotas.",
    version="0.1.0",
)


# Arquivos CSS e JavaScript
app.mount(
    "/static",
    StaticFiles(directory=FRONTEND_DIR),
    name="static",
)


@app.get("/", include_in_schema=False)
def home():
    return FileResponse(FRONTEND_DIR / "index.html")


@app.get("/health")
def health_check():
    return {
        "status": "ok",
    }


@app.get(
    "/veiculos",
    response_model=list[schemas.VeiculoResponse],
    tags=["Veículos"],
)
def listar_veiculos(
    db: Session = Depends(get_db),
):
    veiculos = db.scalars(
        select(models.Veiculo).order_by(models.Veiculo.placa)
    ).all()

    return veiculos


@app.post(
    "/veiculos",
    response_model=schemas.VeiculoResponse,
    status_code=status.HTTP_201_CREATED,
    tags=["Veículos"],
)
def cadastrar_veiculo(
    veiculo: schemas.VeiculoCreate,
    db: Session = Depends(get_db),
):
    placa_normalizada = veiculo.placa.strip().upper()

    veiculo_existente = db.scalar(
        select(models.Veiculo).where(
            models.Veiculo.placa == placa_normalizada
        )
    )

    if veiculo_existente:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="Já existe um veículo cadastrado com esta placa.",
        )

    novo_veiculo = models.Veiculo(
        placa=placa_normalizada,
        tipo=veiculo.tipo,
        categoria=veiculo.categoria,
        ativo=veiculo.ativo,
    )

    db.add(novo_veiculo)
    db.commit()
    db.refresh(novo_veiculo)

    return novo_veiculo

# MANUTENÇÕES

@app.get(
    "/manutencoes",
    response_model=list[schemas.ManutencaoResponse],
    tags=["Manutenções"],
)
def listar_manutencoes(
    db: Session = Depends(get_db),
):
    manutencoes = db.scalars(
        select(models.Manutencao)
        .order_by(models.Manutencao.data_entrada.desc())
    ).all()

    return manutencoes


@app.get(
    "/manutencoes/ativas",
    response_model=list[schemas.ManutencaoResponse],
    tags=["Manutenções"],
)
def listar_manutencoes_ativas(
    db: Session = Depends(get_db),
):
    manutencoes = db.scalars(
        select(models.Manutencao)
        .where(
            models.Manutencao.status == "EM_MANUTENCAO"
        )
        .order_by(models.Manutencao.data_entrada.desc())
    ).all()

    return manutencoes


@app.post(
    "/manutencoes",
    response_model=schemas.ManutencaoResponse,
    status_code=status.HTTP_201_CREATED,
    tags=["Manutenções"],
)
def cadastrar_manutencao(
    manutencao: schemas.ManutencaoCreate,
    db: Session = Depends(get_db),
):
    veiculo = db.get(
        models.Veiculo,
        manutencao.veiculo_id,
    )

    if not veiculo:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Veículo não encontrado.",
        )

    manutencao_ativa = db.scalar(
        select(models.Manutencao).where(
            models.Manutencao.veiculo_id
            == manutencao.veiculo_id,
            models.Manutencao.status
            == "EM_MANUTENCAO",
        )
    )

    if manutencao_ativa:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail=(
                "Este veículo já possui uma manutenção ativa."
            ),
        )

    nova_manutencao = models.Manutencao(
        veiculo_id=manutencao.veiculo_id,
        motivo=manutencao.motivo.strip(),
        data_entrada=manutencao.data_entrada,
        previsao_retorno=manutencao.previsao_retorno,
        status="EM_MANUTENCAO",
    )

    db.add(nova_manutencao)
    db.commit()
    db.refresh(nova_manutencao)

    return nova_manutencao


@app.patch(
    "/manutencoes/{manutencao_id}/finalizar",
    response_model=schemas.ManutencaoResponse,
    tags=["Manutenções"],
)
def finalizar_manutencao(
    manutencao_id: int,
    dados: schemas.ManutencaoFinalizar,
    db: Session = Depends(get_db),
):
    manutencao = db.get(
        models.Manutencao,
        manutencao_id,
    )

    if not manutencao:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Manutenção não encontrada.",
        )

    if manutencao.status != "EM_MANUTENCAO":
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="Esta manutenção já foi finalizada.",
        )

    manutencao.data_retorno = (
        dados.data_retorno or date.today()
    )

    manutencao.status = "FINALIZADA"

    db.commit()
    db.refresh(manutencao)

    return manutencao