from pymongo import MongoClient
from pymongo import ReturnDocument
from dotenv import load_dotenv
import os

class DatabaseMD:

    def __init__(self):
        load_dotenv()
        mongo_key = os.getenv("MONGODB_KEY")
        self.uri = mongo_key
        # Create a new client and connect to the server
        self.client = MongoClient(self.uri)
        self.db = self.client.HackViolet
        self.col = self.db.YTExtension

    # Update watchtime based on category
    def send(self, genre, time):
        if genre == 1:
            self.col.find_one_and_update({'_id' : "100"}, { "$inc" : {"info" : time}})
        if genre == 2:
            self.col.find_one_and_update({'_id' : "100"}, { '$inc' : {"entertain" : time}})

    # Return watchtime info
    def get(self):
        return self.col.find_one()