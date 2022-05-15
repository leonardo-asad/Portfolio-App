FROM node

WORKDIR /nodebuild
ADD frontend /nodebuild

# Set environment variables from .env during node build
# so that the app uses the production location for static files
ADD .env /nodebuild
RUN export $(grep -v '^#' .env | xargs) && npm install && npm install --save react-apexcharts apexcharts && npm run build

FROM tiangolo/uwsgi-nginx
#FROM tiangolo/meinheld-gunicorn:python3.9

EXPOSE 8000

# Indicate where uwsgi.ini lives
ENV UWSGI_INI uwsgi.ini

WORKDIR /app

# Using pip:
COPY requirements.txt /app
RUN python3 -m pip install -r requirements.txt

ADD . /app
RUN chmod a+w /app && chmod a+wx /app/db.sqlite3

COPY --from=0 /nodebuild/build /app/frontend/build

# Set environment variables from .env during collect static
# so that the app uses the production location for static files
RUN export $(grep -v '^#' .env | xargs) && python3 manage.py collectstatic --noinput

RUN rm .env
