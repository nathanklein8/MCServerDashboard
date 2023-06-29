from flask import Flask

import os
import json

app = Flask(__name__)

path = "/home/nathan/Desktop/MCServers"


def find_servers(folder):
    servers = os.listdir(folder)
    return (len(servers), servers)


@app.route("/servers")
def get_servers():
    servers = []
    num, serverNames = find_servers(path)
    for serverName in serverNames:
        infoFile = path + "/" + serverName + "/info.json"
        with open(infoFile, "r") as file:
            server_json = json.load(file)
            server_json.setdefault("name", "default-name")
            server_json["name"] = serverName
            servers.append(server_json)
    return {"numServers": num, "servers": servers}


if __name__ == "__main__":
    app.run(debug=True)
