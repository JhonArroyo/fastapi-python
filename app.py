from fastapi import FastAPI
from fastapi.templating import Jinja2Templates
from fastapi.staticfiles import StaticFiles
#from fastapi.responses import HTMLResponse
from starlette.requests import Request
from route.usser import usser
from typing import Optional

app = FastAPI()

templates = Jinja2Templates(directory="html")
app.mount("/css", StaticFiles(directory="css"), name="css")

@app.get("/")
async def html_index(request: Request):
    return templates.TemplateResponse("index.html", context={"request": request})

app.include_router(usser)

