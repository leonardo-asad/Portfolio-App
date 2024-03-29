FROM node:17

WORKDIR /nodebuild
ADD frontend /nodebuild

#RUN npm install && npm run build
RUN npm install --save typescript @types/node @types/react @types/react-dom @types/jest && npm run build

FROM python:3

EXPOSE 8000

WORKDIR /app

# Using pip:
COPY requirements.txt /app
RUN python3 -m pip install -r requirements.txt

ADD . /app

COPY --from=0 /nodebuild/build /app/frontend/build

# Set environment variables from .env during collect static
# so that the app uses the production location for static files
RUN export $(grep -v '^#' .env | xargs) && python3 manage.py collectstatic --noinput

RUN rm .env
