from fastapi import FastAPI
import os
from dotenv import load_dotenv
import requests
import json

load_dotenv()
api_key = os.getenv("YOUTUBE_API_KEY")

app = FastAPI()

def read_item(video_id: str):
    url = f"https://content-youtube.googleapis.com/youtube/v3/videos?id={video_id}&part=id,contentDetails,snippet&key={api_key}"
    print(url)
    try:
        response = requests.get(url)

        if response.status_code == 200:
            posts = response.json()
            print(posts)
            content_type = int(posts["items"][0]["snippet"]["categoryId"])
            return content_type
        else:
            print('Error:', response.status_code)
            return 0
    except requests.exceptions.RequestException as e:
        print('Error:', e)
        return 0
    
print(api_key)
print(read_item("B8VR5mQcgjI"))