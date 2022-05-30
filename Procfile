web: gunicorn backend.wsgi
worker: celery -A backend worker -l info --pool=solo
beat: celery -A backend beat -l info --scheduler django_celery_beat.schedulers:DatabaseScheduler
