# Portfolio-App

This web app keeps track of your investments in Stocks and ETFs of the New York Stock Market. It presents to the user a detailed description of the composition of their portfolio/s and how much weight each asset has in relation to the total worth of their portfolio. In addition, the user can set alerts in order to get notified when the price reaches certain threshold.

# Demo
-

# Technology Stack of the Website
![webstack](https://user-images.githubusercontent.com/64209661/171296628-d3dbd967-0219-496e-a0f0-11b78525e81e.png)

# Explore the app
Visit the following link, create a user and start exploring the app!
https://portfolioapp111.herokuapp.com/

# Run locally
The following steps are required to run the app locally:
1) Create a .env file to store the credentials used by the different services.
2) The app uses a third party API (Finnhub) to lookup for the prices of the stocks. Get a free API key and store it under the name API_KEY in the .env file.
3) Store the Django secret key under the name SECRET_KEY in the .env file
4) The app uses the Email Backend service to send alerts to the users. Change the host email in backend/settings.py and store the password under the variable EMAIL_HOST_PASSWORD in the .env file.
5) Check backend/settings.py to connect to the postgresDB locally.
6) Check backend/settings.py to connect Celery with Redis
7) Install Docker and Docker Compose
8) On the root folder run "docker compose -f "docker-compose.yml" up -d --build".
9) The website will run on localhost:8000

# Future Implementations
The following features are going to be implemented in the future:
1) Use Typescript instead of Javascript
