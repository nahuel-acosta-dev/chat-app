set -o errexit

pip install --upgrade pip

pip install -r requirements.txt

python manage.py collectstatic --no-input

python manage.py migrate contenttypes

python manage.py makemigrations

python manage.py migrate

