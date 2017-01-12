FROM daocloud.io/library/node:7.0
WORKDIR /usr/local/src/node_www
RUN npm config set registry https://registry.npm.taobao.org
RUN npm info underscore
RUN npm install pm2 -g
ENTRYPOINT ["npm", "run" ,"pm2_docker"]
EXPOSE 3000