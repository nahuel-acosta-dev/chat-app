# Generated by Django 4.1 on 2022-10-02 00:01

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('chat', '0002_chatmodel_messages'),
    ]

    operations = [
        migrations.RenameField(
            model_name='chatmodel',
            old_name='profile2',
            new_name='receive',
        ),
        migrations.RenameField(
            model_name='chatmodel',
            old_name='profile1',
            new_name='send',
        ),
        migrations.RemoveField(
            model_name='chatmodel',
            name='messages',
        ),
        migrations.AddField(
            model_name='chatmodel',
            name='message',
            field=models.TextField(blank=True, max_length=500, null=True),
        ),
    ]
