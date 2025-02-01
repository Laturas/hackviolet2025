import os
from dotenv import load_dotenv
import google.generativeai as genai
import requests
import json
import re

load_dotenv()
gemini_api_key = os.getenv("GEMINI_API_KEY")
yt_api_key = os.getenv("YOUTUBE_API_KEY")

def read_item(video_id: str) -> tuple[int, int]:
    url = f"https://content-youtube.googleapis.com/youtube/v3/videos?id={video_id}&part=id,contentDetails,snippet&key={yt_api_key}"
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
            return (content_type, total_time)
        else:
            print('Error:', response.status_code)
            return (0,0)
    except requests.exceptions.RequestException as e:
        print('Error:', e)
        return (0,0)

def dear_ai_is_this_brainrot(gemini_api_key: str, video_transcript: str) -> int:
    # Set your API key
    genai.configure(api_key = gemini_api_key)

    # Choose a model
    model = genai.GenerativeModel("gemini-pro")

    # Generate a response
    response = model.generate_content("You may only respond with \"entertainment\" or \"informative\". Is the following transcript entertainment or informative:\n" + video_transcript)
    if response == "informative": return 1
    if response == "entertainment": return 2
    return 0

print(read_item("B8VR5mQcgjI"))