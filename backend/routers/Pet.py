from typing import List
from fastapi import APIRouter, Response, status, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from models.DonoModel import DonoModel
from models.UsuarioModel import UsuarioModel
from models.PetModel import PetModel
from core.deps import get_session, get_current_user
from schemas.PetSchema import PetSchema, PetSchemaCreate, PetSchemaUpdate

router = APIRouter()

#POST pet 
@router.post('/', status_code=status.HTTP_201_CREATED, response_model=PetSchemaCreate)
async def post_pet(pet: PetSchema ,usuario_logado: UsuarioModel = Depends(get_current_user),db: AsyncSession = Depends(get_session)):
    novo_pet: PetModel = PetModel(
        nome=pet.nome,
        raca=pet.raca,
        porte=pet.porte,
        sexo=pet.sexo,
        pelagem=pet.pelagem,
        observacoes=pet.observacoes,
        dono_id=pet.dono_id
        )
    db.add(novo_pet)
    await db.commit()
    return novo_pet

#GET pets
@router.get('/')
async def get_pets(db: AsyncSession = Depends(get_session)):
    async with db as session:
        query = select(PetModel)
        result = await session.execute(query)
        pets: List[PetModel] = result.scalars().unique().all()
        
        if pets:
            return pets
        else:
            raise HTTPException(detail="Pet não Encontrado", status_code=status.HTTP_404_NOT_FOUND)
        
#GET pet
@router.get('/{id_pet}', status_code=status.HTTP_200_OK)
async def get_pet(id_pet: int, db: AsyncSession = Depends(get_session)):
    async with db as session:
        query = select(PetModel).filter(PetModel.id == id_pet)
        result = await session.execute(query)
        pet: PetSchema = result.scalars().unique().one_or_none()

        if pet:
            return pet
        else:
            raise HTTPException(detail="Pet não Encontrado", status_code=status.HTTP_404_NOT_FOUND)
        
#PUT pet
@router.put('/{id_pet}', status_code=status.HTTP_200_OK)
async def put_pet(id_pet: int, pet: PetSchemaUpdate, db: AsyncSession = Depends(get_session)):
    async with db as session:
        query = select(PetModel).filter(PetModel.id == id_pet)
        result = await session.execute(query)
        pet: PetSchema = result.scalars().unique().one_or_none()

        if pet:
            pet.nome = pet.nome
            pet.raca = pet.raca
            pet.porte = pet.porte
            pet.observacoes = pet.observacoes
            await db.commit()
            return pet
        else:
            raise HTTPException(detail="Pet não Encontrado", status_code=status.HTTP_404_NOT_FOUND)
        

#DELETE pet
@router.delete('/{id_pet}', status_code=status.HTTP_200_OK)
async def delete_pet(id_pet: int, db: AsyncSession = Depends(get_session)):
    async with db as session:
        query = select(PetModel).filter(PetModel.id == id_pet)
        result = await session.execute(query)
        pet: PetSchema = result.scalars().unique().one_or_none()

        if pet:
            db.delete(pet)
            await db.commit()
            return Response(status_code=status.HTTP_200_OK)
        else:
            raise HTTPException(detail="Pet não Encontrado", status_code=status.HTTP_404_NOT_FOUND)


