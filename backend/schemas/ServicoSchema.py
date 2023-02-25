from pydantic import BaseModel
from typing import Optional


class ServicoSchema(BaseModel):
    id: Optional[int]
    nome_servico: str
    valor: float
    tempo: str
    descricao: str
    usuario_id : int

    class Config:
        orm_mode = True
        