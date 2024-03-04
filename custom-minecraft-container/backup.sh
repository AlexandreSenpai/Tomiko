
#!/bin/bash
# Diretório do servidor Minecraft no contêiner
MC_DIR="/data"
# Nome do arquivo de backup
BACKUP_NAME="backup_$(date +'%F_%H-%M-%S').tar.gz"

# Compacta o diretório do servidor Minecraft
tar -czvf $BACKUP_NAME $MC_DIR

# Envia o arquivo de backup para o Google Cloud Storage

gsutil cp -r $BACKUP_NAME gs://mapas-do-minecraft/worlds/$BACKUP_NAME

# Remove o arquivo de backup local para economizar espaço
rm $BACKUP_NAME
