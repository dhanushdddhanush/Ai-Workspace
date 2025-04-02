# static api
# from fastapi import FastAPI
# from pydantic import BaseModel

# app = FastAPI()
# class User(BaseModel):
#     name: str
#     age: int
# @app.post("/users/")
# def create_user(user: User):
#     return {"message": f"User {user.name} created!", "data": user}
# @app.get("/")
# def home():
#     return {"message": "I am dhanush"}

from fastapi import FastAPI
from pydantic import BaseModel
from databases import Database
from fastapi.middleware.cors import CORSMiddleware

DATABASE_URL = "postgresql://postgres:postgres@localhost:5432/aidb"

database = Database(DATABASE_URL)


app = FastAPI()


class User(BaseModel):
    name: str
    email: str
    role: str
    company: str

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
@app.on_event("startup")
async def startup():
    await database.connect()

@app.on_event("shutdown")
async def shutdown():
    await database.disconnect()


@app.post("/users/")
async def create_user(user: User):
    query = "INSERT INTO users (name, email,role,company) VALUES (:name, :email,:role,:company) RETURNING *"
    new_user = await database.fetch_one(query, values={"name": user.name, "email": user.email,"role":user.role,"company":user.company})
    return {"message": "User created", "user": new_user}

@app.get("/")
async def get_users():
    return {"message": "API is working!"}



