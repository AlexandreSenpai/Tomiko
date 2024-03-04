import re
from flask import Flask, request
import os

from instance_builder import InstanceBuilder

app = Flask(__name__)

@app.route('/launch-minecraft', methods=['POST'])
def hello():
    data = request.get_json(force=True)

    world = None if data is None else data.get('world_uri')

    builder = InstanceBuilder()
    builder = (builder.add_args('provisioning-model', 'SPOT')
                      .add_args('zone', 'us-east1-b')
                      .add_args('container-image', 'us-east1-docker.pkg.dev/catherine-wake-up/tomiko/minecraft-server')
                      .add_args('service-account', '438302809703-compute@developer.gserviceaccount.com')
                      .add_args('scopes', 'storage-full,datastore,default'))
    builder = (builder.add_envs('WORLD', world)
                      .add_envs('VERSION', '1.17.1')
                      .add_envs('EULA', 'TRUE')
                      .add_envs('ENABLE_COMMAND_BLOCK', 'true')
                      .add_envs('ONLINE_MODE', 'TRUE')
                      .add_envs('MOTD', '"A §l§cTomiko§r launched minecraft server"')
                      .add_envs('ICON', 'https://storage.googleapis.com/mapas-do-minecraft/tomiko-resources/world-icon.png')
                      .add_envs('OVERRIDE_ICON', 'true')
                      .add_envs('ALLOW_NETHER', 'true')
                      .add_envs('ANNOUNCE_PLAYER_ACHIEVEMENTS', 'true'))

    process = os.popen(builder.command)
    
    ips = re.findall(r"([0-9]{1,2}\.[0-9]{2,3}\.[0-9]{1,3}\.[0-9]{1,3})", process.read().strip())

    return ips

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8080)