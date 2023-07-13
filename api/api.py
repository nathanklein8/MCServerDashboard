from flask import Flask, request, jsonify
import os
import json
import subprocess
import socket

app = Flask(__name__)

path = "/home/nathan/Desktop/MCServers"


# shell code to stop mc server
# screen -S <server_name> -p 0 -X stuff "stop^M"


def ip():
    return socket.gethostbyname(socket.gethostname())


# returns true if server is online @ given port, false if offline
def is_port_in_use(port):
    s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    if s.connect_ex((str(ip()), port)) == 0:
        # connection worked, port must not have been in use
        return True
    else:
        # connection failed, port must have been in use, or bad hostname
        return False


# converts server.properties into json object, returns json object
def read_properties(server):
    props = dict()
    with open(path + "/" + server + "/server.properties") as file:
        for line in file:
            text = line.strip().split("=")
            if len(text) == 2:
                props.update({text[0]: text[1]})
        file.close()
    return jsonify(props)


def find_servers(folder):
    servers = []
    serverNames = os.listdir(folder)  # list of server names
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
            file.close()
    return {"numServers": len(servers), "servers": servers}


@app.route("/servers")
def get_servers():
    return find_servers(path)


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


@app.route("/online")
def check_online():
    server_name = request.args.get("name")
    port = 0
    # find the port of the server w/ given name
    with open(path + "/" + server_name + "/server.properties") as file:
        for line in file:
            text = line.strip().split("=")
            if text[0] == "server-port":
                port = int(text[1])
    file.close()
    return {"online": is_port_in_use(port), "port": port}


@app.route("/properties")
def server_properties():
    server_name = request.args.get("name")
    return read_properties(server_name)


if __name__ == "__main__":
    app.run(debug=True)
