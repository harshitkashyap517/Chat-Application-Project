from fastapi import FastAPI
from fastapi.responses import HTMLResponse
from sqlmodel import SQLModel
from dotenv import load_dotenv
from db.models import profile


html = """
<!DOCTYPE html>
<html>
    <head>
        <title>Chat</title>
    </head>
    <body>
        <h1>WebSocket Chat</h1>
        <form action="" onsubmit="sendMessage(event)">
            <input type="text" id="messageText" autocomplete="off"/>
            <button>Send</button>
        </form>
        <ul id='messages'>
        </ul>
        <script>
            var ws = new WebSocket("ws://localhost:8000/auth/ws");
            ws.onmessage = function(event) {
                var messages = document.getElementById('messages')
                var message = document.createElement('li')
                var content = document.createTextNode(event.data)
                message.appendChild(content)
                messages.appendChild(message)
            };
            function sendMessage(event) {
                var input = document.getElementById("messageText")
                ws.send(input.value)
                input.value = ''
                event.preventDefault()
            }
        </script>
    </body>
</html>
"""

# Load .env file
load_dotenv()
from routes.signup import router as signup_router
from routes.login import router as login_router
from db.database import engine
from routes.websocket import router as socket_router

app=FastAPI()

@app.on_event("startup")
def on_startup():
    SQLModel.metadata.create_all(engine)
    print("Database Created Successfully")

@app.get('/')
def home():
    return HTMLResponse(html)


app.include_router(
    signup_router,
    prefix="/auth",
    tags=["Authentication"]
)
app.include_router(
    login_router,
    prefix="/auth",
    tags=["Authentication"]
)

app.include_router(
    socket_router,
    prefix="/auth",
    tags=["Authentication"]
)