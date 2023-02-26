from core.configs import settings
from sqlalchemy import Column, String, ForeignKey, Integer
from sqlalchemy.orm import relationship
from models.PetModel import PetModel

class DonoModel(settings.DB_BASE_MODEL):
    __tablename__ = 'donos'

    id = Column(Integer, autoincrement=True, primary_key=True)
    nome = Column(String(256), nullable=True)
    telefone = Column(String(256), nullable=True)
    email = Column(String(256), nullable=True)
    endereco = Column(String(256), nullable=True)
    cep = Column(String(256), nullable=True)
    observacoes = Column(String(256), nullable=True)
    pets = relationship("PetModel", back_populates="dono",
                         lazy='joined', cascade="all,delete-orphan", uselist=True)