set -o errexit

pip install --upgrade pip

pip install -r requirements.txt

python manage.py collectstatic --no-input

python manage.py makemigrations user

python manage.py makemigrations user_profile

python manage.py makemigrations chat

python manage.py makemigrations chat_group

python manage.py makemigrations message_in_chat_group

python manage.py makemigrations user_in_chat_group

python manage.py makemigrations

python manage.py migrate

