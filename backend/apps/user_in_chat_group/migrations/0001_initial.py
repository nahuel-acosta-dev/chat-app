# Generated by Django 4.1 on 2022-10-05 23:11

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('chat_group', '0002_initial'),
        ('user_profile', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='UserInChatGroup',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('admin', models.BooleanField(default=False)),
                ('chat_group', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='chat_group.chatgroup')),
                ('profile', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='user_profile.userprofile')),
            ],
        ),
    ]
