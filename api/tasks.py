import random
from api.email import send_alert_email
from celery import shared_task
from .helpers import lookup
from celery.signals import after_task_publish, task_postrun

@shared_task(name="sum_two_numbers")
def add(x, y):
    return x + y

@shared_task(name="multiply_two_numbers")
def mul(x, y):
    total = x * (y * random.randint(3, 100))
    return total

@shared_task(name="sum_list_numbers")
def xsum(numbers):
    return sum(numbers)

@shared_task(name="send_alert")
def check_price(user_pk=None, username='', user_email='', symbol='', type='', threshold=None):
    current_price = lookup(symbol)
    if type == 'Upper':
        if current_price >= threshold:
            return send_alert_email(username, user_email, symbol, threshold)
    if type == 'Lower':
        if current_price <= threshold:
            return send_alert_email(username, user_email, symbol, threshold)
    return f"Current price: {current_price}. Threshold: {threshold}. Type: {type}"


@task_postrun.connect(sender='api.tasks.check_price')
def task_sent_handler(sender=None, task_id=None, task=None, retval=None, state= None, **kwargs):
    print(sender, task_id, task, retval, state, kwargs)
