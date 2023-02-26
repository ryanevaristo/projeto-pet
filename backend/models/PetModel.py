from core.configs import settings
from sqlalchemy import Column, String, Integer, ForeignKey
from sqlalchemy.orm import relationship


class PetModel(settings.DB_BASE_MODEL):
    __tablename__ = 'pets'

    id = Column(Integer, autoincrement=True, primary_key=True)
    nome = Column(String(256), nullable=True)
    raca = Column(String(256), nullable=True)
    porte = Column(String(256), nullable=True)
    sexo = Column(String(256), nullable=True)
    pelagem = Column(String(256), nullable=True)
    observacoes = Column(String(256), nullable=True)
    dono_id = Column(Integer, ForeignKey('donos.id'))
    dono = relationship("DonoModel", back_populates="pets", lazy="joined")
