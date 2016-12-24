FROM daocloud.io/library/node:7.0.0
WORKDIR /usr/local/src/mobile-pay-server
RUN apt-get update && apt-get install cnpm
ENTRYPOINT ["/bin/bash","-c","cnpm install && node --harmony bin/run"]
EXPOSE 3000