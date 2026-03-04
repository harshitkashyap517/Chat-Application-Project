from channels.generic.websocket import WebsocketConsumer
from django.template.loader import render_to_string
from asgiref.sync import async_to_sync
from django.shortcuts import get_object_or_404
import json
from .models import *
class ChatroomConsumer(WebsocketConsumer):
    def connect(self):
        self.user=self.scope['user']
        self.chatroom_name = self.scope['url_route']['kwargs']['chatroom_name'] 
        self.chatroom = get_object_or_404(Chatgroup, name=self.chatroom_name)
        async_to_sync(self.channel_layer.group_add)(
            self.chatroom_name,
            self.channel_name
        )
        if self.user not in self.chatroom.users_online.all():
            self.chatroom.users_online.add(self.user)
            self.update_users_online()
        self.accept() 

    def disconnect(self,close_code):
        async_to_sync(self.channel_layer.group_discard)(
            self.chatroom_name,
            self.channel_name
        )
        if self.user in self.chatroom.users_online.all():
            self.chatroom.users_online.remove(self.user)
            self.update_users_online()
    
    def receive(self,text_data):
        text_data_json=json.loads(text_data)
        body=text_data_json['body']
        message=Groupmessage.objects.create(
            group=self.chatroom,
            author=self.user,
            body=body,
            
           

        )
       
        async_to_sync(self.channel_layer.group_send)(
            self.chatroom_name, 
            {
                'type':'chat_message',
                'message_id':message.id
            }   
        )

    def chat_message(self,event):
        message_id=event['message_id']
        message=Groupmessage.objects.get(id=message_id)
        html=render_to_string('rtchat/partials/chat_message_p.html',{'message':message,'user':self.user,'chat_group': self.chatroom})
        self.send(text_data=html)


    def update_users_online(self):
        online_count=self.chatroom.users_online.count()-1
        event={
            'type':'online_count_handler',
            'online_count':online_count
        }
        async_to_sync(self.channel_layer.group_send)(
            self.chatroom_name,
            event
        )
    def online_count_handler(self,event):
        online_count=event['online_count']
        html=render_to_string('rtchat/partials/online_count.html',{'online_count':online_count})
        self.send(text_data=html)