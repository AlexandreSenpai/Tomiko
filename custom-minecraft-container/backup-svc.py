import os
import shutil
from typing import List
from google.cloud import pubsub_v1
from google.cloud import firestore
from google.cloud.firestore import DocumentSnapshot

# Create a client
db = firestore.Client()

# Set the subscription and project IDs
subscription_name = "projects/catherine-wake-up/subscriptions/world-backup"

# Create a subscriber client
subscriber = pubsub_v1.SubscriberClient()

# Set the callback function that will be called for each message
def callback(message):
    print('[INFO] Received trigger for saving world.')
    active_world: List[DocumentSnapshot] = db.collection('tomiko').document('worlds').collection('available').where('active', '==', True).get()
    world_id = active_world[0].id
    print(f'[INFO] Active map {world_id}')
    print(f'[INFO] Creating zip file.')
    _file = shutil.make_archive(world_id, 'zip', '/data/world')
    print(f'[INFO] file: {_file}')
    print('[INFO] Uploading file to gs://mapas-do-minecraft/worlds')
    os.system(f"gsutil mv -r /data/{world_id}.zip gs://mapas-do-minecraft/worlds/{world_id}.zip")
    message.ack()

# Start listening for messages
future = subscriber.subscribe(subscription_name, callback)
print("Listening for messages on {}..\n".format(subscription_name))

# Wait for messages to arrive
try:
    future.result()
except Exception as e:
    print(e)
