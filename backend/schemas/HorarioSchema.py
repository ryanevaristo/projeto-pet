from pydantic import BaseModel
from typing import Optional

class HorarioSchema(BaseModel):
    id: Optional[int]
    hora: str
    disponivel: bool = True
    
    
    class Config:
        orm_mode = True