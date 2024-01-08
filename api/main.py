from fastapi import FastAPI
from _routers.auth import router as AuthRouter
from _routers.user import router as UserRouter
from _routers.article import router as ArticleRouter
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
import os 

app = FastAPI()

# CORS configuration to allow requests from any origin
origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"message": "welcome to FastAPI server"}


# Set the path to your uploads directory
UPLOADS_DIR = os.path.join(os.path.dirname(__file__), "uploads")

# Mount the directory where your images are stored
app.mount("/articles/images", StaticFiles(directory=UPLOADS_DIR), name="images")


app.include_router(AuthRouter, prefix="")
app.include_router(UserRouter, prefix="/user")
app.include_router(ArticleRouter, prefix="/articles")
