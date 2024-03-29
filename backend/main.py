
from routers.Scheduler import router
from routers.Usuario import router as router_usuario
from routers.Servico import router as router_servico
from routers.Dono import router as router_dono
from routers.Pet import router as router_pet
from routers.Horario import router as router_horario
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.include_router(router=router_usuario,prefix='/usuarios', tags=["Login"])
app.include_router(router=router,prefix='/schedulers', tags=["Schedulers"])
app.include_router(router=router_servico, prefix='/servicos', tags=["Servicos"])
app.include_router(router=router_dono, prefix='/donos', tags=["Donos"])
app.include_router(router=router_pet, prefix='/pets', tags=["Pets"])
app.include_router(router=router_horario, prefix='/horarios', tags=["Horarios"])


origins = [
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)



if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0" ,port=8000, reload=True)