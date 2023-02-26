
from datetime import date
from typing import Optional
from pydantic import BaseModel




class SchedulerSchema(BaseModel):
    id: Optional[int]
    usuario_id: Optional[int] # funcionario
    servico_id: Optional[int]
    dono_id: Optional[int] # dono
    pet_id: Optional[int] # pet
    horario_id: Optional[int] # horario
    num_pedido: int | None = None
    valor_adicional: float | None = 0.0
    valor_final: float | None = 0.0
    ativo: bool = False

    class Config:
        orm_mode = True
    

class SchedulerSchemaDatas(SchedulerSchema):
    horario: str
    created_by: date | None = None
    cancel_date: date | None = None