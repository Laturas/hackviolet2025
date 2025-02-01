import os
from dotenv import load_dotenv
import requests
import json
import re

load_dotenv()
api_key = os.getenv("YOUTUBE_API_KEY")

def read_item(video_id: str) -> {int, int}:
    url = f"https://content-youtube.googleapis.com/youtube/v3/videos?id={video_id}&part=id,contentDetails,snippet&key={api_key}"
    print(url)
    try:
        response = requests.get(url)

        if response.status_code == 200:
            posts = response.json()
            print(posts)
            content_type = int(posts["items"][0]["snippet"]["categoryId"])
            dur_string = posts["items"][0]["contentDetails"]["duration"]

            minute_split = re.search("[0-9]*M", dur_string)
            second_split = re.search("[0-9]*S", dur_string)

            total_time = int(str(minute_split[0])[0:-1]) * 60 + int(str(second_split[0])[0:-1])

            print(f"{total_time} seconds")
            return {content_type, total_time}
        else:
            print('Error:', response.status_code)
            return {0,0}
    except requests.exceptions.RequestException as e:
        print('Error:', e)
        return {0,0}
    
print(api_key)
print(read_item("B8VR5mQcgjI"))