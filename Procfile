web: gunicorn backend.wsgi
worker: celery -A backend worker --beat --scheduler django_celery_beat.schedulers:DatabaseScheduler --loglevel=info
