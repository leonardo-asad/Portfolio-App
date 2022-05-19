from django.template.loader import render_to_string
from django.core.mail import EmailMessage
from django.conf import settings


def send_alert_email(symbol):

    context = {
        'name': "Leo",
        'symbol': symbol,
    }

    email_subject = 'New alert from your Portfolio'
    email_body = render_to_string('email_message.txt', context)

    email = EmailMessage(
        email_subject, email_body,
        settings.DEFAULT_FROM_EMAIL, ['lyz4rd15@gmail.com', ],
    )
    return email.send(fail_silently=False)
