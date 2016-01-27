FROM ilyapirogov/meteor:1.3-modules-beta.5
MAINTAINER Ilya Pirogov <ilja.pirogov@gmail.com>

WORKDIR /var/www/bundle
ADD . /var/app

RUN cd /var/app \
    && meteor build --directory /var/www \
    && cd /var/www/bundle/programs/server \
    && npm install

ENV ROOT_URL 'http://localhost/'
ENV DDP_DEFAULT_CONNECTION_URL 'http://localhost/'
ENV METEOR_SETTINGS '{"TWITCH_CLIENT_SECRET": "", "public": {"TWITCH_CLIENT_ID": ""}}'
ENV MONGO_DB horizon

