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