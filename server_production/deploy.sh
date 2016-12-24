#!/bin/bash

if [ $1 = -dr ]; then
docker run --name mbs_redis -p 6379:6379 \
  -v /usr/local/src/mobile-pay-server/server_production/redis.conf:/usr/local/etc/redis/redis.conf -v /var/redis/data:/data \
  --restart=on-failure:5 -d daocloud.io/library/redis:3.2.5 redis-server /usr/local/etc/redis/redis.conf
else
echo 12321321
fi