from fastapi import APIRouter, Response
from config.db import conn
from model.user import users
from schemas.user_schema import User
from starlette.status import HTTP_204_NO_CONTENT
from cryptography.fernet import Fernet

usser = APIRouter()
keyCrypt = Fernet.generate_key()
f = Fernet(keyCrypt)

@usser.get("/users")
def get_users():
    return conn.execute(users.select()).fetchall()


@usser.post("/users")
def create_user(user: User):
    new_user = {"name": user.name}
    new_user["password"] = f.encrypt(user.password.encode("utf-8"))
    result = conn.execute(users.insert().values(new_user))
    return conn.execute(users.select().where(users.c.id == result.lastrowid)).first()


@usser.get("/users/{id}")
def get_specific_user(id: str):
    return conn.execute(users.select().where(users.c.id == id)).first()

@usser.delete("/users/{id}")
def delete_user(id: str):
    conn.execute(users.delete().where(users.c.id == id))
    return Response(status_code=HTTP_204_NO_CONTENT)

@usser.put("/users/{id}")
def update_user(id: str, user: User): 
    conn.execute(users.update().values( name = user.name, 
                password = f.encrypt(user.password.encode("utf-8"))
                ).where(users.c.id == id))
    return "Updated"