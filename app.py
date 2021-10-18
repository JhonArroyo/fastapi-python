from fastapi import FastAPI, status
from fastapi.templating import Jinja2Templates
from fastapi.staticfiles import StaticFiles
#from fastapi.responses import HTMLResponse
from starlette.requests import Request
from starlette.status import HTTP_200_OK
from route.usser import usser
from typing import Optional

app = FastAPI(
    title="FastAPI & MySQL",
    description="This is my first RestAPI using Python",
    version="0.1.0",
    openapi_tags=[{
        "name":"User_Internal",
        "description": "Only for Debugger"
    }]
)

templates = Jinja2Templates(directory="html")
app.mount("/css", StaticFiles(directory="css"), name="css")

@app.get("/", status_code=status.HTTP_200_OK, tags=["Index"])
async def html_index(request: Request):
    return templates.TemplateResponse("index.html", context={"request": request})

app.include_router(usser)
