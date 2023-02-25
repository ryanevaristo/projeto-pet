from typing import Optional

from pydantic import BaseModel

class PetSchema(BaseModel):
    id: Optional[int]
    nome: str
    tipo: str
    raca: str
    cor: str
    porte: str
    sexo: str
    idade: str
    observacoes: str
    dono_id: str

    class Config:
        orm_mode = True