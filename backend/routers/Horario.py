from typing import List
from fastapi import APIRouter, Response, status, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from models.HorarioModel import HorarioModel
from models.UsuarioModel import UsuarioModel
from core.deps import get_session, get_current_user
from schemas.HorarioSchema import HorarioSchema, HorarioSchemaCreate, HorarioSchemaUpdate

router = APIRouter()

#POST horario
@router.post('/', status_code=status.HTTP_201_CREATED, response_model=HorarioSchemaCreate)
async def post_horario(horario: HorarioSchema ,usuario_logado: UsuarioModel = Depends(get_current_user),db: AsyncSession = Depends(get_session)):
    novo_horario: HorarioModel = HorarioModel(
        hora=horario.hora,
        disponivel=horario.disponivel
        )
    db.add(novo_horario)
    await db.commit()
    return novo_horario

#GET horarios
@router.get('/')
async def get_horarios(db: AsyncSession = Depends(get_session)):
    async with db as session:
        query = select(HorarioModel)
        result = await session.execute(query)
        horarios: List[HorarioModel] = result.scalars().unique().all()
        
        if horarios:
            return horarios
        else:
            raise HTTPException(detail="Horario não Encontrado", status_code=status.HTTP_404_NOT_FOUND)
        

#GET horario
@router.get('/{id_horario}', status_code=status.HTTP_200_OK)
async def get_horario(id_horario: int, db: AsyncSession = Depends(get_session)):
    async with db as session:
        query = select(HorarioModel).filter(HorarioModel.id == id_horario)
        result = await session.execute(query)
        horario: HorarioSchema = result.scalars().unique().one_or_none()

        if horario:
            return horario
        else:
            raise HTTPException(detail="Horario não Encontrado", status_code=status.HTTP_404_NOT_FOUND)
        

#PUT horario
@router.put('/{id_horario}', status_code=status.HTTP_200_OK)
async def put_horario(id_horario: int, horario: HorarioSchemaUpdate, db: AsyncSession = Depends(get_session)):
    async with db as session:
        query = select(HorarioModel).filter(HorarioModel.id == id_horario)
        result = await session.execute(query)
        horario: HorarioModel = result.scalars().unique().one_or_none()

        if horario:
            horario.hora = horario.hora
            horario.disponivel = horario.disponivel
            await db.commit()
            return horario
        else:
            raise HTTPException(detail="Horario não Encontrado", status_code=status.HTTP_404_NOT_FOUND)
        

#DELETE horario
@router.delete('/{id_horario}', status_code=status.HTTP_200_OK)
async def delete_horario(id_horario: int, db: AsyncSession = Depends(get_session)):
    async with db as session:
        query = select(HorarioModel).filter(HorarioModel.id == id_horario)
        result = await session.execute(query)
        horario: HorarioModel = result.scalars().unique().one_or_none()

        if horario:
            db.delete(horario)
            await db.commit()
            return Response(status_code=status.HTTP_200_OK)
        else:
            raise HTTPException(detail="Horario não Encontrado", status_code=status.HTTP_404_NOT_FOUND)
        
    