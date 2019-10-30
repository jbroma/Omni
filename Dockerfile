FROM python:3.7-alpine

#recommended for running python in docker
ENV PYTHONUNBUFFERED 1

#force removed cached files
RUN rm -rf /var/cache/apk/* && \
    rm -rf /tmp/*

RUN apk update

COPY ./requirements.txt /requirements.txt
RUN apk add --update --no-cache postgresql-client
#temporary dependecies
RUN apk add --update --no-cache --virtual .tmp-build-deps \
    gcc libc-dev linux-headers postgresql-dev

RUN pip install -r /requirements.txt
RUN apk del .tmp-build-deps

RUN mkdir /app
WORKDIR /app
COPY ./app /app

#adds a new user to execute the app
RUN adduser -D user

#switches to specified user
USER user