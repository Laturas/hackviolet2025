#! /bin/bash
pip install -r requirements.txt
python3 -m pipenv install -r requirements.txt
cd src
python3 -m pipenv run uvicorn main:app --reload