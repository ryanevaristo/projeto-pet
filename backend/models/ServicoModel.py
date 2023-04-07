from core.configs import settings
from sqlalchemy import Column, String, ForeignKey, Integer
from sqlalchemy.orm import relationship


class ServicoModel(settings.DB_BASE_MODEL):
    __tablename__ = 'servicos'


    id = Column(Integer, autoincrement=True, primary_key=True)
    nome_servico = Column(String(256), nullable=True)
    valor = Column(Integer, nullable=True)
    tempo = Column(String(256), nullable=True)
    descricao = Column(String(256), nullable=True)
    servico: relationship = relationship(
        "SchedulerModel",
        cascade="all,delete-orphan",
        back_populates="criador_servico",
        uselist=True,
        lazy="joined"
    )