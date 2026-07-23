import json
import os
import subprocess
import sys

from datetime import date, datetime
from pathlib import Path

from fastapi import Depends, FastAPI, HTTPException, status
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles
from sqlalchemy import or_, select
from sqlalchemy.orm import Session

from backend import models, schemas
from backend.database import Base, engine, get_db


# BANCO DE DADOS

Base.metadata.create_all(bind=engine)


# CAMINHOS

BASE_DIR = Path(__file__).resolve().parent.parent
FRONTEND_DIR = BASE_DIR / "frontend"

AUTOMATION_DIR = BASE_DIR / "automation"

COLETOR_SCRIPT = (
    AUTOMATION_DIR
    / "coletor_ml.py"
)

COLETOR_STATUS_FILE = (
    AUTOMATION_DIR
    / "coletor_status.json"
)

COLETOR_LOG_FILE = (
    AUTOMATION_DIR
    / "coletor_execucao.log"
)


# Guarda o processo do coletor enquanto o servidor estiver rodando.

COLETOR_PROCESSO = None


# APLICAÇÃO

app = FastAPI(
    title="Hawk Operations API",
    description=(
        "API para gestão operacional de frota, motoristas, "
        "manutenções e rotas."
    ),
    version="0.2.0",
)


# ARQUIVOS ESTÁTICOS

app.mount(
    "/static",
    StaticFiles(directory=FRONTEND_DIR),
    name="static",
)


# HOME / HEALTH

@app.get("/", include_in_schema=False)
def home():
    return FileResponse(FRONTEND_DIR / "index.html")


@app.get("/health")
def health_check():
    return {"status": "ok"}


# FUNÇÕES AUXILIARES

def limpar_texto_opcional(valor: str | None) -> str | None:
    if valor is None:
        return None

    valor_limpo = valor.strip()
    return valor_limpo or None


# VEÍCULOS

@app.get(
    "/veiculos",
    response_model=list[schemas.VeiculoResponse],
    tags=["Veículos"],
)
def listar_veiculos(
    db: Session = Depends(get_db),
):
    return db.scalars(
        select(models.Veiculo)
        .order_by(models.Veiculo.placa)
    ).all()


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

    if not placa_normalizada:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Informe a placa do veículo.",
        )

    veiculo_existente = db.scalar(
        select(models.Veiculo)
        .where(models.Veiculo.placa == placa_normalizada)
    )

    if veiculo_existente:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="Já existe um veículo cadastrado com esta placa.",
        )

    novo_veiculo = models.Veiculo(
        placa=placa_normalizada,
        tipo=limpar_texto_opcional(veiculo.tipo),
        categoria=veiculo.categoria.strip() or "Frota fixa",
        observacao=limpar_texto_opcional(veiculo.observacao),
        ativo=veiculo.ativo,
    )

    db.add(novo_veiculo)
    db.commit()
    db.refresh(novo_veiculo)

    return novo_veiculo


@app.patch(
    "/veiculos/{veiculo_id}",
    response_model=schemas.VeiculoResponse,
    tags=["Veículos"],
)
def atualizar_veiculo(
    veiculo_id: int,
    dados: schemas.VeiculoUpdate,
    db: Session = Depends(get_db),
):
    veiculo = db.get(models.Veiculo, veiculo_id)

    if not veiculo:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Veículo não encontrado.",
        )

    campos_enviados = dados.model_fields_set

    if "placa" in campos_enviados:
        if dados.placa is None:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="A placa não pode ficar vazia.",
            )

        nova_placa = dados.placa.strip().upper()

        if not nova_placa:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="A placa não pode ficar vazia.",
            )

        placa_em_uso = db.scalar(
            select(models.Veiculo)
            .where(
                models.Veiculo.placa == nova_placa,
                models.Veiculo.id != veiculo_id,
            )
        )

        if placa_em_uso:
            raise HTTPException(
                status_code=status.HTTP_409_CONFLICT,
                detail="Já existe outro veículo cadastrado com esta placa.",
            )

        veiculo.placa = nova_placa

    if "tipo" in campos_enviados:
        veiculo.tipo = limpar_texto_opcional(dados.tipo)

    if "categoria" in campos_enviados:
        if dados.categoria is None or not dados.categoria.strip():
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="A categoria não pode ficar vazia.",
            )

        veiculo.categoria = dados.categoria.strip()

    if "observacao" in campos_enviados:
        veiculo.observacao = limpar_texto_opcional(dados.observacao)

    if "ativo" in campos_enviados and dados.ativo is not None:
        veiculo.ativo = dados.ativo

    db.commit()
    db.refresh(veiculo)

    return veiculo


@app.get(
    "/veiculos/{veiculo_id}/historico",
    response_model=schemas.VeiculoHistoricoResponse,
    tags=["Veículos"],
)
def obter_historico_veiculo(
    veiculo_id: int,
    db: Session = Depends(get_db),
):
    veiculo = db.get(models.Veiculo, veiculo_id)

    if not veiculo:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Veículo não encontrado.",
        )

    manutencoes = db.scalars(
        select(models.Manutencao)
        .where(models.Manutencao.veiculo_id == veiculo_id)
        .order_by(
            models.Manutencao.data_entrada.desc(),
            models.Manutencao.id.desc(),
        )
    ).all()

    operacoes = db.scalars(
        select(models.Operacao)
        .where(models.Operacao.veiculo_id == veiculo_id)
        .order_by(
            models.Operacao.data.desc(),
            models.Operacao.criado_em.desc(),
        )
    ).all()

    return {
        "veiculo": veiculo,
        "manutencoes": manutencoes,
        "operacoes": operacoes,
    }


@app.delete(
    "/veiculos/{veiculo_id}",
    status_code=status.HTTP_204_NO_CONTENT,
    tags=["Veículos"],
)
def excluir_veiculo(
    veiculo_id: int,
    db: Session = Depends(get_db),
):
    veiculo = db.get(models.Veiculo, veiculo_id)

    if not veiculo:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Veículo não encontrado.",
        )

    possui_manutencao = db.scalar(
        select(models.Manutencao.id)
        .where(models.Manutencao.veiculo_id == veiculo_id)
        .limit(1)
    )

    possui_operacao = db.scalar(
        select(models.Operacao.id)
        .where(models.Operacao.veiculo_id == veiculo_id)
        .limit(1)
    )

    if possui_manutencao or possui_operacao:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail=(
                "Este veículo possui histórico e não pode ser excluído. "
                "Inative o veículo para mantê-lo fora da frota atual sem perder os registros."
            ),
        )

    db.delete(veiculo)
    db.commit()

    return None


# MANUTENÇÕES

@app.get(
    "/manutencoes",
    response_model=list[schemas.ManutencaoResponse],
    tags=["Manutenções"],
)
def listar_manutencoes(
    db: Session = Depends(get_db),
):
    return db.scalars(
        select(models.Manutencao)
        .order_by(
            models.Manutencao.data_entrada.desc(),
            models.Manutencao.id.desc(),
        )
    ).all()


@app.get(
    "/manutencoes/ativas",
    response_model=list[schemas.ManutencaoResponse],
    tags=["Manutenções"],
)
def listar_manutencoes_ativas(
    db: Session = Depends(get_db),
):
    return db.scalars(
        select(models.Manutencao)
        .where(models.Manutencao.status == "EM_MANUTENCAO")
        .order_by(
            models.Manutencao.data_entrada.desc(),
            models.Manutencao.id.desc(),
        )
    ).all()


@app.get(
    "/manutencoes/finalizadas",
    response_model=list[schemas.ManutencaoResponse],
    tags=["Manutenções"],
)
def listar_manutencoes_finalizadas(
    db: Session = Depends(get_db),
):
    return db.scalars(
        select(models.Manutencao)
        .where(models.Manutencao.status == "FINALIZADA")
        .order_by(
            models.Manutencao.data_retorno.desc(),
            models.Manutencao.id.desc(),
        )
    ).all()


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
    veiculo = db.get(models.Veiculo, manutencao.veiculo_id)

    if not veiculo:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Veículo não encontrado.",
        )

    if not veiculo.ativo:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="Este veículo está inativo.",
        )

    motivo = manutencao.motivo.strip()

    if not motivo:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Informe o motivo da manutenção.",
        )

    if (
        manutencao.previsao_retorno is not None
        and manutencao.previsao_retorno < manutencao.data_entrada
    ):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="A previsão de retorno não pode ser anterior à data de entrada.",
        )

    manutencao_ativa = db.scalar(
        select(models.Manutencao)
        .where(
            models.Manutencao.veiculo_id == manutencao.veiculo_id,
            models.Manutencao.status == "EM_MANUTENCAO",
        )
    )

    if manutencao_ativa:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="Este veículo já possui uma manutenção ativa.",
        )

    nova_manutencao = models.Manutencao(
        veiculo_id=manutencao.veiculo_id,
        motivo=motivo,
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
    manutencao = db.get(models.Manutencao, manutencao_id)

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

    data_retorno = dados.data_retorno or date.today()

    if data_retorno < manutencao.data_entrada:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="A data de retorno não pode ser anterior à data de entrada.",
        )

    manutencao.data_retorno = data_retorno
    manutencao.servico_realizado = limpar_texto_opcional(dados.servico_realizado)
    manutencao.condicao_retorno = limpar_texto_opcional(dados.condicao_retorno)
    manutencao.observacao_retorno = limpar_texto_opcional(dados.observacao_retorno)
    manutencao.oficina = limpar_texto_opcional(dados.oficina)
    manutencao.custo = dados.custo
    manutencao.status = "FINALIZADA"

    db.commit()
    db.refresh(manutencao)

    return manutencao


# MOTORISTAS

@app.get(
    "/motoristas",
    response_model=list[schemas.MotoristaResponse],
    tags=["Motoristas"],
)
def listar_motoristas(
    db: Session = Depends(get_db),
):
    return db.scalars(
        select(models.Motorista)
        .order_by(models.Motorista.nome)
    ).all()


@app.post(
    "/motoristas",
    response_model=schemas.MotoristaResponse,
    status_code=status.HTTP_201_CREATED,
    tags=["Motoristas"],
)
def cadastrar_motorista(
    motorista: schemas.MotoristaCreate,
    db: Session = Depends(get_db),
):
    nome_normalizado = motorista.nome.strip()

    if not nome_normalizado:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Informe o nome do motorista.",
        )

    novo_motorista = models.Motorista(
        nome=nome_normalizado,
        telefone=limpar_texto_opcional(motorista.telefone),
        observacao=limpar_texto_opcional(motorista.observacao),
        ativo=motorista.ativo,
    )

    db.add(novo_motorista)
    db.commit()
    db.refresh(novo_motorista)

    return novo_motorista


@app.patch(
    "/motoristas/{motorista_id}",
    response_model=schemas.MotoristaResponse,
    tags=["Motoristas"],
)
def atualizar_motorista(
    motorista_id: int,
    dados: schemas.MotoristaUpdate,
    db: Session = Depends(get_db),
):
    motorista = db.get(models.Motorista, motorista_id)

    if not motorista:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Motorista não encontrado.",
        )

    campos_enviados = dados.model_fields_set

    if "nome" in campos_enviados:
        if dados.nome is None or not dados.nome.strip():
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="O nome não pode ficar vazio.",
            )

        motorista.nome = dados.nome.strip()

    if "telefone" in campos_enviados:
        motorista.telefone = limpar_texto_opcional(dados.telefone)

    if "observacao" in campos_enviados:
        motorista.observacao = limpar_texto_opcional(dados.observacao)

    if "ativo" in campos_enviados and dados.ativo is not None:
        motorista.ativo = dados.ativo

    db.commit()
    db.refresh(motorista)

    return motorista


@app.get(
    "/motoristas/{motorista_id}/historico",
    response_model=schemas.MotoristaHistoricoResponse,
    tags=["Motoristas"],
)
def obter_historico_motorista(
    motorista_id: int,
    db: Session = Depends(get_db),
):
    motorista = db.get(models.Motorista, motorista_id)

    if not motorista:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Motorista não encontrado.",
        )

    operacoes = db.scalars(
        select(models.Operacao)
        .where(models.Operacao.motorista_id == motorista_id)
        .order_by(
            models.Operacao.data.desc(),
            models.Operacao.criado_em.desc(),
        )
    ).all()

    return {
        "motorista": motorista,
        "operacoes": operacoes,
    }


@app.delete(
    "/motoristas/{motorista_id}",
    status_code=status.HTTP_204_NO_CONTENT,
    tags=["Motoristas"],
)
def excluir_motorista(
    motorista_id: int,
    db: Session = Depends(get_db),
):
    motorista = db.get(models.Motorista, motorista_id)

    if not motorista:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Motorista não encontrado.",
        )

    possui_operacao = db.scalar(
        select(models.Operacao.id)
        .where(models.Operacao.motorista_id == motorista_id)
        .limit(1)
    )

    if possui_operacao:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail=(
                "Este motorista possui histórico e não pode ser excluído. "
                "Inative o motorista para mantê-lo fora da equipe atual sem perder os registros."
            ),
        )

    db.delete(motorista)
    db.commit()

    return None


# OPERAÇÕES

STATUS_OPERACAO = {
    "CARREGANDO",
    "RESERVA_CARREGANDO",
    "FOLGA",
    "IMPEDIDO",
    "SEM_CARGA",
    "OUTRO_SERVICE",
    "INDISPONIVEL_MOTORISTA",
}


@app.get(
    "/operacoes",
    response_model=list[schemas.OperacaoResponse],
    tags=["Operações"],
)
def listar_operacoes(
    data_operacao: date | None = None,
    turno: str | None = None,
    db: Session = Depends(get_db),
):
    consulta = select(models.Operacao)

    if data_operacao is not None:
        consulta = consulta.where(models.Operacao.data == data_operacao)

    if turno is not None:
        consulta = consulta.where(models.Operacao.turno == turno)

    consulta = consulta.order_by(models.Operacao.criado_em.desc())

    return db.scalars(consulta).all()


@app.post(
    "/operacoes",
    response_model=schemas.OperacaoResponse,
    status_code=status.HTTP_201_CREATED,
    tags=["Operações"],
)
def cadastrar_operacao(
    operacao: schemas.OperacaoCreate,
    db: Session = Depends(get_db),
):
    status_normalizado = operacao.status.strip().upper()
    turno_normalizado = operacao.turno.strip()

    if not turno_normalizado:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Informe o turno.",
        )

    if status_normalizado not in STATUS_OPERACAO:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Status de operação inválido.",
        )

    if operacao.veiculo_id is not None:
        veiculo = db.get(models.Veiculo, operacao.veiculo_id)

        if not veiculo:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Veículo não encontrado.",
            )

        if not veiculo.ativo:
            raise HTTPException(
                status_code=status.HTTP_409_CONFLICT,
                detail="Este veículo está inativo.",
            )

        manutencao_ativa = db.scalar(
            select(models.Manutencao)
            .where(
                models.Manutencao.veiculo_id == operacao.veiculo_id,
                models.Manutencao.status == "EM_MANUTENCAO",
            )
        )

        if manutencao_ativa:
            raise HTTPException(
                status_code=status.HTTP_409_CONFLICT,
                detail=(
                    "Este veículo está em manutenção e não pode ser registrado na operação."
                ),
            )

        operacao_existente = db.scalar(
            select(models.Operacao)
            .where(
                models.Operacao.data == operacao.data,
                models.Operacao.turno == turno_normalizado,
                models.Operacao.veiculo_id == operacao.veiculo_id,
            )
        )

        if operacao_existente:
            raise HTTPException(
                status_code=status.HTTP_409_CONFLICT,
                detail="Este veículo já possui um registro neste turno.",
            )

    if operacao.motorista_id is not None:
        motorista = db.get(models.Motorista, operacao.motorista_id)

        if not motorista:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Motorista não encontrado.",
            )

        if not motorista.ativo:
            raise HTTPException(
                status_code=status.HTTP_409_CONFLICT,
                detail="Este motorista está inativo.",
            )

    nova_operacao = models.Operacao(
        data=operacao.data,
        turno=turno_normalizado,
        veiculo_id=operacao.veiculo_id,
        motorista_id=operacao.motorista_id,
        rota_id=limpar_texto_opcional(operacao.rota_id),
        status=status_normalizado,
        observacao=limpar_texto_opcional(operacao.observacao),
        origem=(operacao.origem.strip().upper() or "MANUAL"),
    )

    db.add(nova_operacao)
    db.commit()
    db.refresh(nova_operacao)

    return nova_operacao


@app.patch(
    "/operacoes/{operacao_id}",
    response_model=schemas.OperacaoResponse,
    tags=["Operações"],
)
def atualizar_operacao(
    operacao_id: int,
    dados: schemas.OperacaoUpdate,
    db: Session = Depends(get_db),
):
    operacao = db.get(models.Operacao, operacao_id)

    if not operacao:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Operação não encontrada.",
        )

    campos_enviados = dados.model_fields_set

    if "turno" in campos_enviados:
        if dados.turno is None or not dados.turno.strip():
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="O turno não pode ficar vazio.",
            )

        operacao.turno = dados.turno.strip()

    if "veiculo_id" in campos_enviados:
        if dados.veiculo_id is None:
            operacao.veiculo_id = None
        else:
            veiculo = db.get(models.Veiculo, dados.veiculo_id)

            if not veiculo:
                raise HTTPException(
                    status_code=status.HTTP_404_NOT_FOUND,
                    detail="Veículo não encontrado.",
                )

            if not veiculo.ativo:
                raise HTTPException(
                    status_code=status.HTTP_409_CONFLICT,
                    detail="Este veículo está inativo.",
                )

            manutencao_ativa = db.scalar(
                select(models.Manutencao)
                .where(
                    models.Manutencao.veiculo_id == dados.veiculo_id,
                    models.Manutencao.status == "EM_MANUTENCAO",
                )
            )

            if manutencao_ativa:
                raise HTTPException(
                    status_code=status.HTTP_409_CONFLICT,
                    detail="Este veículo está em manutenção.",
                )

            operacao.veiculo_id = dados.veiculo_id

    if "motorista_id" in campos_enviados:
        if dados.motorista_id is None:
            operacao.motorista_id = None
        else:
            motorista = db.get(models.Motorista, dados.motorista_id)

            if not motorista:
                raise HTTPException(
                    status_code=status.HTTP_404_NOT_FOUND,
                    detail="Motorista não encontrado.",
                )

            if not motorista.ativo:
                raise HTTPException(
                    status_code=status.HTTP_409_CONFLICT,
                    detail="Este motorista está inativo.",
                )

            operacao.motorista_id = dados.motorista_id

    if "rota_id" in campos_enviados:
        operacao.rota_id = limpar_texto_opcional(dados.rota_id)

    if "status" in campos_enviados:
        if dados.status is None:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="O status não pode ficar vazio.",
            )

        novo_status = dados.status.strip().upper()

        if novo_status not in STATUS_OPERACAO:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Status de operação inválido.",
            )

        operacao.status = novo_status

    if "observacao" in campos_enviados:
        operacao.observacao = limpar_texto_opcional(dados.observacao)

    if operacao.veiculo_id is not None:
        operacao_duplicada = db.scalar(
            select(models.Operacao)
            .where(
                models.Operacao.id != operacao.id,
                models.Operacao.data == operacao.data,
                models.Operacao.turno == operacao.turno,
                models.Operacao.veiculo_id == operacao.veiculo_id,
            )
        )

        if operacao_duplicada:
            raise HTTPException(
                status_code=status.HTTP_409_CONFLICT,
                detail="Este veículo já possui outro registro neste turno.",
            )

    db.commit()
    db.refresh(operacao)

    return operacao


@app.delete(
    "/operacoes/{operacao_id}",
    status_code=status.HTTP_204_NO_CONTENT,
    tags=["Operações"],
)
def excluir_operacao(
    operacao_id: int,
    db: Session = Depends(get_db),
):
    operacao = db.get(models.Operacao, operacao_id)

    if not operacao:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Operação não encontrada.",
        )

    db.delete(operacao)
    db.commit()

    return None

# COLETA AUTOMÁTICA

# INICIAR COLETOR

@app.post(
    "/coleta/iniciar",
    status_code=status.HTTP_202_ACCEPTED,
    tags=["Coleta"],
)
def iniciar_coletor(
    turno: str,
    data_operacao: date | None = None,
):

    global COLETOR_PROCESSO



    # VERIFICAR SE JÁ EXISTE UM COLETOR RODANDO


    if (
        COLETOR_PROCESSO is not None
        and
        COLETOR_PROCESSO.poll() is None
    ):

        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail=(
                "Já existe uma sincronização "
                "em andamento."
            ),
        )



    # VALIDAR TURNO


    mapa_turnos = {

        "manhã":
            "Manhã",

        "manha":
            "Manhã",

        "tarde":
            "Tarde",

        "noite":
            "Noite",

    }


    turno_normalizado = (

        mapa_turnos.get(
            turno
            .strip()
            .casefold()
        )

    )


    if not turno_normalizado:

        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=(
                "Turno inválido. "
                "Use Manhã, Tarde ou Noite."
            ),
        )



    # DATA DA OPERAÇÃO


    data_coleta = (

        data_operacao

        or

        date.today()

    )



    # VERIFICAR SCRIPT


    if not COLETOR_SCRIPT.exists():

        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=(
                "O arquivo automation/coletor_ml.py "
                "não foi encontrado."
            ),
        )



    # STATUS INICIAL


    status_inicial = {

        "status":
            "SOLICITADO",

        "mensagem":
            "Iniciando sincronização.",

        "turno":
            turno_normalizado,

        "data":
            data_coleta.isoformat(),

        "atualizado_em":
            datetime.now().isoformat(
                timespec="seconds"
            ),

    }


    COLETOR_STATUS_FILE.write_text(

        json.dumps(
            status_inicial,
            indent=4,
            ensure_ascii=False,
        ),

        encoding=
            "utf-8",

    )



    # COMANDO DO COLETOR


    comando = [

        sys.executable,

        str(
            COLETOR_SCRIPT
        ),

        "--automatico",

        "--turno",
        turno_normalizado,

        "--data",
        data_coleta.isoformat(),

    ]



    # CONFIGURAÇÃO DO PROCESSO


    ambiente = (
        os.environ.copy()
    )


    ambiente[
        "PYTHONIOENCODING"
    ] = "utf-8"



    # INICIAR COLETOR


    try:

        with COLETOR_LOG_FILE.open(

            "a",

            encoding=
                "utf-8",

        ) as arquivo_log:


            COLETOR_PROCESSO = (

                subprocess.Popen(

                    comando,

                    cwd=
                        str(
                            BASE_DIR
                        ),

                    stdout=
                        arquivo_log,

                    stderr=
                        subprocess.STDOUT,

                    env=
                        ambiente,

                )

            )


    except Exception as error:

        COLETOR_PROCESSO = None


        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=(
                "Não foi possível iniciar "
                f"o coletor: {error}"
            ),
        )


    return {

        "status":
            "INICIADO",

        "mensagem":
            (
                "O coletor foi iniciado. "
                "O navegador deverá abrir automaticamente."
            ),

        "turno":
            turno_normalizado,

        "data":
            data_coleta,

    }


# STATUS DO COLETOR

@app.get(
    "/coleta/status",
    tags=["Coleta"],
)
def obter_status_coletor():

    processo_ativo = (

        COLETOR_PROCESSO is not None

        and

        COLETOR_PROCESSO.poll() is None

    )



    # AINDA NÃO EXISTE STATUS


    if not COLETOR_STATUS_FILE.exists():

        return {

            "status":
                "PARADO",

            "mensagem":
                (
                    "Nenhuma sincronização "
                    "foi iniciada ainda."
                ),

            "processo_ativo":
                processo_ativo,

        }



    # LER STATUS


    try:

        dados = json.loads(

            COLETOR_STATUS_FILE.read_text(

                encoding=
                    "utf-8"

            )

        )


    except (
        json.JSONDecodeError,
        OSError,
    ):

        return {

            "status":
                "DESCONHECIDO",

            "mensagem":
                (
                    "Não foi possível ler "
                    "o status do coletor."
                ),

            "processo_ativo":
                processo_ativo,

        }


    dados[
        "processo_ativo"
    ] = processo_ativo


    return dados

@app.post(
    "/coleta/importar",
    response_model=schemas.ColetaImportarResponse,
    tags=["Coleta"],
)
def importar_coleta(
    coleta: schemas.ColetaImportarRequest,
    db: Session = Depends(get_db),
):

    # VALIDAÇÕES GERAIS

    turno = coleta.turno.strip()

    if not turno:

        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Informe o turno da coleta.",
        )


    origem = (
        coleta.origem
        .strip()
        .upper()
        or
        "HAWK_COLLECTOR"
    )


    # CARREGAR VEÍCULOS E MOTORISTAS

    veiculos = db.scalars(
        select(models.Veiculo)
    ).all()


    motoristas = db.scalars(
        select(models.Motorista)
    ).all()


    veiculos_por_placa = {

        veiculo.placa
        .strip()
        .upper():

        veiculo

        for veiculo in veiculos

    }


    motoristas_por_nome = {

        motorista.nome
        .strip()
        .casefold():

        motorista

        for motorista in motoristas

    }


    # MANUTENÇÕES ATIVAS

    manutencoes_ativas = db.scalars(

        select(models.Manutencao)
        .where(
            models.Manutencao.status
            ==
            "EM_MANUTENCAO"
        )

    ).all()


    ids_em_manutencao = {

        manutencao.veiculo_id

        for manutencao in manutencoes_ativas

    }


    # CONTADORES

    importados = 0

    atualizados = 0

    ignorados = 0

    pendencias = []


    # PROCESSAR REGISTROS

    for registro in coleta.registros:

        placa = (
            registro.placa
            .strip()
            .upper()
        )


        status_registro = (
            registro.status
            .strip()
            .upper()
        )


    
        # PLACA VAZIA
    

        if not placa:

            ignorados += 1


            pendencias.append({

                "placa":
                    None,

                "motivo":
                    "Registro sem placa.",

            })


            continue


    
        # VEÍCULO NÃO CADASTRADO
    

        veiculo = (
            veiculos_por_placa.get(
                placa
            )
        )


        if not veiculo:

            ignorados += 1


            pendencias.append({

                "placa":
                    placa,

                "motivo":
                    "Veículo não cadastrado no Hawk.",

            })


            continue


    
        # VEÍCULO INATIVO
    

        if not veiculo.ativo:

            ignorados += 1


            pendencias.append({

                "placa":
                    placa,

                "motivo":
                    "Veículo está inativo.",

            })


            continue


    
        # VEÍCULO EM MANUTENÇÃO
    

        if (
            veiculo.id
            in
            ids_em_manutencao
        ):

            ignorados += 1


            pendencias.append({

                "placa":
                    placa,

                "motivo":
                    "Veículo está em manutenção.",

            })


            continue


    
        # STATUS DESCONHECIDO
    

        if (
            status_registro
            not in
            STATUS_OPERACAO
        ):

            ignorados += 1


            pendencias.append({

                "placa":
                    placa,

                "motivo":
                    (
                        "Status não reconhecido: "
                        f"{status_registro}"
                    ),

            })


            continue


    
        # MOTORISTA
    

        motorista_id = None


        if registro.motorista:

            nome_motorista = (
                registro.motorista
                .strip()
            )


            motorista = (

                motoristas_por_nome.get(

                    nome_motorista.casefold()

                )

            )


            if not motorista:

                ignorados += 1


                pendencias.append({

                    "placa":
                        placa,

                    "motivo":
                        (
                            "Motorista não cadastrado: "
                            f"{nome_motorista}"
                        ),

                })


                continue


            if not motorista.ativo:

                ignorados += 1


                pendencias.append({

                    "placa":
                        placa,

                    "motivo":
                        (
                            "Motorista está inativo: "
                            f"{nome_motorista}"
                        ),

                })


                continue


            motorista_id = (
                motorista.id
            )


    
        # VERIFICAR REGISTRO JÁ EXISTENTE
    

        operacao_existente = db.scalar(

            select(models.Operacao)

            .where(

                models.Operacao.data
                ==
                coleta.data,

                models.Operacao.turno
                ==
                turno,

                models.Operacao.veiculo_id
                ==
                veiculo.id,

            )

        )


        rota_id = (
            limpar_texto_opcional(
                registro.rota_id
            )
        )


        observacao = (
            limpar_texto_opcional(
                registro.observacao
            )
        )


    
        # ATUALIZAR
    

        if operacao_existente:

            operacao_existente.motorista_id = (
                motorista_id
            )

            operacao_existente.rota_id = (
                rota_id
            )

            operacao_existente.status = (
                status_registro
            )

            operacao_existente.observacao = (
                observacao
            )

            operacao_existente.origem = (
                origem
            )


            atualizados += 1


    
        # CRIAR
    

        else:

            nova_operacao = models.Operacao(

                data=
                    coleta.data,

                turno=
                    turno,

                veiculo_id=
                    veiculo.id,

                motorista_id=
                    motorista_id,

                rota_id=
                    rota_id,

                status=
                    status_registro,

                observacao=
                    observacao,

                origem=
                    origem,

            )


            db.add(
                nova_operacao
            )


            importados += 1


    # SALVAR

    db.commit()


    # RESPOSTA

    return schemas.ColetaImportarResponse(

        recebidos=
            len(
                coleta.registros
            ),

        importados=
            importados,

        atualizados=
            atualizados,

        ignorados=
            ignorados,

        pendencias=
            pendencias,

    )

# PANORAMA

LEGENDA_STATUS = {
    "CARREGANDO": "✅",
    "RESERVA_CARREGANDO": "🚗",
    "FOLGA": "⚠️ Folga planejada",
    "IMPEDIDO": "🚫 Impedido de rodar",
    "SEM_CARGA": "📦 Sem carga",
    "OUTRO_SERVICE": "🔄 Rodou em outro service",
    "INDISPONIVEL_MOTORISTA": "⏸️ Indisponível / motorista",
}


@app.get(
    "/panorama",
    response_model=schemas.PanoramaResponse,
    tags=["Panorama"],
)
def gerar_panorama(
    data_operacao: date,
    turno: str | None = None,
    db: Session = Depends(get_db),
):

    # FROTA ATIVA

    veiculos = db.scalars(
        select(models.Veiculo)
        .where(models.Veiculo.ativo.is_(True))
        .order_by(models.Veiculo.placa)
    ).all()


    # MANUTENÇÕES VÁLIDAS NA DATA CONSULTADA


    manutencoes = db.scalars(
        select(models.Manutencao)
        .where(
            models.Manutencao.data_entrada <= data_operacao,
            or_(
                models.Manutencao.data_retorno.is_(None),
                models.Manutencao.data_retorno >= data_operacao,
            ),
        )
        .order_by(
            models.Manutencao.data_entrada,
            models.Manutencao.id,
        )
    ).all()



    # OPERAÇÕES


    consulta_operacoes = (
        select(models.Operacao)
        .where(
            models.Operacao.data == data_operacao
        )
    )


    if turno:

        consulta_operacoes = (
            consulta_operacoes
            .where(
                models.Operacao.turno == turno
            )
        )


    operacoes = db.scalars(
        consulta_operacoes
        .order_by(
            models.Operacao.turno,
            models.Operacao.criado_em,
        )
    ).all()



    # INFORMAÇÕES AUXILIARES


    veiculos_por_id = {
        veiculo.id: veiculo
        for veiculo in veiculos
    }


    motoristas = db.scalars(
        select(models.Motorista)
    ).all()


    motoristas_por_id = {
        motorista.id: motorista
        for motorista in motoristas
    }


    ids_em_manutencao = {
        manutencao.veiculo_id
        for manutencao in manutencoes
    }


    ids_com_operacao = {
        operacao.veiculo_id
        for operacao in operacoes
        if operacao.veiculo_id is not None
    }


    veiculos_sem_registro = [

        veiculo

        for veiculo in veiculos

        if (
            veiculo.id not in ids_em_manutencao

            and

            veiculo.id not in ids_com_operacao
        )

    ]



    # CABEÇALHO


    data_formatada = (
        data_operacao.strftime(
            "%d/%m/%Y"
        )
    )


    turno_formatado = (
        turno
        if turno
        else "Todos os turnos"
    )


    linhas = [

        "━━━━━━━━━━━━━━━━━━━━",
        "PANORAMA SSP17: SBC",
        "MLP: HAWK TRANSPORTES",
        "━━━━━━━━━━━━━━━━━━━━",

        "",

        f"📅 Data: {data_formatada}",
        f"🕐 Turno: {turno_formatado}",

        "",

        "📊 RESUMO",

        "",

        (
            "🚚 Quantidade total de veículos "
            f"na base: {len(veiculos)}"
        ),

        (
            "✅ Registros operacionais: "
            f"{len(operacoes)}"
        ),

        (
            "🛠️ Veículos em manutenção: "
            f"{len(manutencoes)}"
        ),

        (
            "⚪ Veículos sem registro no período: "
            f"{len(veiculos_sem_registro)}"
        ),

        "",

        "LEGENDA",

        "",

        "✅ Carregando",
        "🚗 Carro reserva / Carregando",
        "⚠️ Folga planejada motorista",
        "🛠️ Manutenção",
        "🚫 Impedido de rodar no dia",
        "📦 Sem carga",
        "🔄 Rodou em outro service",
        "⏸️ Indisponível / motorista",

    ]



    # OPERAÇÃO


    if operacoes:

        linhas.extend([

            "",

            "━━━━━━━━━━━━━━━━━━━━",

            "🚚 FROTA EM OPERAÇÃO",

            "━━━━━━━━━━━━━━━━━━━━",

        ])


        turnos_encontrados = []


        for operacao in operacoes:

            if (
                operacao.turno
                not in turnos_encontrados
            ):

                turnos_encontrados.append(
                    operacao.turno
                )


        for turno_atual in turnos_encontrados:

            operacoes_turno = [

                operacao

                for operacao in operacoes

                if (
                    operacao.turno
                    ==
                    turno_atual
                )

            ]


            linhas.extend([

                "",

                f"▸ {turno_atual.upper()}",

                "",

            ])


            operacoes_turno.sort(

                key=lambda operacao:

                    (
                        veiculos_por_id.get(
                            operacao.veiculo_id
                        ).placa

                        if (
                            operacao.veiculo_id
                            in veiculos_por_id
                        )

                        else ""
                    )

            )


            for operacao in operacoes_turno:

                veiculo = (
                    veiculos_por_id.get(
                        operacao.veiculo_id
                    )
                )


                motorista = (
                    motoristas_por_id.get(
                        operacao.motorista_id
                    )
                )


                placa = (

                    veiculo.placa

                    if veiculo

                    else "SEM VEÍCULO"

                )


                status_texto = (

                    LEGENDA_STATUS.get(

                        operacao.status,

                        operacao.status

                    )

                )


                linha = (
                    f"{placa} {status_texto}"
                )


                if operacao.rota_id:

                    linha += (
                        f" • Rota: "
                        f"{operacao.rota_id}"
                    )


                if motorista:

                    linha += (
                        f" • "
                        f"{motorista.nome}"
                    )


                if operacao.observacao:

                    linha += (
                        f" - "
                        f"{operacao.observacao}"
                    )


                linhas.append(
                    linha
                )



    # MANUTENÇÕES


    linhas.extend([

        "",

        "━━━━━━━━━━━━━━━━━━━━",

        "🛠️ CARROS EM MANUTENÇÃO",

        "━━━━━━━━━━━━━━━━━━━━",

        "",

    ])


    if manutencoes:

        manutencoes_ordenadas = sorted(

            manutencoes,

            key=lambda manutencao:

                (
                    veiculos_por_id.get(
                        manutencao.veiculo_id
                    ).placa

                    if (
                        manutencao.veiculo_id
                        in veiculos_por_id
                    )

                    else ""
                )

        )


        for manutencao in manutencoes_ordenadas:

            veiculo = (
                veiculos_por_id.get(
                    manutencao.veiculo_id
                )
            )


            if not veiculo:

                continue


            linha = (
                f"{veiculo.placa} 🛠️ "
                f"{manutencao.motivo}"
            )


            if manutencao.previsao_retorno:

                linha += (

                    " • Previsão: "

                    +

                    manutencao
                    .previsao_retorno
                    .strftime(
                        "%d/%m"
                    )

                )


            linhas.append(
                linha
            )


    else:

        linhas.append(

            "Nenhum veículo em manutenção."

        )



    # VEÍCULOS SEM REGISTRO


    if veiculos_sem_registro:

        linhas.extend([

            "",

            "━━━━━━━━━━━━━━━━━━━━",

            "⚪ SEM REGISTRO NO PERÍODO",

            "━━━━━━━━━━━━━━━━━━━━",

            "",

        ])


        for veiculo in veiculos_sem_registro:

            linhas.append(
                veiculo.placa
            )



    # FINALIZAÇÃO


    texto_panorama = (
        "\n".join(
            linhas
        )
    )


    return schemas.PanoramaResponse(

        data=
            data_operacao,

        turno=
            turno,

        total_veiculos=
            len(
                veiculos
            ),

        veiculos_manutencao=
            len(
                manutencoes
            ),

        veiculos_operacao=
            len(
                operacoes
            ),

        texto=
            texto_panorama,

    )