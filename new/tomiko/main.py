# # from mcrcon import MCRcon

# # # Set your server’s IP, port, and RCON password
# # host = "localhost"  # Replace with your server IP
# # port = 25575
# # password = "dcae911a8541c2c95125a1a2"

# # # Commands to execute on the server
# # commands = [
# #     "save-off",       # Disables autosaving to prevent conflicts
# #     "save-all",       # Saves all the chunks to disk
# #     "save-on"         # Re-enables autosaving
# # ]

# # # Connect to the server using RCON and execute the commands
# # with MCRcon(host, password, port) as mcr:
# #     for command in commands:
# #         response = mcr.command(command)
# #         print(f"Executed: {command} | Response: {response}")

# import threading
# import http.server
# import socketserver
# import docker
# import os
# import tarfile

# # Initialize Docker client
# client = docker.from_env()

# # Configuration variables
# CONTAINER_NAME = "minecraft_server"  # Name of your Minecraft container
# EXPORT_PATH = "/path/to/export/folder"  # Path to save the exported world folder

# class RequestHandler(http.server.SimpleHTTPRequestHandler):
#     def do_GET(self):
#         if self.path == "/export":
#             self.export_world()
#         else:
#             self.send_response(404)
#             self.end_headers()
#             self.wfile.write(b"Invalid command")

#     def export_world(self):
#         try:
#             container = client.containers.get(CONTAINER_NAME)
            
#             # Copy the world folder from the container
#             stream, _ = container.get_archive('/data/world')  # Default path in itzg/minecraft-server

#             # Save the tar archive to the EXPORT_PATH
#             with open(f"{EXPORT_PATH}/world.tar.gz", "wb") as f:
#                 for chunk in stream:
#                     f.write(chunk)

#             # Send HTTP response
#             self.send_response(200)
#             self.end_headers()
#             self.wfile.write(b"World export successful!")
#         except Exception as e:
#             # Handle any errors
#             self.send_response(500)
#             self.end_headers()
#             self.wfile.write(f"Error: {str(e)}".encode("utf-8"))

# def start_http_server():
#     PORT = 8000
#     handler = RequestHandler
#     httpd = socketserver.TCPServer(("", PORT), handler)
#     print(f"Serving HTTP on port {PORT}...")
#     httpd.serve_forever()

# # Run the HTTP server in a separate thread
# thread = threading.Thread(target=start_http_server)
# thread.start()