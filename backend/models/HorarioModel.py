from core.configs import settings
from sqlalchemy import Column, String, Boolean, Integer
from sqlalchemy.orm import relationship


class HorarioModel(settings.DB_BASE_MODEL):
    __tablename__ = 'horarios'

    id = Column(Integer, autoincrement=True, primary_key=True)
    hora = Column(String(256), nullable=True)
    disponivel = Column(Boolean, nullable=True, default=True)
    horarios: relationship = relationship(
        "SchedulerModel",
        cascade="all,delete-orphan",
        back_populates="criador_horario",
        uselist=True,
        lazy="joined"
    )