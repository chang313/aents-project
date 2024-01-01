from fastapi import FastAPI
from _routers.auth import router as AuthRouter
from _routers.user import router as UserRouter
from _routers.article import router as ArticleRouter

app = FastAPI()


@app.get("/")
def read_root():
    return {"message": "welcome to FastAPI server"}


app.include_router(AuthRouter, prefix="")
app.include_router(UserRouter, prefix="/user")
app.include_router(ArticleRouter, prefix="/article")
