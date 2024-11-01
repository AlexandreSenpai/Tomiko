#!/bin/bash

echo "Running Backup Service"
chmod +x /data/server.sh
/data/server.sh

# shellcheck source=start-utils
. "${SCRIPTS:-/}start-utils"

# The Dockerfile ENVs take precedence here, but defaulting for testing consistency
: "${UID:=1000}"
: "${GID:=1000}"

umask 0002
chmod g+w /data

if ! isTrue "${SKIP_SUDO:-false}" && [ "$(id -u)" = 0 ]; then
  runAsUser=minecraft
  runAsGroup=minecraft

  if [[ -v UID ]]; then
    if [[ $UID != 0 ]]; then
      if [[ $UID != $(id -u minecraft) ]]; then
        log "Changing uid of minecraft to $UID"
        usermod -u $UID minecraft
      fi
    else
      runAsUser=root
    fi
  fi

  if [[ -v GID ]]; then
    if [[ $GID != 0 ]]; then
      if [[ $GID != $(id -g minecraft) ]]; then
        log "Changing gid of minecraft to $GID"
        groupmod -o -g "$GID" minecraft
      fi
    else
      runAsGroup=root
    fi
  fi

  if [[ $(stat -c "%u" /data) != "$UID" ]]; then
    log "Changing ownership of /data to $UID ..."
    chown -R ${runAsUser}:${runAsGroup} /data
  fi

  if [[ ${SKIP_NSSWITCH_CONF^^} != TRUE ]]; then
    echo 'hosts: files dns' > /etc/nsswitch.conf
  fi

  distro=$(getDistro)
  if [[ $distro == alpine ]]; then
    exec su-exec ${runAsUser}:${runAsGroup} "${SCRIPTS:-/}start-configuration" "$@"
  else
    exec gosu ${runAsUser}:${runAsGroup} "${SCRIPTS:-/}start-configuration" "$@"
  fi
else
  exec "${SCRIPTS:-/}start-configuration" "$@"
fi