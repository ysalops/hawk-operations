from datetime import date
from pathlib import Path

from fastapi import (
    Depends,
    FastAPI,
    HTTPException,
    status,
)

from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles

from sqlalchemy import select
from sqlalchemy.orm import Session

from backend import models, schemas

from backend.database import (
    Base,
    engine,
    get_db,
)


# BANCO DE DADOS


Base.metadata.create_all(
    bind=engine
)


# CAMINHOS


BASE_DIR = (
    Path(__file__)
    .resolve()
    .parent
    .parent
)

FRONTEND_DIR = (
    BASE_DIR
    /
    "frontend"
)


# APLICAÇÃO


app = FastAPI(

    title=
        "Hawk Operations API",

    description=(
        "API para gestão operacional "
        "de frota, motoristas e rotas."
    ),

    version=
        "0.1.0",

)


# ARQUIVOS ESTÁTICOS


app.mount(

    "/static",

    StaticFiles(
        directory=FRONTEND_DIR
    ),

    name=
        "static",

)


# HOME


@app.get(
    "/",
    include_in_schema=False,
)
def home():

    return FileResponse(

        FRONTEND_DIR
        /
        "index.html"

    )


@app.get(
    "/health"
)
def health_check():

    return {

        "status":
            "ok",

    }


# VEÍCULOS


@app.get(

    "/veiculos",

    response_model=
        list[
            schemas.VeiculoResponse
        ],

    tags=[
        "Veículos"
    ],

)
def listar_veiculos(

    db: Session =
        Depends(
            get_db
        ),

):

    veiculos = db.scalars(

        select(
            models.Veiculo
        )
        .order_by(
            models.Veiculo.placa
        )

    ).all()


    return veiculos


@app.post(

    "/veiculos",

    response_model=
        schemas.VeiculoResponse,

    status_code=
        status.HTTP_201_CREATED,

    tags=[
        "Veículos"
    ],

)
def cadastrar_veiculo(

    veiculo:
        schemas.VeiculoCreate,

    db: Session =
        Depends(
            get_db
        ),

):

    placa_normalizada = (
        veiculo
        .placa
        .strip()
        .upper()
    )


    if not placa_normalizada:

        raise HTTPException(

            status_code=
                status.HTTP_400_BAD_REQUEST,

            detail=
                "Informe a placa do veículo.",

        )


    veiculo_existente = db.scalar(

        select(
            models.Veiculo
        )
        .where(

            models.Veiculo.placa
            ==
            placa_normalizada

        )

    )


    if veiculo_existente:

        raise HTTPException(

            status_code=
                status.HTTP_409_CONFLICT,

            detail=(
                "Já existe um veículo "
                "cadastrado com esta placa."
            ),

        )


    novo_veiculo = models.Veiculo(

        placa=
            placa_normalizada,

        tipo=
            veiculo.tipo,

        categoria=
            veiculo.categoria,

        ativo=
            veiculo.ativo,

    )


    db.add(
        novo_veiculo
    )


    db.commit()


    db.refresh(
        novo_veiculo
    )


    return novo_veiculo


# MANUTENÇÕES


@app.get(

    "/manutencoes",

    response_model=
        list[
            schemas.ManutencaoResponse
        ],

    tags=[
        "Manutenções"
    ],

)
def listar_manutencoes(

    db: Session =
        Depends(
            get_db
        ),

):

    manutencoes = db.scalars(

        select(
            models.Manutencao
        )
        .order_by(

            models.Manutencao
            .data_entrada
            .desc()

        )

    ).all()


    return manutencoes


@app.get(

    "/manutencoes/ativas",

    response_model=
        list[
            schemas.ManutencaoResponse
        ],

    tags=[
        "Manutenções"
    ],

)
def listar_manutencoes_ativas(

    db: Session =
        Depends(
            get_db
        ),

):

    manutencoes = db.scalars(

        select(
            models.Manutencao
        )
        .where(

            models.Manutencao.status
            ==
            "EM_MANUTENCAO"

        )
        .order_by(

            models.Manutencao
            .data_entrada
            .desc()

        )

    ).all()


    return manutencoes


@app.post(

    "/manutencoes",

    response_model=
        schemas.ManutencaoResponse,

    status_code=
        status.HTTP_201_CREATED,

    tags=[
        "Manutenções"
    ],

)
def cadastrar_manutencao(

    manutencao:
        schemas.ManutencaoCreate,

    db: Session =
        Depends(
            get_db
        ),

):

    veiculo = db.get(

        models.Veiculo,

        manutencao.veiculo_id,

    )


    if not veiculo:

        raise HTTPException(

            status_code=
                status.HTTP_404_NOT_FOUND,

            detail=
                "Veículo não encontrado.",

        )


    if not veiculo.ativo:

        raise HTTPException(

            status_code=
                status.HTTP_409_CONFLICT,

            detail=
                "Este veículo está inativo.",

        )


    manutencao_ativa = db.scalar(

        select(
            models.Manutencao
        )
        .where(

            models.Manutencao.veiculo_id
            ==
            manutencao.veiculo_id,

            models.Manutencao.status
            ==
            "EM_MANUTENCAO",

        )

    )


    if manutencao_ativa:

        raise HTTPException(

            status_code=
                status.HTTP_409_CONFLICT,

            detail=(
                "Este veículo já possui "
                "uma manutenção ativa."
            ),

        )


    nova_manutencao = models.Manutencao(

        veiculo_id=
            manutencao.veiculo_id,

        motivo=
            manutencao.motivo.strip(),

        data_entrada=
            manutencao.data_entrada,

        previsao_retorno=
            manutencao.previsao_retorno,

        status=
            "EM_MANUTENCAO",

    )


    db.add(
        nova_manutencao
    )


    db.commit()


    db.refresh(
        nova_manutencao
    )


    return nova_manutencao


@app.patch(

    "/manutencoes/{manutencao_id}/finalizar",

    response_model=
        schemas.ManutencaoResponse,

    tags=[
        "Manutenções"
    ],

)
def finalizar_manutencao(

    manutencao_id:
        int,

    dados:
        schemas.ManutencaoFinalizar,

    db: Session =
        Depends(
            get_db
        ),

):

    manutencao = db.get(

        models.Manutencao,

        manutencao_id,

    )


    if not manutencao:

        raise HTTPException(

            status_code=
                status.HTTP_404_NOT_FOUND,

            detail=
                "Manutenção não encontrada.",

        )


    if (
        manutencao.status
        !=
        "EM_MANUTENCAO"
    ):

        raise HTTPException(

            status_code=
                status.HTTP_409_CONFLICT,

            detail=(
                "Esta manutenção "
                "já foi finalizada."
            ),

        )


    manutencao.data_retorno = (

        dados.data_retorno

        or

        date.today()

    )


    manutencao.status = (
        "FINALIZADA"
    )


    db.commit()


    db.refresh(
        manutencao
    )


    return manutencao


# MOTORISTAS


@app.get(

    "/motoristas",

    response_model=
        list[
            schemas.MotoristaResponse
        ],

    tags=[
        "Motoristas"
    ],

)
def listar_motoristas(

    db: Session =
        Depends(
            get_db
        ),

):

    motoristas = db.scalars(

        select(
            models.Motorista
        )
        .order_by(
            models.Motorista.nome
        )

    ).all()


    return motoristas


@app.post(

    "/motoristas",

    response_model=
        schemas.MotoristaResponse,

    status_code=
        status.HTTP_201_CREATED,

    tags=[
        "Motoristas"
    ],

)
def cadastrar_motorista(

    motorista:
        schemas.MotoristaCreate,

    db: Session =
        Depends(
            get_db
        ),

):

    nome_normalizado = (

        motorista
        .nome
        .strip()

    )


    if not nome_normalizado:

        raise HTTPException(

            status_code=
                status.HTTP_400_BAD_REQUEST,

            detail=
                "Informe o nome do motorista.",

        )


    novo_motorista = models.Motorista(

        nome=
            nome_normalizado,

        telefone=(

            motorista
            .telefone
            .strip()

            if motorista.telefone

            else None

        ),

        ativo=
            motorista.ativo,

    )


    db.add(
        novo_motorista
    )


    db.commit()


    db.refresh(
        novo_motorista
    )


    return novo_motorista


@app.patch(

    "/motoristas/{motorista_id}",

    response_model=
        schemas.MotoristaResponse,

    tags=[
        "Motoristas"
    ],

)
def atualizar_motorista(

    motorista_id:
        int,

    dados:
        schemas.MotoristaUpdate,

    db: Session =
        Depends(
            get_db
        ),

):

    motorista = db.get(

        models.Motorista,

        motorista_id,

    )


    if not motorista:

        raise HTTPException(

            status_code=
                status.HTTP_404_NOT_FOUND,

            detail=
                "Motorista não encontrado.",

        )


    if (
        dados.nome
        is not None
    ):

        nome = (
            dados
            .nome
            .strip()
        )


        if not nome:

            raise HTTPException(

                status_code=
                    status.HTTP_400_BAD_REQUEST,

                detail=
                    "O nome não pode ficar vazio.",

            )


        motorista.nome = (
            nome
        )


    if (
        dados.telefone
        is not None
    ):

        motorista.telefone = (

            dados
            .telefone
            .strip()

            or None

        )


    if (
        dados.ativo
        is not None
    ):

        motorista.ativo = (
            dados.ativo
        )


    db.commit()


    db.refresh(
        motorista
    )


    return motorista


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

    response_model=
        list[
            schemas.OperacaoResponse
        ],

    tags=[
        "Operações"
    ],

)
def listar_operacoes(

    data_operacao:
        date | None = None,

    turno:
        str | None = None,

    db: Session =
        Depends(
            get_db
        ),

):

    consulta = select(
        models.Operacao
    )


    if (
        data_operacao
        is not None
    ):

        consulta = consulta.where(

            models.Operacao.data
            ==
            data_operacao

        )


    if (
        turno
        is not None
    ):

        consulta = consulta.where(

            models.Operacao.turno
            ==
            turno

        )


    consulta = consulta.order_by(

        models.Operacao
        .criado_em
        .desc()

    )


    operacoes = db.scalars(
        consulta
    ).all()


    return operacoes


@app.post(

    "/operacoes",

    response_model=
        schemas.OperacaoResponse,

    status_code=
        status.HTTP_201_CREATED,

    tags=[
        "Operações"
    ],

)
def cadastrar_operacao(

    operacao:
        schemas.OperacaoCreate,

    db: Session =
        Depends(
            get_db
        ),

):

    status_normalizado = (

        operacao
        .status
        .strip()
        .upper()

    )


    turno_normalizado = (

        operacao
        .turno
        .strip()

    )


    if not turno_normalizado:

        raise HTTPException(

            status_code=
                status.HTTP_400_BAD_REQUEST,

            detail=
                "Informe o turno.",

        )


    if (
        status_normalizado
        not in
        STATUS_OPERACAO
    ):

        raise HTTPException(

            status_code=
                status.HTTP_400_BAD_REQUEST,

            detail=
                "Status de operação inválido.",

        )


    # -------------------------------------------------
    # VALIDAR VEÍCULO
    # -------------------------------------------------

    if (
        operacao.veiculo_id
        is not None
    ):

        veiculo = db.get(

            models.Veiculo,

            operacao.veiculo_id,

        )


        if not veiculo:

            raise HTTPException(

                status_code=
                    status.HTTP_404_NOT_FOUND,

                detail=
                    "Veículo não encontrado.",

            )


        if not veiculo.ativo:

            raise HTTPException(

                status_code=
                    status.HTTP_409_CONFLICT,

                detail=
                    "Este veículo está inativo.",

            )


        manutencao_ativa = db.scalar(

            select(
                models.Manutencao
            )
            .where(

                models.Manutencao.veiculo_id
                ==
                operacao.veiculo_id,

                models.Manutencao.status
                ==
                "EM_MANUTENCAO",

            )

        )


        if manutencao_ativa:

            raise HTTPException(

                status_code=
                    status.HTTP_409_CONFLICT,

                detail=(
                    "Este veículo está em manutenção "
                    "e não pode ser registrado "
                    "na operação."
                ),

            )


    # -------------------------------------------------
    # VALIDAR MOTORISTA
    # -------------------------------------------------

    if (
        operacao.motorista_id
        is not None
    ):

        motorista = db.get(

            models.Motorista,

            operacao.motorista_id,

        )


        if not motorista:

            raise HTTPException(

                status_code=
                    status.HTTP_404_NOT_FOUND,

                detail=
                    "Motorista não encontrado.",

            )


        if not motorista.ativo:

            raise HTTPException(

                status_code=
                    status.HTTP_409_CONFLICT,

                detail=
                    "Este motorista está inativo.",

            )


    # -------------------------------------------------
    # EVITAR DUPLICIDADE DE VEÍCULO NO TURNO
    # -------------------------------------------------

    if (
        operacao.veiculo_id
        is not None
    ):

        operacao_existente = db.scalar(

            select(
                models.Operacao
            )
            .where(

                models.Operacao.data
                ==
                operacao.data,

                models.Operacao.turno
                ==
                turno_normalizado,

                models.Operacao.veiculo_id
                ==
                operacao.veiculo_id,

            )

        )


        if operacao_existente:

            raise HTTPException(

                status_code=
                    status.HTTP_409_CONFLICT,

                detail=(
                    "Este veículo já possui "
                    "um registro neste turno."
                ),

            )


    nova_operacao = models.Operacao(

        data=
            operacao.data,

        turno=
            turno_normalizado,

        veiculo_id=
            operacao.veiculo_id,

        motorista_id=
            operacao.motorista_id,

        rota_id=(

            operacao
            .rota_id
            .strip()

            if operacao.rota_id

            else None

        ),

        status=
            status_normalizado,

        observacao=(

            operacao
            .observacao
            .strip()

            if operacao.observacao

            else None

        ),

        origem=
            operacao.origem,

    )


    db.add(
        nova_operacao
    )


    db.commit()


    db.refresh(
        nova_operacao
    )


    return nova_operacao


# ATUALIZAR OPERAÇÃO
# IMPORTANTE: ESTE BLOCO FICA FORA DO POST


@app.patch(

    "/operacoes/{operacao_id}",

    response_model=
        schemas.OperacaoResponse,

    tags=[
        "Operações"
    ],

)
def atualizar_operacao(

    operacao_id:
        int,

    dados:
        schemas.OperacaoUpdate,

    db: Session =
        Depends(
            get_db
        ),

):

    operacao = db.get(

        models.Operacao,

        operacao_id,

    )


    if not operacao:

        raise HTTPException(

            status_code=
                status.HTTP_404_NOT_FOUND,

            detail=
                "Operação não encontrada.",

        )


    if (
        dados.turno
        is not None
    ):

        turno = (
            dados
            .turno
            .strip()
        )


        if not turno:

            raise HTTPException(

                status_code=
                    status.HTTP_400_BAD_REQUEST,

                detail=
                    "O turno não pode ficar vazio.",

            )


        operacao.turno = (
            turno
        )


    if (
        dados.veiculo_id
        is not None
    ):

        veiculo = db.get(

            models.Veiculo,

            dados.veiculo_id,

        )


        if not veiculo:

            raise HTTPException(

                status_code=
                    status.HTTP_404_NOT_FOUND,

                detail=
                    "Veículo não encontrado.",

            )


        if not veiculo.ativo:

            raise HTTPException(

                status_code=
                    status.HTTP_409_CONFLICT,

                detail=
                    "Este veículo está inativo.",

            )


        manutencao_ativa = db.scalar(

            select(
                models.Manutencao
            )
            .where(

                models.Manutencao.veiculo_id
                ==
                dados.veiculo_id,

                models.Manutencao.status
                ==
                "EM_MANUTENCAO",

            )

        )


        if manutencao_ativa:

            raise HTTPException(

                status_code=
                    status.HTTP_409_CONFLICT,

                detail=
                    "Este veículo está em manutenção.",

            )


        operacao.veiculo_id = (
            dados.veiculo_id
        )


    if (
        dados.motorista_id
        is not None
    ):

        motorista = db.get(

            models.Motorista,

            dados.motorista_id,

        )


        if not motorista:

            raise HTTPException(

                status_code=
                    status.HTTP_404_NOT_FOUND,

                detail=
                    "Motorista não encontrado.",

            )


        if not motorista.ativo:

            raise HTTPException(

                status_code=
                    status.HTTP_409_CONFLICT,

                detail=
                    "Este motorista está inativo.",

            )


        operacao.motorista_id = (
            dados.motorista_id
        )


    if (
        dados.rota_id
        is not None
    ):

        operacao.rota_id = (

            dados
            .rota_id
            .strip()

            or None

        )


    if (
        dados.status
        is not None
    ):

        novo_status = (

            dados
            .status
            .strip()
            .upper()

        )


        if (
            novo_status
            not in
            STATUS_OPERACAO
        ):

            raise HTTPException(

                status_code=
                    status.HTTP_400_BAD_REQUEST,

                detail=
                    "Status de operação inválido.",

            )


        operacao.status = (
            novo_status
        )


    if (
        dados.observacao
        is not None
    ):

        operacao.observacao = (

            dados
            .observacao
            .strip()

            or None

        )


    db.commit()


    db.refresh(
        operacao
    )


    return operacao


# EXCLUIR OPERAÇÃO


@app.delete(

    "/operacoes/{operacao_id}",

    status_code=
        status.HTTP_204_NO_CONTENT,

    tags=[
        "Operações"
    ],

)
def excluir_operacao(

    operacao_id:
        int,

    db: Session =
        Depends(
            get_db
        ),

):

    operacao = db.get(

        models.Operacao,

        operacao_id,

    )


    if not operacao:

        raise HTTPException(

            status_code=
                status.HTTP_404_NOT_FOUND,

            detail=
                "Operação não encontrada.",

        )


    db.delete(
        operacao
    )


    db.commit()


    return None