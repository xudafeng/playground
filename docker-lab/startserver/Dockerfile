FROM mhart/alpine-node:4

ENV SERVER_PORT 5678

MAINTAINER xdf<xudafeng@126.com>

RUN npm i startserver -g

EXPOSE $SERVER_PORT

COPY . /src

WORKDIR /src

ENTRYPOINT ["/src/entrypoint.sh"]
