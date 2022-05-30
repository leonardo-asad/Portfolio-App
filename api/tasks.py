from api.email import send_alert_email
from celery import shared_task
from .helpers import lookup
from celery.signals import task_postrun

@shared_task(name="add")
def add(x, y):
    return x + y

@shared_task(name="fetch_price")
def fetch_price(symbol=''):
    return lookup(symbol)['price']

@shared_task(name="check_price")
def check_price(user_pk=None, portfolio_pk=None, username='', user_email='', symbol='', type='', threshold=None):
    current_price = fetch_price(symbol)
    threshold = float(threshold)

    if type == 'Upper':
        if current_price >= threshold:
            return send_alert_email(username, user_email, symbol, current_price, threshold)
    if type == 'Lower':
        if current_price <= threshold:
            return send_alert_email(username, user_email, symbol, current_price, threshold)
    return None

@task_postrun.connect
def on_task_postrun(**kwargs):
    kwargs =  kwargs['kwargs']
    print(kwargs)
