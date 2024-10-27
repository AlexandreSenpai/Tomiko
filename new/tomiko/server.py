import os
from flask import Flask

server = Flask(__name__)

@server.route("/ping", methods=["GET"])
def ping():
    return "pong"

@server.route("/files", methods=["GET"])
def files():
    return os.listdir("/data")

if __name__ == '__main__':
    server.run("0.0.0.0", port=8080)