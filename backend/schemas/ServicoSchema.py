from pydantic import BaseModel
from typing import Optional


class ServicoSchema(BaseModel):
    nome_servico: str
    valor: float
    tempo: str
    descricao: str

    class Config:
        orm_mode = True

class ServicoSchemaCreate(ServicoSchema):
    id: Optional[int]


class ServicoSchemaUpdate(ServicoSchema):
    nome_servico: Optional[str]
    valor: Optional[float]
    tempo: Optional[str]
    descricao: Optional[str]
    

