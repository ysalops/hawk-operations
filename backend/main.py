from fastapi import Depends, FastAPI, HTTPException, status
from sqlalchemy import select
from sqlalchemy.orm import Session

from backend import models, schemas
from backend.database import Base, engine, get_db


Base.metadata.create_all(bind=engine)


app = FastAPI(
    title="Hawk Operations API",
    description="API para gestão operacional de frota, motoristas e rotas.",
    version="0.1.0",
)


@app.get("/")
def home():
    return {
        "aplicacao": "Hawk Operations",
        "status": "online",
    }


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