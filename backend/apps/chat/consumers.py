import json
from channels.generic.websocket import WebsocketConsumer, AsyncWebsocketConsumer
from asgiref.sync import async_to_sync, sync_to_async
from channels.db import database_sync_to_async
from channels.layers import get_channel_layer
from apps.user_profile.models import UserProfile
from apps.user_profile.serializers import UserProfileSerializer
from .models import ChatModel
from apps.message_in_chat_group.models import MessageInChatGroup
from apps.chat_group.models import ChatGroup


class ChatConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.room_name = self.scope['url_route']['kwargs']['room_name']
        print(self.room_name)
        self.chat_name = self.room_name
        print(self.chat_name)

        await self.channel_layer.group_add(
            self.chat_name,
            self.channel_name
        )

        await self.accept()
        self.user = self.scope["user"]
        print(self.user.email)
        """await self.send(text_data=json.dumps(
            {"message": "Se ha conectado %s" % (self.user.email)}))"""

    @sync_to_async
    def get_all_users(self):
        profile = UserProfile.objects.filter(user=self.user).first()
        profile_serializer = UserProfileSerializer(profile)
        return profile_serializer.data

    async def disconnect(self, close_code):
        await self.channel_layer.group_discard(
            self.chat_name,
            self.channel_name
        )

    async def receive(self, text_data=None, bytes_data=None):
        text_data_json = json.loads(text_data)
        send_type = text_data_json['send_type']
        message = text_data_json['message']
        send_user = text_data_json['send_user']

        if send_type == 'chat':
            await self.new_chat(message, send_user)
        elif send_type == 'chat_group':
            await self.new_chat_group(message, send_user)

        await self.channel_layer.group_send(
            self.chat_name,
            {
                'type': 'send_message',  # es la llamada a la funcion de abajo
                'send_type': send_type,
                'message': message,
                'send_user': send_user
            }
        )

    async def send_message(self, event):
        send_type = event['send_type']
        message = event['message']
        profile = await self.get_all_users()

        await self.send(text_data=json.dumps({
            'send_type': send_type,
            'message': message,
            'profile': profile
        }))

    @database_sync_to_async
    def new_chat(self, message, send_user):
        users_str = self.chat_name[5:]
        divider = users_str.index('_')
        profile1 = UserProfile.objects.get(id=int(users_str[:divider]))
        profile2 = UserProfile.objects.get(id=int(users_str[divider + 1:]))
        if send_user == profile1.id:
            return ChatModel.objects.create(
                send=profile1,
                receive=profile2,
                message=message
            )
        elif send_user == profile2.id:
            return ChatModel.objects.create(
                send=profile2,
                receive=profile1,
                message=message
            )
        else:
            return print('id not encounter in profile')

    @database_sync_to_async
    def new_chat_group(self, message, send_user):
        chat_group = ChatGroup.objects.get(id=int(self.chat_name[11:]))
        profile = UserProfile.objects.get(id=int(send_user))
        try:
            MessageInChatGroup.objects.create(
                chat_group=chat_group, profile=profile, message=message
            )
        except:
            print('error creating message in chat group')
