FROM node

WORKDIR /nodebuild
ADD frontend /nodebuild

# Set environment variables from .env during node build
# so that the app uses the production location for static files
ADD .env /nodebuild
RUN export $(grep -v '^#' .env | xargs) && npm install && npm install --save react-apexcharts apexcharts && npm run build

#FROM tiangolo/uwsgi-nginx
FROM mcr.microsoft.com/oryx/python:3.7-20190712.5
LABEL maintainer="appsvc-images@microsoft.com"

# Web Site Home
ENV HOME_SITE "/home/site/wwwroot"

WORKDIR ${HOME_SITE}

# Using pip:
COPY requirements.txt ${HOME_SITE}
RUN python3 -m pip install -r requirements.txt

ADD . ${HOME_SITE}
RUN chmod a+w ${HOME_SITE} && chmod a+wx ${HOME_SITE}/db.sqlite3

COPY --from=0 /nodebuild/build ${HOME_SITE}/frontend/build

# Set environment variables from .env during collect static
# so that the app uses the production location for static files
RUN export $(grep -v '^#' .env | xargs) && python3 manage.py collectstatic --noinput

RUN rm .env

EXPOSE 8000

# setup default site
RUN mkdir /opt/defaultsite
COPY . /opt/defaultsite

# Indicate where uwsgi.ini lives
#ENV UWSGI_INI uwsgi.ini
