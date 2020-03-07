FROM node:10-alpine as core
RUN apk update && \
    apk add --no-cache make python && \
    apk add --virtual  build-dependencies build-base gcc && \
    python -m ensurepip && \
    rm -r /usr/lib/python*/ensurepip && \
    pip install --upgrade pip setuptools && \
    mkdir /app && mkdir /app/config
WORKDIR /app
COPY khc-worker/package-core.json package.json
ENV NODE_ENV=development
# node_modules for core & cleanup
RUN npm install && \
    apk del build-dependencies && \
    rm -r /root/.cache && \
    rm -rf /var/cache/apk/*
ENV PATH /app/node_modules/.bin:$PATH

FROM core as package
COPY khc-worker/package.json package.json
RUN npm install
ENV NODE_ENV=production

FROM package as final
COPY ./khc-worker .
RUN npm run build
EXPOSE 80
CMD [ "npm", "run", "start:prd" ]