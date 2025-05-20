#!/bin/bash

FLAG="BayrakBende{p0rtlar1_k4patal1m_g3ncl1k}"

echo "root:lirililarila" | chpasswd

service redis-server start

redis-cli -h 127.0.0.1 SET flag "$FLAG"

(
  sleep 5
  rm -f "$0"
  echo "Entrypoint betiği kendini imha etti."
) &

/usr/sbin/sshd -D 