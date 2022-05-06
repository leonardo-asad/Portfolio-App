import os
import requests

def lookup(symbol):
    """Look up quote for symbol."""

    # Contact API
    try:
        api_key = os.environ.get("API_KEY")
        #breakpoint()
        url = f"https://finnhub.io/api/v1/quote?symbol={symbol}&token={api_key}"
        response = requests.get(url)
        #breakpoint()
        response.raise_for_status()
    except requests.RequestException:
        #breakpoint()
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

if __name__ == "__main__":
    print(lookup("AAPL"))
