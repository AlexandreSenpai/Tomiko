FROM python:3.12.7-alpine3.20

WORKDIR /app

COPY . .

RUN pip install -r requirements.txt

CMD ["python3", "/app/server.py"]