FROM docker.io/itzg/minecraft-server

RUN apt-get update -y
RUN apt-get install apt-transport-https ca-certificates gnupg -y
RUN echo "deb [signed-by=/usr/share/keyrings/cloud.google.gpg] http://packages.cloud.google.com/apt cloud-sdk main" | tee -a /etc/apt/sources.list.d/google-cloud-sdk.list && curl https://packages.cloud.google.com/apt/doc/apt-key.gpg | apt-key --keyring /usr/share/keyrings/cloud.google.gpg  add - && apt-get update -y && apt-get install google-cloud-cli -y

RUN apt-get install python3-pip screen -y

COPY . .

RUN pip3 install -r /data/requirements.txt
RUN chmod +x /data/server.sh

ENTRYPOINT [ "/data/start.sh" ]