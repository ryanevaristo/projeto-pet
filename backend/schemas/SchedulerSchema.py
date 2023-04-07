
from datetime import date
from typing import Optional
from pydantic import BaseModel




class SchedulerSchema(BaseModel):
    id: Optional[int]
    usuario_id: Optional[int] # funcionario
    servico_name: Optional[str]
    servico_id: Optional[int]
    pet_id: Optional[int] # pet
    horario_id: Optional[int] # horario
    valor_final: float | None = 0.0
    ativo: bool = True

    class Config:
        orm_mode = True
    

class SchedulerSchemaDatas(SchedulerSchema):
    created_by: date | None = None
    cancel_date: date | None = date.today()