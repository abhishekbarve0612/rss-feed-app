from fastapi import FastAPI

app = FastAPI()

@app.get('/feeds')
async def root():
    return {"message": "Feeds will go here"}

@app.get('/feeds/{feed_id}')
async def get_feed(feed_id: int):
    return {"message": f"Feed {feed_id} will go here"}