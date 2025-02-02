import database, requester
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

origins = ['*']

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/")
def add_item(request: dict):
    if type(request) != dict: print("Error"); return {"status": "ok"}
    db = database.DatabaseMD()
    print(request["video_id"][0])
    result = requester.read_item(request["video_id"][0])
    db.send(result[0], result[1])
    return {"status": "ok"}

@app.get("/")
def get_items():
    db = database.DatabaseMD()
    return db.get()