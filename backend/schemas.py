from datetime import date, datetime
from decimal import Decimal

from pydantic import BaseModel, ConfigDict, Field


# =====================================================
# VEÍCULOS
# =====================================================

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


# =====================================================
# MOTORISTAS
# =====================================================

class MotoristaCreate(BaseModel):
    nome: str
    cpf: str | None = None
    telefone: str | None = None
    cnh: str | None = None
    categoria_cnh: str | None = None
    validade_cnh: date | None = None
    observacao: str | None = None
    ativo: bool = True


class MotoristaUpdate(BaseModel):
    nome: str | None = None
    cpf: str | None = None
    telefone: str | None = None
    cnh: str | None = None
    categoria_cnh: str | None = None
    validade_cnh: date | None = None
    observacao: str | None = None
    ativo: bool | None = None


class MotoristaResponse(BaseModel):
    id: int
    nome: str
    cpf: str | None
    telefone: str | None
    cnh: str | None
    categoria_cnh: str | None
    validade_cnh: date | None
    observacao: str | None
    ativo: bool
    criado_em: datetime
    atualizado_em: datetime

    model_config = ConfigDict(
        from_attributes=True
    )


# =====================================================
# AJUDANTES
# =====================================================

class AjudanteCreate(BaseModel):
    nome: str
    cpf: str | None = None
    telefone: str | None = None
    observacao: str | None = None
    ativo: bool = True


class AjudanteUpdate(BaseModel):
    nome: str | None = None
    cpf: str | None = None
    telefone: str | None = None
    observacao: str | None = None
    ativo: bool | None = None


class AjudanteResponse(AjudanteCreate):
    id: int
    criado_em: datetime
    atualizado_em: datetime
    model_config = ConfigDict(from_attributes=True)


# =====================================================
# MANUTENÇÕES
# =====================================================

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


# =====================================================
# OPERAÇÕES
# =====================================================

class OperacaoCreate(BaseModel):
    data: date
    turno: str
    veiculo_id: int | None = None
    motorista_id: int | None = None
    ajudante_id: int | None = None
    rota_id: str | None = None
    status: str
    observacao: str | None = None
    origem: str = "MANUAL"


class OperacaoUpdate(BaseModel):
    turno: str | None = None
    veiculo_id: int | None = None
    motorista_id: int | None = None
    ajudante_id: int | None = None
    rota_id: str | None = None
    status: str | None = None
    observacao: str | None = None


class OperacaoResponse(BaseModel):
    id: int
    data: date
    turno: str
    veiculo_id: int | None
    motorista_id: int | None
    ajudante_id: int | None
    rota_id: str | None
    status: str
    observacao: str | None
    origem: str
    criado_em: datetime
    atualizado_em: datetime

    model_config = ConfigDict(
        from_attributes=True
    )


# =====================================================
# HISTÓRICO DE VEÍCULO
# =====================================================

class VeiculoHistoricoResponse(BaseModel):
    veiculo: VeiculoResponse
    manutencoes: list[ManutencaoResponse]
    operacoes: list[OperacaoResponse]


# =====================================================
# HISTÓRICO DE MOTORISTA
# =====================================================

class MotoristaHistoricoResponse(BaseModel):
    motorista: MotoristaResponse
    operacoes: list[OperacaoResponse]


# =====================================================
# PANORAMA
# =====================================================

class PanoramaResponse(BaseModel):
    data: date
    turno: str | None = None
    total_veiculos: int
    veiculos_manutencao: int
    veiculos_operacao: int
    veiculos_ociosos: int
    texto: str


# =====================================================
# IMPORTAÇÃO ASSISTIDA
# =====================================================

class ImportacaoOperacaoRegistro(BaseModel):
    placa: str

    # Usado para preencher ou atualizar o cadastro
    # automático do veículo.
    tipo_veiculo: str | None = None

    motorista: str | None = None
    rota_id: str | None = None

    # Status padronizado da operação:
    # CARREGANDO, EM_ROTA, CONCLUIDA,
    # RETORNANDO_ESTACAO ou AMBULANCIA.
    status: str

    # Identificação operacional exibida depois do
    # nome do motorista, por exemplo: D11_AM1.
    cluster: str | None = None

    # Informação complementar opcional. Não deve
    # repetir status, ciclo ou tipo do veículo.
    observacao: str | None = None


class ImportacaoOperacaoRequest(BaseModel):
    data: date
    turno: str
    origem: str = "IMPORTACAO_ASSISTIDA"
    registros: list[ImportacaoOperacaoRegistro]


class ImportacaoOperacaoPendencia(BaseModel):
    placa: str | None = None
    motivo: str


class ImportacaoOperacaoResponse(BaseModel):
    recebidos: int
    importados: int
    atualizados: int
    ignorados: int
    pendencias: list[ImportacaoOperacaoPendencia]


# =====================================================
# VEÍCULOS SEM REGISTRO NO TURNO
# =====================================================

class VeiculoSemRegistroResponse(BaseModel):
    id: int
    placa: str
    tipo: str | None = None
    categoria: str
    observacao: str | None = None

    model_config = ConfigDict(
        from_attributes=True
    )


class ClassificarVeiculoAusenteRequest(BaseModel):
    data: date
    turno: str

    # Valores aceitos:
    # MANUTENCAO, FOLGA, IMPEDIDO, SEM_CARGA,
    # OUTRO_SERVICE ou INDISPONIVEL_MOTORISTA.
    classificacao: str

    motivo: str | None = None
    previsao_retorno: date | None = None


class ClassificarVeiculoAusenteResponse(BaseModel):
    tipo_registro: str
    mensagem: str
    operacao: OperacaoResponse | None = None
    manutencao: ManutencaoResponse | None = None

class PanoramaConfiguracaoUpdate(BaseModel):
    unidade: str | None = None
    operador: str | None = None


class PanoramaConfiguracaoResponse(BaseModel):
    id: int
    unidade: str
    operador: str
    atualizado_em: datetime
    model_config = ConfigDict(from_attributes=True)


# =====================================================
# IMPORTAÇÃO INTELIGENTE V6
# =====================================================

class ImportacaoInteligenteTextoRequest(BaseModel):
    texto: str
    data: date | None = None
    turno: str | None = None
    usar_ia: bool = True


class ImportacaoInteligenteRegistro(BaseModel):
    placa: str
    tipo_registro: str = "OPERACAO"
    tipo_veiculo: str | None = None
    motorista: str | None = None
    ajudante: str | None = None
    rota_id: str | None = None
    status: str = "SEM_CLASSIFICACAO"
    motivo: str | None = None
    observacao: str | None = None
    confianca: float | None = Field(default=None, ge=0, le=1)
    origem_linha: str | None = None
    alerta: str | None = None


class ImportacaoInteligenteAnaliseResponse(BaseModel):
    metodo: str
    ia_configurada: bool
    modelo: str | None = None
    data: date | None = None
    turno: str | None = None
    unidade: str | None = None
    operador: str | None = None
    registros: list[ImportacaoInteligenteRegistro]
    avisos: list[str] = []


class ImportacaoInteligenteConfirmarRequest(BaseModel):
    data: date
    turno: str
    origem: str = "IMPORTACAO_INTELIGENTE"
    sobrescrever_manuais: bool = False
    registros: list[ImportacaoInteligenteRegistro]


class ImportacaoInteligenteConfirmarResponse(BaseModel):
    recebidos: int
    operacoes_importadas: int
    operacoes_atualizadas: int
    manutencoes_importadas: int
    manutencoes_atualizadas: int
    ignorados: int
    pendencias: list[ImportacaoOperacaoPendencia]
