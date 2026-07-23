from datetime import date, datetime
from decimal import Decimal

from pydantic import BaseModel, ConfigDict


# VEÍCULOS


class VeiculoBase(BaseModel):
    placa: str
    tipo: str | None = None
    categoria: str = "Frota fixa"
    observacao: str | None = None
    ativo: bool = True


class VeiculoCreate(VeiculoBase):
    pass


class VeiculoUpdate(BaseModel):
    placa: str | None = None
    tipo: str | None = None
    categoria: str | None = None
    observacao: str | None = None
    ativo: bool | None = None


class VeiculoResponse(VeiculoBase):
    id: int
    criado_em: datetime
    atualizado_em: datetime

    model_config = ConfigDict(
        from_attributes=True
    )

# MOTORISTAS


class MotoristaCreate(BaseModel):
    nome: str
    telefone: str | None = None
    observacao: str | None = None
    ativo: bool = True


class MotoristaUpdate(BaseModel):
    nome: str | None = None
    telefone: str | None = None
    observacao: str | None = None
    ativo: bool | None = None


class MotoristaResponse(BaseModel):
    id: int

    nome: str
    telefone: str | None
    observacao: str | None

    ativo: bool

    criado_em: datetime
    atualizado_em: datetime

    model_config = ConfigDict(
        from_attributes=True
    )


# MANUTENÇÕES


class ManutencaoCreate(BaseModel):
    veiculo_id: int

    motivo: str

    data_entrada: date

    previsao_retorno: date | None = None


class ManutencaoFinalizar(BaseModel):
    data_retorno: date | None = None

    servico_realizado: str | None = None

    condicao_retorno: str | None = None

    observacao_retorno: str | None = None

    oficina: str | None = None

    custo: Decimal | None = None


class ManutencaoResponse(BaseModel):
    id: int

    veiculo_id: int

    motivo: str

    data_entrada: date

    previsao_retorno: date | None

    data_retorno: date | None

    status: str

    servico_realizado: str | None

    condicao_retorno: str | None

    observacao_retorno: str | None

    oficina: str | None

    custo: Decimal | None

    criado_em: datetime

    atualizado_em: datetime

    model_config = ConfigDict(
        from_attributes=True
    )


# OPERAÇÕES


class OperacaoCreate(BaseModel):
    data: date

    turno: str

    veiculo_id: int | None = None

    motorista_id: int | None = None

    rota_id: str | None = None

    status: str

    observacao: str | None = None

    origem: str = "MANUAL"


class OperacaoUpdate(BaseModel):
    turno: str | None = None

    veiculo_id: int | None = None

    motorista_id: int | None = None

    rota_id: str | None = None

    status: str | None = None

    observacao: str | None = None


class OperacaoResponse(BaseModel):
    id: int

    data: date

    turno: str

    veiculo_id: int | None

    motorista_id: int | None

    rota_id: str | None

    status: str

    observacao: str | None

    origem: str

    criado_em: datetime

    atualizado_em: datetime

    model_config = ConfigDict(
        from_attributes=True
    )


# HISTÓRICO DE VEÍCULO


class VeiculoHistoricoResponse(BaseModel):
    veiculo: VeiculoResponse

    manutencoes: list[ManutencaoResponse]

    operacoes: list[OperacaoResponse]


# HISTÓRICO DE MOTORISTA


class MotoristaHistoricoResponse(BaseModel):
    motorista: MotoristaResponse

    operacoes: list[OperacaoResponse]


# PANORAMA


class PanoramaResponse(BaseModel):
    data: date

    turno: str | None = None

    total_veiculos: int

    veiculos_manutencao: int

    veiculos_operacao: int

    texto: str

# COLETA AUTOMÁTICA

class ColetaRegistro(BaseModel):
    placa: str
    motorista: str | None = None
    rota_id: str | None = None
    status: str
    observacao: str | None = None


class ColetaImportarRequest(BaseModel):
    data: date
    turno: str
    origem: str = "HAWK_COLLECTOR"
    registros: list[ColetaRegistro]


class ColetaPendencia(BaseModel):
    placa: str | None = None
    motivo: str


class ColetaImportarResponse(BaseModel):
    recebidos: int
    importados: int
    atualizados: int
    ignorados: int
    pendencias: list[ColetaPendencia]