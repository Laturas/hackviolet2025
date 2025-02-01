import database, requester
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

origins = [
    "http://localhost",
    "http://localhost:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/")
def add_item(request: dict):
    db = database.DatabaseMD()
    genre = requester.read_item(request["video_id"])
    if genre == 0:
        return {"status" : "ok"}
    if genre == 1:
        db.send(request)
    return {"status": "ok"}

@app.get("/")
def get_items():
    db = database.DatabaseMD()
    return db.get()