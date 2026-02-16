from fastapi import WebSocket,APIRouter
from core.jwt import decode_access_token

router=APIRouter()
connection={}
@router.websocket('/ws')
async def connection(websocket:WebSocket):

    try:

        await websocket.accept()
    


        while True:
            data = await websocket.receive_text()
            await websocket.send_text(data)
    except WebSocketDisconnect:
        print("Client disconnected")

    
    except Exception as e:
        print("Unexpected error:", e)
        await websocket.close(code=1011)
