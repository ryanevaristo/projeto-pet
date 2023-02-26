from typing import List

from fastapi import APIRouter, Response, status, Depends, HTTPException


from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select


from models.SchedulerModel import SchedulerModel
from models.UsuarioModel import UsuarioModel
from schemas.SchedulerSchema import SchedulerSchemaDatas
from core.deps import get_session, get_current_user

router = APIRouter()



#POST scheduler
@router.post('/', status_code=status.HTTP_201_CREATED, response_model=SchedulerSchemaDatas)
async def post_scheduler(scheduler: SchedulerSchemaDatas,usuario_logado: UsuarioModel = Depends(get_current_user),db: AsyncSession = Depends(get_session)):
    async with db as session:

        novo_scheduler: SchedulerModel = SchedulerModel(
            id=scheduler.id,
            usuario_id=scheduler.usuario_id, 
            servico_id=scheduler.servico_id,
            dono_id=scheduler.dono_id,
            pet_id=scheduler.pet_id,
            horario_id=scheduler.horario_id,
            num_pedido=scheduler.num_pedido,
            ativo=scheduler.ativo,
            created_by=scheduler.created_by, 
            cancel_date=scheduler.cancel_date)
        
        if scheduler.usuario_id == usuario_logado.id:
            db.add(novo_scheduler)
            await db.commit()
            return novo_scheduler
        else:
            raise HTTPException(detail="Você não está autorizado", status_code=status.HTTP_401_UNAUTHORIZED)


#GET schedulers
@router.get('/',response_model=List[SchedulerSchemaDatas])
async def get_schedulers(db: AsyncSession = Depends(get_session), usuario_logado: UsuarioModel = Depends(get_current_user)):
    async with db as session:
        query = select(SchedulerModel)
        result = await session.execute(query)
        schedulers: List[SchedulerSchemaDatas] = result.scalars().unique().all()
        
        if schedulers:
            return schedulers
        else:
            raise HTTPException(detail="scheduler não Encontrado", status_code=status.HTTP_404_NOT_FOUND)


#GET scheduler
@router.get('/{id_scheduler}', response_model=SchedulerSchemaDatas, status_code=status.HTTP_200_OK)
async def get_scheduler(id_scheduler: int, db: AsyncSession = Depends(get_session)):
    async with db as session:
        query = select(SchedulerModel).filter(SchedulerModel.id == id_scheduler)
        result = await session.execute(query)
        scheduler: SchedulerSchemaDatas = result.scalars().unique().one_or_none()

        if scheduler:
            return scheduler
        else:
            raise HTTPException(detail="scheduler não Encontrado", status_code=status.HTTP_404_NOT_FOUND)



#DELETE scheduler
@router.delete('/{id_scheduler}', status_code=status.HTTP_204_NO_CONTENT)
async def delete_scheduler(id_scheduler: int, usuario_logado: UsuarioModel = Depends(get_current_user),db: AsyncSession = Depends(get_session)):
    async with db as session:
        query = select(SchedulerModel).filter(SchedulerModel.id == id_scheduler).filter(SchedulerModel.usuario_id == usuario_logado)
        result = session.execute(query)
        scheduler_del: SchedulerSchemaDatas = result.scalars().unique().one_or_none()

        if scheduler_del:
            await session.delete(scheduler_del)
            await session.commit()
            return Response(status_code=status.HTTP_204_NO_CONTENT)
        else:
            raise HTTPException(detail="scheduler não Encontrado", status_code=status.HTTP_404_NOT_FOUND)
