import random
from api.email import send_alert_email
from celery import shared_task

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
def check_price(user_email, symbol):
    return send_alert_email(user_email, symbol)
