from core.configs import settings
from sqlalchemy import Column, String, Boolean, Integer


class HorarioModel(settings.DB_BASE_MODEL):
    __tablename__ = 'horarios'

    id = Column(Integer, autoincrement=True, primary_key=True)
    hora = Column(String(256), nullable=True)
    disponivel = Column(Boolean, nullable=True, default=True)