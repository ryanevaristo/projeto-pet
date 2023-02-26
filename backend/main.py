
from routers.Scheduler import router
from routers.Usuario import router as router_usuario
from routers.Servico import router as router_servico
from routers.Dono import router as router_dono
from routers.Pet import router as router_pet
from fastapi import FastAPI

app = FastAPI()

app.include_router(router=router_usuario,prefix='/usuarios', tags=["Login"])
app.include_router(router=router,prefix='/schedulers', tags=["Schedulers"])
app.include_router(router=router_servico, prefix='/servicos', tags=["Servicos"])
app.include_router(router=router_dono, prefix='/donos', tags=["Donos"])
app.include_router(router=router_pet, prefix='/pets', tags=["Pets"])

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0" ,port=8000, reload=True)