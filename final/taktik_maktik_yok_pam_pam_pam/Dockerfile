FROM ubuntu:22.04

ENV DEBIAN_FRONTEND=noninteractive

RUN apt-get update && \
    apt-get install -y redis-server openssh-server && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

RUN mkdir /var/run/sshd
RUN sed -i 's/#PermitRootLogin prohibit-password/PermitRootLogin yes/' /etc/ssh/sshd_config
RUN sed -i 's/#PasswordAuthentication yes/PasswordAuthentication yes/' /etc/ssh/sshd_config

RUN sed -i 's/bind 0.0.0.0/bind 127.0.0.1/' /etc/redis/redis.conf

COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

EXPOSE 22

ENTRYPOINT ["/entrypoint.sh"] 