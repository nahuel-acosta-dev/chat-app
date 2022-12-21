set -o errexit

pip install --upgrade pip

pip install -r requirements.txt

python manage.py collectstatic --no-input

python manage.py makemigrations user

python manage.py migrate

daphne -b 0.0.0.0 -p 8001 core.asgi:application

