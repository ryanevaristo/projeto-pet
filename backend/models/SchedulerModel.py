from core.configs import settings
from sqlalchemy import Boolean, Column, ForeignKey,select, func, Integer, Date, String
from sqlalchemy.orm import relationship



class SchedulerModel(settings.DB_BASE_MODEL):
    __tablename__ = 'schedulers'

    id: int = Column(Integer, primary_key= True, autoincrement=True)
    servico_id: int = Column(Integer, ForeignKey('servicos.id'))
    usuario_id: int = Column(Integer ,ForeignKey('usuarios.id'))
    pet_id: int = Column(Integer, ForeignKey('pets.id'))
    horario_id: int = Column(Integer, ForeignKey('horarios.id'))
    num_pedido: int = Column(Integer, nullable=True)
    ativo: bool = Column(Boolean, default=False)
    created_by = Column(Date, nullable=True)
    cancel_date = Column(Date, nullable=True)
    criador: relationship = relationship("UsuarioModel", back_populates='agenda', lazy='joined')
    pet: relationship = relationship("PetModel", back_populates='pets', lazy='joined')
    # servico: relationship = relationship("ServicoModel", back_populates='horarios', lazy='joined')
    # horario: relationship = relationship("HorarioModel", back_populates='horarios', lazy='joined')


    
