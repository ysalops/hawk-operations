from datetime import datetime

from pydantic import BaseModel, ConfigDict


class VeiculoBase(BaseModel):
    placa: str
    tipo: str | None = None
    categoria: str = "Frota fixa"
    ativo: bool = True


class VeiculoCreate(VeiculoBase):
    pass


class VeiculoResponse(VeiculoBase):
    id: int
    criado_em: datetime

    model_config = ConfigDict(from_attributes=True)

from datetime import date, datetime

from pydantic import BaseModel, ConfigDict


class VeiculoBase(BaseModel):
    placa: str
    tipo: str | None = None
    categoria: str = "Frota fixa"
    ativo: bool = True


class VeiculoCreate(VeiculoBase):
    pass


class VeiculoResponse(VeiculoBase):
    id: int
    criado_em: datetime

    model_config = ConfigDict(from_attributes=True)

# MANUTENÇÕES

class ManutencaoCreate(BaseModel):
    veiculo_id: int
    motivo: str
    data_entrada: date
    previsao_retorno: date | None = None


class ManutencaoResponse(BaseModel):
    id: int
    veiculo_id: int
    motivo: str
    data_entrada: date
    previsao_retorno: date | None
    data_retorno: date | None
    status: str

    model_config = ConfigDict(from_attributes=True)


class ManutencaoFinalizar(BaseModel):
    data_retorno: date | None = None

# MOTORISTAS

class MotoristaCreate(BaseModel):
    nome: str
    telefone: str | None = None
    ativo: bool = True


class MotoristaUpdate(BaseModel):
    nome: str | None = None
    telefone: str | None = None
    ativo: bool | None = None


class MotoristaResponse(BaseModel):
    id: int
    nome: str
    telefone: str | None
    ativo: bool
    criado_em: datetime

    model_config = ConfigDict(from_attributes=True)