# Portfolio-App

This web app keeps track of your investments in Stocks and ETFs. It presents to the user a detailed description of the composition of their portfolio/s and how much weight each asset has in relation to the total worth of their portfolio.

# Stack
![image](https://user-images.githubusercontent.com/64209661/196314253-928c7d15-4a3b-4302-b2bd-be7d294f009d.png)


# Explore the app

Visit the following link, create a user and start exploring the app!
https://portfolioapp111.herokuapp.com/

# Run locally
- Prerequisites:
    - [Docker](https://docs.docker.com/get-docker/)
    - [Docker Compose](https://docs.docker.com/compose/install/)
  
1) Clone the repo and open the folder
```
git clone https://github.com/leonardo-asad/Portfolio-App.git
cd Portfolio-App
code .
```
2) Create a .env file to store the credentials used by the different services.
```
#Django Secret Key
SECRET_KEY="Secret Key Django"
#Finhub Api Key
API_KEY="Finnhub Api Key"
#gmail_send/settings.py
EMAIL_HOST_PASSWORD="Email Host Password"
#Postgres DB environment variable
POSTGRES_PASSWORD="password"
```
3) The app uses a third party API (Finnhub) to lookup for the prices of the stocks. Get a free API key and store it under the name API_KEY in the .env file.
4) Store the Django secret key under the name SECRET_KEY in the .env file
5) The app uses the Email Backend service to send alerts to the users. Change the host email in backend/settings.py and store the password under the variable EMAIL_HOST_PASSWORD in the .env file.
6) POSTGRES_PASSWORD should be specified to start the PostgresDB Service with Docker.
7) Check backend/settings.py to connect to the postgresDB locally.
```
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': 'postgres',
        'USER': 'postgres',
        'PASSWORD': 'postgres',
        'HOST': 'pgdb',
        'PORT': 5432,
    }
}
```
8) Check backend/settings.py to connect Celery with Redis
```
CELERY_BROKER_URL = os.environ.get("CELERY_BROKER", "redis://redis:6379/0")
CELERY_RESULT_BACKEND = os.environ.get("CELERY_BROKER", "redis://redis:6379/0")
```
9) Install Docker and Docker Compose
10) In the root folder run "docker compose -f "docker-compose.yml" up -d --build".
11) Run migrations
12) The website will run on localhost:8000
