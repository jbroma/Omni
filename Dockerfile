FROM python:3.7-alpine

#recommended for running python in docker
ENV PYTHONUNBUFFERED 1

COPY ./requirements.txt /requirements.txt
RUN pip install -r /requirements.txt

RUN mkdir /app
WORKDIR /app
COPY ./app /app

#adds a new user to execute the app
RUN adduser -D user

#switches to specified user
USER user



