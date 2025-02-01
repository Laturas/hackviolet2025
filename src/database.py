from pymongo import MongoClient

class DatabaseMD:

    def __init__(self):
        self.uri = "mongodb+srv://trajarshi:vthacks@vthacks.td4ds.mongodb.net/?retryWrites=true&w=majority&appName=VTHacks"
        # Create a new client and connect to the server
        self.client = MongoClient(self.uri)
        self.db = self.client.HackViolet
        self.col = self.db.YTExtension

    # Update watchtime based on category
    def send(self, genre, time):
        if genre == 1:
            time += self.col.find_one()["info"]
            self.col.find_one_and_update({"info" : str(time)})
        if genre == 2:
            time += self.col.find_one()["entertain"]
            self.col.find_one_and_update({"entertain" : str(time)})

    # Return watchtime info
    def get(self):
        return self.col.find_one()