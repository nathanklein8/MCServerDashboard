from flask import Flask, request
import os
import json
import subprocess

app = Flask(__name__)

path = "/home/nathan/Desktop/MCServers"

# shell code to stop mc server
# screen -S <server_name> -p 0 -X stuff "stop^M"


def find_servers(folder):
    serverNames = os.listdir(folder)
    return (len(serverNames), serverNames)


@app.route("/servers")
def get_servers():
    servers = []
    numServers, serverNames = find_servers(path)
    for i in range(len(serverNames)):
        serverName = serverNames[i]
        infoFile = path + "/" + serverName + "/info.json"
        with open(infoFile, "r") as file:
            server_json = json.load(file)
            if i != 0:
                server_json.setdefault("name", "minecraft-server " + "(" + str(i) + ")")
            else:
                server_json.setdefault("name", "minecraft-server")
            server_json["name"] = serverName
            servers.append(server_json)
    return {"numServers": numServers, "servers": servers}


@app.route("/start-server")
def start_server():
    server_name = request.args.get("name")
    path_to_start_script = path + "/" + server_name + "/start.sh"
    subprocess.call(["sh", path_to_start_script])
    return {"message": "starting " + server_name + "..."}


@app.route("/stop-server")
def stop_server():
    server_name = request.args.get("name")
    path_to_stop_script = path + "/" + server_name + "/stop.sh"
    subprocess.call(["sh", path_to_stop_script])
    return {"message": "stopping " + server_name + "..."}


if __name__ == "__main__":
    app.run(debug=True)
