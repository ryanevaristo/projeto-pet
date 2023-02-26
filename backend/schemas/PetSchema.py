from typing import Optional

from pydantic import BaseModel

class PetSchema(BaseModel):
    nome: str
    raca: str
    porte: str
    sexo: str
    pelagem: str
    observacoes: str
    dono_id: int

    class Config:
        orm_mode = True


class PetSchemaUpdate(BaseModel):
    nome: Optional[str]
    raca: Optional[str]
    porte: Optional[str]
    sexo: Optional[str]
    pelagem: Optional[str]
    observacoes: Optional[str]

    class Config:
        orm_mode = True


class PetSchemaCreate(PetSchema):
    id: Optional[int]