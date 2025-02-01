from pymongo import MongoClient

class DatabaseMD:

    def __init__(self):
        self.uri = "mongodb+srv://trajarshi:vthacks@vthacks.td4ds.mongodb.net/?retryWrites=true&w=majority&appName=VTHacks"
        # Create a new client and connect to the server
        self.client = MongoClient(self.uri)
        self.db = self.client.vthacks
        self.col = self.db.vthacks

    # Send a dictionary "doc" to mongodb
    def send(self,doc):
        self.col.insert_one(doc)

    # Retrieve all cards and send an array of dict
    def get(self):
        posts = []
        for i in self.col.find():
            i.pop("_id", None)
            posts.append(i)
        return posts