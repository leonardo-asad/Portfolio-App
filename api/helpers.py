import os
import requests

def lookup(symbol):
    """Look up quote for symbol."""

    # Contact API
    try:
        api_key = os.environ.get("API_KEY")
        url = f"https://finnhub.io/api/v1/quote?symbol={symbol}&token={api_key}"
        response = requests.get(url)
        response.raise_for_status()
    except requests.RequestException:
        return None

    # Parse response
    try:
        quote = response.json()
        return {
            'price': quote['c'],
            'change': quote['d'],
            'change_percent': quote['dp']
        }

    except (KeyError, TypeError, ValueError):
        return None

def get_profile(symbol):
    """
    Lookup the profile of the Company
    """
    # Contact API
    try:
        api_key = os.environ.get("API_KEY")
        url = f"https://finnhub.io/api/v1/stock/profile2?symbol={symbol}&token={api_key}"
        response = requests.get(url)
        response.raise_for_status()
    except requests.RequestException:
        return None

    # Parse response
    try:
        profile = response.json()
        return profile

    except (KeyError, TypeError, ValueError):
        return None


if __name__ == "__main__":
    print(get_profile("AAPL"))
