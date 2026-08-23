import os
import unicodedata
import hashlib
import hmac

from datetime import date, datetime
from pathlib import Path

from fastapi import Depends, FastAPI, HTTPException, Request, status
from fastapi.responses import FileResponse, JSONResponse, RedirectResponse
from pydantic import BaseModel
from fastapi.staticfiles import StaticFiles
from sqlalchemy import inspect, or_, select, text
from sqlalchemy.orm import Session

from backend import models, schemas
from backend.database import Base, engine, get_db


# BANCO DE DADOS

Base.metadata.create_all(bind=engine)


def aplicar_migracoes_leves() -> None:
    """Adiciona campos opcionais sem apagar dados existentes."""
    inspetor = inspect(engine)

    if "motoristas" not in inspetor.get_table_names():
        return

    colunas = {
        coluna["name"]
        for coluna in inspetor.get_columns("motoristas")
    }

    alteracoes = {
        "cpf": "VARCHAR(11)",
        "cnh": "VARCHAR(30)",
        "categoria_cnh": "VARCHAR(10)",
        "validade_cnh": "DATE",
    }

    with engine.begin() as conexao:
        for nome_coluna, tipo_sql in alteracoes.items():
            if nome_coluna not in colunas:
                conexao.execute(
                    text(
                        f"ALTER TABLE motoristas ADD COLUMN {nome_coluna} {tipo_sql}"
                    )
                )

        conexao.execute(
            text(
                "CREATE UNIQUE INDEX IF NOT EXISTS "
                "ux_motoristas_cpf ON motoristas (cpf)"
            )
        )

    inspetor = inspect(engine)
    if "operacoes" in inspetor.get_table_names():
        colunas_operacoes = {
            coluna["name"]
            for coluna in inspetor.get_columns("operacoes")
        }
        with engine.begin() as conexao:
            if "ajudante_id" not in colunas_operacoes:
                conexao.execute(
                    text("ALTER TABLE operacoes ADD COLUMN ajudante_id INTEGER")
                )
            conexao.execute(
                text(
                    "CREATE INDEX IF NOT EXISTS "
                    "ix_operacoes_ajudante_id ON operacoes (ajudante_id)"
                )
            )


aplicar_migracoes_leves()


# CAMINHOS

BASE_DIR = Path(__file__).resolve().parent.parent
FRONTEND_DIR = BASE_DIR / "frontend"

# AUTENTICAÇÃO

YLUME_OPS_ACCESS_PASSWORD = os.getenv(
    "YLUME_OPS_ACCESS_PASSWORD",
    "",
).strip()

YLUME_OPS_SESSION_SECRET = os.getenv(
    "YLUME_OPS_SESSION_SECRET",
    "",
).strip()

SESSION_COOKIE_NAME = "ylume_ops_session"
SESSION_MAX_AGE = 60 * 60 * 8  # 8 horas

YLUME_OPS_COOKIE_SECURE = (
    os.getenv(
        "YLUME_OPS_COOKIE_SECURE",
        "true",
    )
    .strip()
    .lower()
    in {
        "1",
        "true",
        "yes",
        "on",
    }
)

def criar_token_sessao() -> str:
    if not YLUME_OPS_SESSION_SECRET:
        return ""

    return hmac.new(
        YLUME_OPS_SESSION_SECRET.encode("utf-8"),
        b"ylume-ops-session-v1",
        hashlib.sha256,
    ).hexdigest()


def esta_autenticado(request: Request) -> bool:
    token = request.cookies.get(
        SESSION_COOKIE_NAME,
    )

    token_esperado = criar_token_sessao()

    if not token or not token_esperado:
        return False

    return hmac.compare_digest(
        token,
        token_esperado,
    )


class LoginRequest(BaseModel):
    password: str

# APLICAÇÃO

app = FastAPI(
    title="Ylume Ops API",
    description=(
        "API para gestão operacional de frota, motoristas, ajudantes, "
        "manutenções, panoramas e rotas."
    ),
    version="0.3.0",
)

@app.middleware("http")
async def proteger_ylume_ops(
    request: Request,
    call_next,
):
    caminho = request.url.path

    rotas_publicas = {
        "/login",
        "/auth/login",
        "/health",
    }

    if (
        caminho in rotas_publicas
        or caminho.startswith("/static/")
    ):
        return await call_next(request)

    if esta_autenticado(request):
        return await call_next(request)

    if request.method == "GET":
        return RedirectResponse(
            url="/login",
            status_code=303,
        )

    return JSONResponse(
        status_code=401,
        content={
            "detail": "Sessão não autenticada.",
        },
    )

# ARQUIVOS ESTÁTICOS

app.mount(
    "/static",
    StaticFiles(directory=FRONTEND_DIR),
    name="static",
)


# HOME / HEALTH

@app.get(
    "/login",
    include_in_schema=False,
)
def login_page(
    request: Request,
):
    if esta_autenticado(request):
        return RedirectResponse(
            url="/",
            status_code=303,
        )

    return FileResponse(
        FRONTEND_DIR / "login.html"
    )


@app.post(
    "/auth/login",
    include_in_schema=False,
)
def login(
    dados: LoginRequest,
):
    if (
        not YLUME_OPS_ACCESS_PASSWORD
        or not YLUME_OPS_SESSION_SECRET
    ):
        raise HTTPException(
            status_code=503,
            detail=(
                "Autenticação do Ylume Ops "
                "não foi configurada."
            ),
        )

    if not hmac.compare_digest(
        dados.password,
        YLUME_OPS_ACCESS_PASSWORD,
    ):
        raise HTTPException(
            status_code=401,
            detail="Senha inválida.",
        )

    response = JSONResponse(
        content={
            "authenticated": True,
        },
    )

    response.set_cookie(
        key=SESSION_COOKIE_NAME,
        value=criar_token_sessao(),
        max_age=SESSION_MAX_AGE,
        httponly=True,
        secure=YLUME_OPS_COOKIE_SECURE,
        samesite="lax",
    )

    return response


@app.post(
    "/auth/logout",
    include_in_schema=False,
)
def logout():
    response = JSONResponse(
        content={
            "authenticated": False,
        },
    )

    response.delete_cookie(
        SESSION_COOKIE_NAME,
    )

    return response


@app.get("/", include_in_schema=False)
def home():
    return FileResponse(
        FRONTEND_DIR / "index.html"
    )


@app.get("/health")
def health_check():
    return {"status": "ok"}


# FUNÇÕES AUXILIARES

def limpar_texto_opcional(valor: str | None) -> str | None:
    if valor is None:
        return None

    valor_limpo = valor.strip()
    return valor_limpo or None


def normalizar_cpf(valor: str | None) -> str | None:
    if valor is None:
        return None

    cpf = "".join(
        caractere
        for caractere in valor
        if caractere.isdigit()
    )

    if not cpf:
        return None

    if len(cpf) != 11 or len(set(cpf)) == 1:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Informe um CPF válido com 11 dígitos.",
        )

    for tamanho in (9, 10):
        soma = sum(
            int(cpf[indice]) * (tamanho + 1 - indice)
            for indice in range(tamanho)
        )
        digito = (soma * 10) % 11
        if digito == 10:
            digito = 0

        if digito != int(cpf[tamanho]):
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Informe um CPF válido.",
            )

    return cpf


def criar_chave_busca(valor: str | None) -> str | None:
    texto = limpar_texto_opcional(valor)

    if not texto:
        return None

    texto_sem_acento = "".join(
        caractere
        for caractere in unicodedata.normalize(
            "NFKD",
            texto,
        )
        if not unicodedata.combining(
            caractere
        )
    )

    return " ".join(
        texto_sem_acento
        .casefold()
        .split()
    )



def combinar_textos_operacao(
    cluster: str | None,
    observacao: str | None,
) -> str | None:
    partes = []

    for valor in (
        cluster,
        observacao,
    ):
        texto = limpar_texto_opcional(
            valor
        )

        if (
            texto
            and
            texto not in partes
        ):
            partes.append(
                texto
            )

    return (
        " | ".join(
            partes
        )
        or
        None
    )


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

    cpf_normalizado = normalizar_cpf(motorista.cpf)

    if cpf_normalizado:
        cpf_em_uso = db.scalar(
            select(models.Motorista)
            .where(models.Motorista.cpf == cpf_normalizado)
        )

        if cpf_em_uso:
            raise HTTPException(
                status_code=status.HTTP_409_CONFLICT,
                detail="Já existe um motorista cadastrado com este CPF.",
            )

    novo_motorista = models.Motorista(
        nome=nome_normalizado,
        cpf=cpf_normalizado,
        telefone=limpar_texto_opcional(motorista.telefone),
        cnh=limpar_texto_opcional(motorista.cnh),
        categoria_cnh=limpar_texto_opcional(motorista.categoria_cnh),
        validade_cnh=motorista.validade_cnh,
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

    if "cpf" in campos_enviados:
        cpf_normalizado = normalizar_cpf(dados.cpf)

        if cpf_normalizado:
            cpf_em_uso = db.scalar(
                select(models.Motorista)
                .where(
                    models.Motorista.cpf == cpf_normalizado,
                    models.Motorista.id != motorista_id,
                )
            )

            if cpf_em_uso:
                raise HTTPException(
                    status_code=status.HTTP_409_CONFLICT,
                    detail="Já existe outro motorista cadastrado com este CPF.",
                )

        motorista.cpf = cpf_normalizado

    if "telefone" in campos_enviados:
        motorista.telefone = limpar_texto_opcional(dados.telefone)

    if "cnh" in campos_enviados:
        motorista.cnh = limpar_texto_opcional(dados.cnh)

    if "categoria_cnh" in campos_enviados:
        motorista.categoria_cnh = limpar_texto_opcional(dados.categoria_cnh)

    if "validade_cnh" in campos_enviados:
        motorista.validade_cnh = dados.validade_cnh

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


# AJUDANTES

@app.get(
    "/ajudantes",
    response_model=list[schemas.AjudanteResponse],
    tags=["Ajudantes"],
)
def listar_ajudantes(db: Session = Depends(get_db)):
    return db.scalars(
        select(models.Ajudante).order_by(models.Ajudante.nome)
    ).all()


@app.post(
    "/ajudantes",
    response_model=schemas.AjudanteResponse,
    status_code=status.HTTP_201_CREATED,
    tags=["Ajudantes"],
)
def cadastrar_ajudante(
    ajudante: schemas.AjudanteCreate,
    db: Session = Depends(get_db),
):
    nome = ajudante.nome.strip()
    if not nome:
        raise HTTPException(status_code=400, detail="Informe o nome do ajudante.")

    cpf = normalizar_cpf(ajudante.cpf)
    if cpf and db.scalar(
        select(models.Ajudante).where(models.Ajudante.cpf == cpf)
    ):
        raise HTTPException(
            status_code=409,
            detail="Já existe um ajudante cadastrado com este CPF.",
        )

    novo = models.Ajudante(
        nome=nome,
        cpf=cpf,
        telefone=limpar_texto_opcional(ajudante.telefone),
        observacao=limpar_texto_opcional(ajudante.observacao),
        ativo=ajudante.ativo,
    )
    db.add(novo)
    db.commit()
    db.refresh(novo)
    return novo


@app.patch(
    "/ajudantes/{ajudante_id}",
    response_model=schemas.AjudanteResponse,
    tags=["Ajudantes"],
)
def atualizar_ajudante(
    ajudante_id: int,
    dados: schemas.AjudanteUpdate,
    db: Session = Depends(get_db),
):
    ajudante = db.get(models.Ajudante, ajudante_id)
    if not ajudante:
        raise HTTPException(status_code=404, detail="Ajudante não encontrado.")

    campos = dados.model_fields_set
    if "nome" in campos:
        if dados.nome is None or not dados.nome.strip():
            raise HTTPException(status_code=400, detail="O nome não pode ficar vazio.")
        ajudante.nome = dados.nome.strip()

    if "cpf" in campos:
        cpf = normalizar_cpf(dados.cpf)
        if cpf and not cpf_valido(cpf):
            raise HTTPException(status_code=400, detail="CPF inválido.")
        if cpf and db.scalar(
            select(models.Ajudante).where(
                models.Ajudante.cpf == cpf,
                models.Ajudante.id != ajudante_id,
            )
        ):
            raise HTTPException(
                status_code=409,
                detail="Já existe outro ajudante cadastrado com este CPF.",
            )
        ajudante.cpf = cpf

    if "telefone" in campos:
        ajudante.telefone = limpar_texto_opcional(dados.telefone)
    if "observacao" in campos:
        ajudante.observacao = limpar_texto_opcional(dados.observacao)
    if "ativo" in campos:
        ajudante.ativo = dados.ativo

    db.commit()
    db.refresh(ajudante)
    return ajudante


@app.delete(
    "/ajudantes/{ajudante_id}",
    status_code=status.HTTP_204_NO_CONTENT,
    tags=["Ajudantes"],
)
def excluir_ajudante(
    ajudante_id: int,
    db: Session = Depends(get_db),
):
    ajudante = db.get(models.Ajudante, ajudante_id)
    if not ajudante:
        raise HTTPException(status_code=404, detail="Ajudante não encontrado.")

    possui_historico = db.scalar(
        select(models.Operacao.id)
        .where(models.Operacao.ajudante_id == ajudante_id)
        .limit(1)
    )
    if possui_historico:
        raise HTTPException(
            status_code=409,
            detail=(
                "Este ajudante possui histórico e não pode ser excluído. "
                "Arquive o cadastro para preservar os registros."
            ),
        )

    db.delete(ajudante)
    db.commit()
    return None


# OPERAÇÕES

STATUS_OPERACAO = {
    # STATUS VINDOS DO LAST MILE
    "CARREGANDO",
    "EM_ROTA",
    "CONCLUIDA",
    "RETORNANDO_ESTACAO",
    "AMBULANCIA",

    # STATUS MANUAIS DA OPERAÇÃO
    "RESERVA_CARREGANDO",
    "FOLGA",
    "IMPEDIDO",
    "SEM_CARGA",
    "OUTRO_SERVICE",
    "INDISPONIVEL_MOTORISTA",
    "SEM_CLASSIFICACAO",
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

    ajudante_id = None
    if operacao.ajudante_id is not None:
        ajudante = db.get(models.Ajudante, operacao.ajudante_id)
        if not ajudante:
            raise HTTPException(status_code=404, detail="Ajudante não encontrado.")
        if not ajudante.ativo:
            raise HTTPException(status_code=409, detail="Este ajudante está inativo.")
        ajudante_id = ajudante.id

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
        ajudante_id=ajudante_id,
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

    if "ajudante_id" in campos_enviados:
        if dados.ajudante_id is None:
            operacao.ajudante_id = None
        else:
            ajudante = db.get(models.Ajudante, dados.ajudante_id)
            if not ajudante:
                raise HTTPException(status_code=404, detail="Ajudante não encontrado.")
            if not ajudante.ativo:
                raise HTTPException(status_code=409, detail="Este ajudante está inativo.")
            operacao.ajudante_id = dados.ajudante_id

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

# IMPORTAÇÃO ASSISTIDA

@app.post(
    "/importacoes/operacao",
    response_model=schemas.ImportacaoOperacaoResponse,
    tags=["Importações"],
)
def importar_operacao(
    importacao: schemas.ImportacaoOperacaoRequest,
    db: Session = Depends(get_db),
):
    turno = importacao.turno.strip()

    if not turno:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Informe o turno da operação.",
        )

    origem = (
        importacao.origem.strip().upper()
        or
        "IMPORTACAO_ASSISTIDA"
    )

    veiculos = db.scalars(
        select(models.Veiculo)
    ).all()

    motoristas = db.scalars(
        select(models.Motorista)
    ).all()

    veiculos_por_placa = {
        veiculo.placa.strip().upper(): veiculo
        for veiculo in veiculos
    }

    motoristas_por_nome = {
        criar_chave_busca(
            motorista.nome
        ): motorista
        for motorista in motoristas
        if criar_chave_busca(
            motorista.nome
        )
    }

    manutencoes_no_periodo = db.scalars(
        select(models.Manutencao)
        .where(
            models.Manutencao.data_entrada
            <=
            importacao.data,
            or_(
                models.Manutencao.data_retorno.is_(None),
                models.Manutencao.data_retorno
                >=
                importacao.data,
            ),
        )
    ).all()

    ids_em_manutencao = {
        manutencao.veiculo_id
        for manutencao in manutencoes_no_periodo
    }

    importados = 0
    atualizados = 0
    ignorados = 0
    pendencias = []

    try:
        for registro in importacao.registros:
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

            if not placa:
                ignorados += 1

                pendencias.append({
                    "placa": None,
                    "motivo": "Registro sem placa.",
                })

                continue

            if (
                status_registro
                not in
                STATUS_OPERACAO
            ):
                ignorados += 1

                pendencias.append({
                    "placa": placa,
                    "motivo": (
                        "Status não reconhecido: "
                        f"{status_registro}"
                    ),
                })

                continue

            tipo_veiculo = (
                limpar_texto_opcional(
                    registro.tipo_veiculo
                )
            )

            veiculo = (
                veiculos_por_placa.get(
                    placa
                )
            )

            if not veiculo:
                veiculo = models.Veiculo(
                    placa=placa,
                    tipo=tipo_veiculo,
                    categoria="Importação assistida",
                    observacao=(
                        "Cadastrado automaticamente "
                        "por importação assistida."
                    ),
                    ativo=True,
                )

                db.add(
                    veiculo
                )

                db.flush()

                veiculos_por_placa[
                    placa
                ] = veiculo

            elif tipo_veiculo:
                tipo_atual = (
                    limpar_texto_opcional(
                        veiculo.tipo
                    )
                )

                cadastro_automatico = (
                    veiculo.categoria
                    ==
                    "Importação assistida"
                )

                if (
                    not tipo_atual
                    or
                    cadastro_automatico
                ):
                    veiculo.tipo = (
                        tipo_veiculo
                    )

            if not veiculo.ativo:
                ignorados += 1

                pendencias.append({
                    "placa": placa,
                    "motivo": (
                        "Veículo está inativo. "
                        "O cadastro não foi reativado "
                        "automaticamente."
                    ),
                })

                continue

            if (
                veiculo.id
                in
                ids_em_manutencao
            ):
                ignorados += 1

                pendencias.append({
                    "placa": placa,
                    "motivo": (
                        "Veículo estava em manutenção "
                        "na data consultada."
                    ),
                })

                continue

            motorista_id = None

            if registro.motorista:
                nome_motorista = (
                    registro.motorista
                    .strip()
                )

                chave_motorista = (
                    criar_chave_busca(
                        nome_motorista
                    )
                )

                motorista = (
                    motoristas_por_nome.get(
                        chave_motorista
                    )
                    if chave_motorista
                    else None
                )

                if not motorista:
                    motorista = models.Motorista(
                        nome=nome_motorista,
                        telefone=None,
                        observacao=(
                            "Cadastrado automaticamente "
                            "por importação assistida."
                        ),
                        ativo=True,
                    )

                    db.add(
                        motorista
                    )

                    db.flush()

                    if chave_motorista:
                        motoristas_por_nome[
                            chave_motorista
                        ] = motorista

                if not motorista.ativo:
                    ignorados += 1

                    pendencias.append({
                        "placa": placa,
                        "motivo": (
                            "Motorista está inativo: "
                            f"{nome_motorista}. "
                            "O cadastro não foi reativado "
                            "automaticamente."
                        ),
                    })

                    continue

                motorista_id = (
                    motorista.id
                )

            operacao_existente = db.scalar(
                select(models.Operacao)
                .where(
                    models.Operacao.data
                    ==
                    importacao.data,
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
                combinar_textos_operacao(
                    registro.cluster,
                    registro.observacao,
                )
            )

            if operacao_existente:
                origem_existente = (
                    operacao_existente.origem
                    or
                    ""
                ).strip().upper()

                if origem_existente == "MANUAL":
                    ignorados += 1

                    pendencias.append({
                        "placa": placa,
                        "motivo": (
                            "Já existe um registro manual "
                            "neste turno. O registro manual "
                            "foi preservado."
                        ),
                    })

                    continue

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

            else:
                nova_operacao = models.Operacao(
                    data=importacao.data,
                    turno=turno,
                    veiculo_id=veiculo.id,
                    motorista_id=motorista_id,
                    rota_id=rota_id,
                    status=status_registro,
                    observacao=observacao,
                    origem=origem,
                )

                db.add(
                    nova_operacao
                )

                importados += 1

        db.commit()

    except Exception:
        db.rollback()
        raise

    return schemas.ImportacaoOperacaoResponse(
        recebidos=len(
            importacao.registros
        ),
        importados=importados,
        atualizados=atualizados,
        ignorados=ignorados,
        pendencias=pendencias,
    )


# =====================================================
# VEÍCULOS SEM REGISTRO NO TURNO
# =====================================================

@app.get(
    "/operacoes/veiculos-sem-registro",
    response_model=list[
        schemas.VeiculoSemRegistroResponse
    ],
    tags=["Operações"],
)
def listar_veiculos_sem_registro(
    data_operacao: date,
    turno: str,
    db: Session = Depends(get_db),
):
    turno_normalizado = turno.strip()

    if not turno_normalizado:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Informe o turno.",
        )

    veiculos = db.scalars(
        select(models.Veiculo)
        .where(
            models.Veiculo.ativo.is_(True)
        )
        .order_by(
            models.Veiculo.placa
        )
    ).all()

    operacoes = db.scalars(
        select(models.Operacao)
        .where(
            models.Operacao.data
            ==
            data_operacao,
            models.Operacao.turno
            ==
            turno_normalizado,
        )
    ).all()

    manutencoes = db.scalars(
        select(models.Manutencao)
        .where(
            models.Manutencao.data_entrada
            <=
            data_operacao,
            or_(
                models.Manutencao.data_retorno.is_(None),
                models.Manutencao.data_retorno
                >=
                data_operacao,
            ),
        )
    ).all()

    ids_com_operacao = {
        operacao.veiculo_id
        for operacao in operacoes
        if operacao.veiculo_id is not None
    }

    ids_em_manutencao = {
        manutencao.veiculo_id
        for manutencao in manutencoes
    }

    return [
        veiculo
        for veiculo in veiculos
        if (
            veiculo.id
            not in
            ids_com_operacao
            and
            veiculo.id
            not in
            ids_em_manutencao
        )
    ]


CLASSIFICACOES_AUSENCIA = {
    "MANUTENCAO",
    "FOLGA",
    "IMPEDIDO",
    "SEM_CARGA",
    "OUTRO_SERVICE",
    "INDISPONIVEL_MOTORISTA",
}


@app.post(
    "/operacoes/veiculos/{veiculo_id}/classificar",
    response_model=(
        schemas.ClassificarVeiculoAusenteResponse
    ),
    tags=["Operações"],
)
def classificar_veiculo_ausente(
    veiculo_id: int,
    dados: (
        schemas.ClassificarVeiculoAusenteRequest
    ),
    db: Session = Depends(get_db),
):
    veiculo = db.get(
        models.Veiculo,
        veiculo_id,
    )

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

    turno = dados.turno.strip()

    if not turno:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Informe o turno.",
        )

    classificacao = (
        dados.classificacao
        .strip()
        .upper()
    )

    if (
        classificacao
        not in
        CLASSIFICACOES_AUSENCIA
    ):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=(
                "Classificação inválida. Use "
                "MANUTENCAO, FOLGA, IMPEDIDO, "
                "SEM_CARGA, OUTRO_SERVICE ou "
                "INDISPONIVEL_MOTORISTA."
            ),
        )

    operacao_existente = db.scalar(
        select(models.Operacao)
        .where(
            models.Operacao.data
            ==
            dados.data,
            models.Operacao.turno
            ==
            turno,
            models.Operacao.veiculo_id
            ==
            veiculo.id,
        )
    )

    if operacao_existente:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail=(
                "Este veículo já possui um registro "
                "neste turno."
            ),
        )

    motivo = (
        limpar_texto_opcional(
            dados.motivo
        )
    )

    if classificacao == "MANUTENCAO":
        manutencao_existente = db.scalar(
            select(models.Manutencao)
            .where(
                models.Manutencao.veiculo_id
                ==
                veiculo.id,
                models.Manutencao.data_entrada
                <=
                dados.data,
                or_(
                    models.Manutencao.data_retorno.is_(
                        None
                    ),
                    models.Manutencao.data_retorno
                    >=
                    dados.data,
                ),
            )
        )

        if manutencao_existente:
            raise HTTPException(
                status_code=status.HTTP_409_CONFLICT,
                detail=(
                    "O veículo já possui manutenção "
                    "registrada nesta data."
                ),
            )

        motivo_manutencao = (
            motivo
            or
            "Manutenção informada pela operação."
        )

        nova_manutencao = models.Manutencao(
            veiculo_id=veiculo.id,
            motivo=motivo_manutencao,
            data_entrada=dados.data,
            previsao_retorno=(
                dados.previsao_retorno
            ),
            status="EM_MANUTENCAO",
        )

        db.add(
            nova_manutencao
        )

        db.commit()
        db.refresh(
            nova_manutencao
        )

        return {
            "tipo_registro": "MANUTENCAO",
            "mensagem": (
                f"{veiculo.placa} foi registrado "
                "em manutenção."
            ),
            "operacao": None,
            "manutencao": nova_manutencao,
        }

    nova_operacao = models.Operacao(
        data=dados.data,
        turno=turno,
        veiculo_id=veiculo.id,
        motorista_id=None,
        rota_id=None,
        status=classificacao,
        observacao=motivo,
        origem="MANUAL",
    )

    db.add(
        nova_operacao
    )

    db.commit()
    db.refresh(
        nova_operacao
    )

    return {
        "tipo_registro": "OPERACAO",
        "mensagem": (
            f"{veiculo.placa} foi classificado "
            "com sucesso."
        ),
        "operacao": nova_operacao,
        "manutencao": None,
    }

# =====================================================
# PANORAMA
# =====================================================

LEGENDA_STATUS = {
    "CARREGANDO": "✅",
    "EM_ROTA": "✅",
    "CONCLUIDA": "✅",
    "RETORNANDO_ESTACAO": "🔄",
    "AMBULANCIA": "🚑",
    "RESERVA_CARREGANDO": "🚗",
    "FOLGA": "⚠️",
    "IMPEDIDO": "🚫",
    "SEM_CARGA": "📦",
    "OUTRO_SERVICE": "🔄",
    "INDISPONIVEL_MOTORISTA": "⏸️",
    "SEM_CLASSIFICACAO": "",
}


def obter_configuracao_panorama(db: Session) -> models.PanoramaConfiguracao:
    config = db.get(models.PanoramaConfiguracao, 1)
    if not config:
        config = models.PanoramaConfiguracao(
            id=1,
            unidade="SSP17: SBC",
            operador="",
        )
        db.add(config)
        db.commit()
        db.refresh(config)
    return config


@app.get(
    "/configuracao-panorama",
    response_model=schemas.PanoramaConfiguracaoResponse,
    tags=["Panorama"],
)
def ler_configuracao_panorama(db: Session = Depends(get_db)):
    return obter_configuracao_panorama(db)


@app.put(
    "/configuracao-panorama",
    response_model=schemas.PanoramaConfiguracaoResponse,
    tags=["Panorama"],
)
def salvar_configuracao_panorama(
    dados: schemas.PanoramaConfiguracaoUpdate,
    db: Session = Depends(get_db),
):
    config = obter_configuracao_panorama(db)
    if dados.unidade is not None:
        config.unidade = dados.unidade.strip() or "SSP17: SBC"
    if dados.operador is not None:
        config.operador = dados.operador.strip()
    db.commit()
    db.refresh(config)
    return config


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
    config = obter_configuracao_panorama(db)
    veiculos = db.scalars(
        select(models.Veiculo)
        .where(models.Veiculo.ativo.is_(True))
        .order_by(models.Veiculo.placa)
    ).all()

    manutencoes = db.scalars(
        select(models.Manutencao).where(
            models.Manutencao.data_entrada <= data_operacao,
            or_(
                models.Manutencao.data_retorno.is_(None),
                models.Manutencao.data_retorno >= data_operacao,
            ),
        )
    ).all()

    consulta = select(models.Operacao).where(
        models.Operacao.data == data_operacao
    )
    if turno:
        consulta = consulta.where(models.Operacao.turno == turno)
    operacoes = db.scalars(
        consulta.order_by(models.Operacao.criado_em)
    ).all()

    motoristas = {
        item.id: item
        for item in db.scalars(select(models.Motorista)).all()
    }
    ajudantes = {
        item.id: item
        for item in db.scalars(select(models.Ajudante)).all()
    }
    veiculos_por_id = {item.id: item for item in veiculos}
    operacao_por_veiculo = {
        item.veiculo_id: item
        for item in operacoes
        if item.veiculo_id is not None
    }
    ids_manutencao = {item.veiculo_id for item in manutencoes}

    ociosos = [
        item
        for item in veiculos
        if item.id not in operacao_por_veiculo
        and item.id not in ids_manutencao
    ]
    ociosos.extend(
        veiculos_por_id[item.veiculo_id]
        for item in operacoes
        if item.veiculo_id in veiculos_por_id
        and item.status in {"SEM_CLASSIFICACAO", "INDISPONIVEL_MOTORISTA"}
    )
    vistos = set()
    ociosos = [
        item for item in ociosos
        if not (item.id in vistos or vistos.add(item.id))
    ]

    linhas = [
        f"PANORAMA {config.unidade}",
        f"MLP: {config.operador}" if config.operador else "MLP:",
        data_operacao.strftime("%d/%m/%Y"),
        "",
        f"Quantidade total de veiculos na base: {len(veiculos)}",
        f"Quantidade total de veiculos em manutenção: {len(manutencoes)}",
        f"Quantidade de veiculos ociosos: {len(ociosos)}",
        "",
        "Legenda:",
        "",
        "✅ Carregando",
        "🚗 Carro reserva/Carregando",
        "⏸️ Indisponível/motorista",
        "⚠️ Folga planejada motorista",
        "🛠️ Manutenção",
        "🚫 Impedido de rodar no dia. (informar o motivo)",
        "📦 Sem carga",
        "🔄 Rodou em outro service",
        "",
        "FROTA FIXA",
        "",
    ]

    for veiculo in veiculos:
        operacao = operacao_por_veiculo.get(veiculo.id)
        if not operacao:
            if veiculo.id not in ids_manutencao:
                linhas.append(veiculo.placa)
            continue

        partes = [veiculo.placa]
        emoji = LEGENDA_STATUS.get(operacao.status, "")
        if emoji:
            partes.append(emoji)
        if operacao.status == "FOLGA":
            partes.append("Folga")
        if operacao.rota_id:
            partes.append(operacao.rota_id)

        motorista = motoristas.get(operacao.motorista_id)
        if motorista:
            partes.append(f"({motorista.nome})")

        ajudante = ajudantes.get(operacao.ajudante_id)
        if ajudante:
            partes.append(f"[Ajudante: {ajudante.nome}]")

        if operacao.observacao:
            partes.append(operacao.observacao)

        linhas.append(" ".join(partes))

    linhas.extend(["", "CARROS EM MANUTENÇÃO.", ""])

    for manutencao in sorted(
        manutencoes,
        key=lambda item: (
            veiculos_por_id.get(item.veiculo_id).placa
            if item.veiculo_id in veiculos_por_id
            else ""
        ),
    ):
        veiculo = veiculos_por_id.get(manutencao.veiculo_id)
        if not veiculo:
            continue
        motivo = (manutencao.motivo or "").strip()
        linhas.append(
            f"{veiculo.placa} 🛠️" + (f" {motivo}" if motivo else "")
        )

    return schemas.PanoramaResponse(
        data=data_operacao,
        turno=turno,
        total_veiculos=len(veiculos),
        veiculos_manutencao=len(manutencoes),
        veiculos_operacao=len(operacoes),
        veiculos_ociosos=len(ociosos),
        texto="\n".join(linhas),
    )
