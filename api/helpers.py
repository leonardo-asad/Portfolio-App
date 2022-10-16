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
    This API returns the company information, financial ratios, and other key metrics for the equity specified.
    Data is generally refreshed on the same day a company reports its latest earnings and financials.
    """
    # Contact API
    try:
        api_key = os.environ.get("API_KEY_ALPHAVANTAGE")
        url = f"https://www.alphavantage.co/query?function=OVERVIEW&symbol={symbol}&apikey={api_key}"
        response = requests.get(url)
        response.raise_for_status()
    except requests.RequestException:
        return None

    # Parse response
    try:
        profile = response.json()
        profile_formated = {}
        for key, value in profile.items():
            profile_formated[key.lower()] = value

        return profile_formated

    except (KeyError, TypeError, ValueError):
        return None

def search_stock(query):
    """
    We've got you covered! The Search Endpoint returns the best-matching symbols and market information based on keywords of your choice.
    The search results also contain match scores that provide you with the full flexibility to develop your own search and filtering logic.
    """
    # Contact API
    try:
        api_key = os.environ.get("API_KEY_ALPHAVANTAGE")
        url = f"https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords={query}&apikey={api_key}"
        response = requests.get(url)
        response.raise_for_status()
    except requests.RequestException:
        return None

    # Parse response
    try:
        result = response.json()
        bestMatches = result.get("bestMatches")
        print(bestMatches)
        if len(bestMatches) > 0:
            formatedBestMatches = [
                {
                'symbol': match['1. symbol'],
                'name': match['2. name'],
                'type': match['3. type'],
                'region': match['4. region'],
                'marketOpen': match['5. marketOpen'],
                'marketClose': match['6. marketClose'],
                'timezone': match['7. timezone'],
                'currency': match['8. currency'],
                'matchScore': match['9. matchScore'],
                } for match in bestMatches]

            return formatedBestMatches
        return []

    except (KeyError, TypeError, ValueError):
        return None


if __name__ == "__main__":
    print(get_profile("IBM"))
