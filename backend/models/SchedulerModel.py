from core.configs import settings
from sqlalchemy import Boolean, Column, ForeignKey, Integer, Date, String
from sqlalchemy.orm import relationship



class SchedulerModel(settings.DB_BASE_MODEL):
    __tablename__ = 'schedulers'

    id: int = Column(Integer, primary_key= True, autoincrement=True)
    servico_name: str = Column(String(256), nullable=True)
    servico_id: int = Column(Integer, ForeignKey('servicos.id'))
    usuario_id: int = Column(Integer ,ForeignKey('usuarios.id'))
    pet_id: int = Column(Integer, ForeignKey('pets.id'))
    horario_id: int = Column(Integer, ForeignKey('horarios.id'))
    valor_final: float = Column(Integer, nullable=True)
    ativo: bool = Column(Boolean, default=True)
    created_by = Column(Date, nullable=True)
    cancel_date = Column(Date, nullable=True)
    criador: relationship = relationship("UsuarioModel", back_populates='agenda', lazy='joined')
    pet: relationship = relationship("PetModel", back_populates='pets', lazy='joined')
    criador_servico: relationship = relationship("ServicoModel", back_populates='servico', lazy='joined')
    criador_horario: relationship = relationship("HorarioModel", back_populates='horarios', lazy='joined')


    
