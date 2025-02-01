from fastapi import FastAPI
import os
from dotenv import load_dotenv
import requests
import json

load_dotenv()
api_key = os.getenv("YOUTUBE_API_KEY")

app = FastAPI()

@app.get("/{video_id}")
def read_item(video_id: str):

    url = f"https://content-youtube.googleapis.com/youtube/v3/videos?id={video_id}&part=id,contentDetails,snippet&key={api_key}"
    print(url)
    try:
        response = requests.get(url)

        if response.status_code == 200:
            posts = response.json()["items"]
            return posts
        else:
            print('Error:', response.status_code)
            return None
    except requests.exceptions.RequestException as e:
        print('Error:', e)
        return None
    
print(api_key)
print(read_item("B8VR5mQcgjI"))