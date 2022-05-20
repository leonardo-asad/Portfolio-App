from django.template.loader import render_to_string
from django.core.mail import EmailMessage
from django.conf import settings


def send_alert_email(username, user_email, symbol, threshold):

    context = {
        'name': username,
        'symbol': symbol,
        'threshold': threshold,
    }

    email_subject = 'New alert from your Portfolio'
    email_body = render_to_string('email_message.txt', context)

    email = EmailMessage(
        email_subject, email_body,
        settings.DEFAULT_FROM_EMAIL, [user_email, ],
    )
    return email.send(fail_silently=False)
