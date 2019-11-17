FROM python:3.7-alpine

#recommended for running python in docker
ENV PYTHONUNBUFFERED 1

#force removed cached files
RUN rm -rf /var/cache/apk/* && \
    rm -rf /tmp/*

RUN apk update

COPY ./requirements.txt /requirements.txt
RUN apk add --update --no-cache postgresql-client jpeg-dev
#temporary dependecies
RUN apk add --update --no-cache --virtual .tmp-build-deps \
    gcc libc-dev linux-headers postgresql-dev musl-dev zlib \
    zlib-dev libffi-dev openssl-dev

RUN pip install -r /requirements.txt
RUN apk del .tmp-build-deps

RUN mkdir /app
WORKDIR /app
COPY ./app /app

RUN mkdir -p /vol/web/media
RUN mkdir -p /vol/web/static
#adds a new user to execute the app
RUN adduser -D user
RUN chown -R user:user /vol/
RUN chmod -R 755 /vol/web
#switches to specified user
USER user