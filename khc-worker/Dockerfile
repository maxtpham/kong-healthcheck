FROM node:10-alpine
RUN apk update && \
    apk add --no-cache make python && \
    apk add --virtual  build-dependencies build-base gcc && \
    python -m ensurepip && \
    rm -r /usr/lib/python*/ensurepip && \
    pip install --upgrade pip setuptools && \
    mkdir /app && mkdir /app/config
WORKDIR /app
COPY khc-worker/package.json .
# node_modules & cleanup
RUN npm install && \
    apk del build-dependencies && \
    rm -r /root/.cache && \
    rm -rf /var/cache/apk/*
COPY khc-worker/config/development-docker.json ./config/development.json
VOLUME [ "/app" ]
ENV PORT=80
EXPOSE 80
# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH
ENV NODE_ENV=development
ENV CHOKIDAR_USEPOLLING=true
# start app
CMD [ "npm", "start" ]