from typing import Optional, List

from pydantic import BaseModel

from .PetSchema import PetSchema

class DonoSchema(BaseModel):
    id: Optional[int]
    nome: str
    telefone: str
    email: Optional[str]
    endereco: Optional[str]
    cep: Optional[str]
    observacoes: Optional[str]


    class Config:
        orm_mode = True


class DonoSchemaPets(DonoSchema):
    pets: Optional[List[PetSchema]]