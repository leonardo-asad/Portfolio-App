FROM node

WORKDIR /nodebuild
ADD frontend /nodebuild

# Set environment variables from .env during node build
# so that the app uses the production location for static files
ADD .env /nodebuild
RUN export $(grep -v '^#' .env | xargs) && npm install && npm install --save react-apexcharts apexcharts && npm run build

FROM python:3

EXPOSE 8000

WORKDIR /usr/src/app

# Using pip:
COPY requirements.txt /usr/src/app
RUN python3 -m pip install -r requirements.txt

ADD . /usr/src/app

COPY --from=0 /nodebuild/build /usr/src/app/frontend/build

# Set environment variables from .env during collect static
# so that the app uses the production location for static files
RUN export $(grep -v '^#' .env | xargs) && python3 manage.py collectstatic --noinput

RUN rm .env
