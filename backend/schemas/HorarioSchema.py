from pydantic import BaseModel
from typing import Optional

class HorarioSchema(BaseModel):
    id: Optional[int]
    hora: str
    disponivel: bool = True
    
    
    class Config:
        orm_mode = True


class HorarioSchemaCreate(BaseModel):
    hora: str
    disponivel: bool = True
    
    
    class Config:
        orm_mode = True

class HorarioSchemaUpdate(BaseModel):
    hora: Optional[str]
    disponivel: Optional[bool]
    
    
    class Config:
        orm_mode = True