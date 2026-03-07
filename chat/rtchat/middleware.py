from channels.middleware import BaseMiddleware
from urllib.parse import parse_qs
from channels.db import database_sync_to_async
from django.contrib.auth.models import User, AnonymousUser
from jwt import decode as jwt_decode
from django.conf import settings

@database_sync_to_async
def get_user(user_id):
    return User.objects.get(id=user_id)

class JWTAuthMiddleware(BaseMiddleware):
    async def __call__(self, scope, receive, send):
        query_string = parse_qs(scope["query_string"].decode())
        token = query_string.get("token")
        if token:
            try:
                payload = jwt_decode(token[0], settings.SECRET_KEY, algorithms=["HS256"])
                user = await get_user(payload["user_id"])
                scope['user'] = user
            except Exception:
                scope['user'] = AnonymousUser()
        else:
            scope['user'] = AnonymousUser()
        return await super().__call__(scope, receive, send)