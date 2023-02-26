from typing import List
from fastapi import APIRouter, Response, status, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from models.DonoModel import DonoModel
from models.UsuarioModel import UsuarioModel


from core.deps import get_session, get_current_user
from schemas.DonoSchema import DonoSchema, DonoSchemaCreate, DonoSchemaUpdate

router = APIRouter()

#POST dono
@router.post('/', status_code=status.HTTP_201_CREATED, response_model=DonoSchemaCreate)
async def post_dono(dono: DonoSchema ,db: AsyncSession = Depends(get_session)):
    novo_dono: DonoModel = DonoModel(
        nome=dono.nome,
        telefone=dono.telefone,
        email=dono.email,
        endereco=dono.endereco,
        cep=dono.cep,
        observacoes=dono.observacoes
        )
    db.add(novo_dono)
    await db.commit()
    return novo_dono

#GET donos
@router.get('/')
async def get_donos(db: AsyncSession = Depends(get_session)):
    async with db as session:
        query = select(DonoModel)
        result = await session.execute(query)
        donos: List[DonoModel] = result.scalars().unique().all()
        
        if donos:
            return donos
        else:
            raise HTTPException(detail="Dono não Encontrado", status_code=status.HTTP_404_NOT_FOUND)
        
#GET dono
@router.get('/{id_dono}', status_code=status.HTTP_200_OK)
async def get_dono(id_dono: int, db: AsyncSession = Depends(get_session)):
    async with db as session:
        query = select(DonoModel).filter(DonoModel.id == id_dono)
        result = await session.execute(query)
        dono: DonoSchema = result.scalars().unique().one_or_none()

        if dono:
            return dono
        else:
            raise HTTPException(detail="Dono não Encontrado", status_code=status.HTTP_404_NOT_FOUND)
        
#PUT dono
@router.put('/{id_dono}', status_code=status.HTTP_200_OK)
async def put_dono(id_dono: int, dono: DonoSchemaUpdate, db: AsyncSession = Depends(get_session)):
    async with db as session:
        query = select(DonoModel).filter(DonoModel.id == id_dono)
        result = await session.execute(query)
        dono_bd: DonoModel = result.scalars().unique().one_or_none()

        if dono_bd:
            dono_bd.nome = dono.nome
            dono_bd.telefone = dono.telefone
            dono_bd.email = dono.email
            dono_bd.endereco = dono.endereco
            dono_bd.cep = dono.cep
            dono_bd.observacoes = dono.observacoes
            await db.commit()
            return dono_bd
        else:
            raise HTTPException(detail="Dono não Encontrado", status_code=status.HTTP_404_NOT_FOUND)
        
#DELETE dono
@router.delete('/{id_dono}', status_code=status.HTTP_200_OK)
async def delete_dono(id_dono: int, db: AsyncSession = Depends(get_session)):
    async with db as session:
        query = select(DonoModel).filter(DonoModel.id == id_dono)
        result = await session.execute(query)
        dono: DonoModel = result.scalars().unique().one_or_none()

        if dono:
            db.delete(dono)
            await db.commit()
            return Response(status_code=status.HTTP_200_OK)
        else:
            raise HTTPException(detail="Dono não Encontrado", status_code=status.HTTP_404_NOT_FOUND)
        

        