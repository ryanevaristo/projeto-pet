from typing import List, Optional
from pydantic import AnyUrl, BaseModel, EmailStr
from schemas.SchedulerSchema import SchedulerSchemaDatas


class UsuarioSchemaBase(BaseModel):
    id: Optional[int] = None
    foto: AnyUrl
    nome: str
    sobrenome: str
    telefone: str
    email: EmailStr
    is_admin : bool = False

    class Config:
        orm_mode = True


class UsuarioSchemaCreate(UsuarioSchemaBase):
        senha: str


class UsuarioSchemaUpdate(UsuarioSchemaBase):
    foto: Optional[AnyUrl]
    nome: Optional[str]
    sobrenome: Optional[str]
    telefone: Optional[str]
    email: Optional[EmailStr]
    senha: Optional[str]

class UsuarioSchemaAgenda(UsuarioSchemaBase):
    agendamentos: Optional[List[SchedulerSchemaDatas]]