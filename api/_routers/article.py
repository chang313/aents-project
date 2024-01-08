from fastapi import APIRouter, HTTPException, status
from pydantic import BaseModel, Field, Json
from fastapi import UploadFile, File, Form
from _db import get_article_col, get_latest_article, get_all_article, get_my_article
from _const import SwaggerTag
from datetime import datetime
from _models.article import Article
from _utils.id import generate_article_id
from datetime import datetime
from typing import Optional
import os
import uuid
from pathlib import Path
import base64
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles
from _utils.article import save_uploaded_image

class PostArticleModel(BaseModel):
    """블로그 글 추가"""

    title: str = Field(description="글 제목")
    content: str = Field(description="글 내용")
    writer_name: str = Field(description="글쓴이 이름")
    image: Optional[UploadFile] = File(description="대표 이미지") 


router = APIRouter()



@router.post(path="", tags=[SwaggerTag.ARTICLE])
def create_article(data: Json = Form(), image: Optional[UploadFile] = File(None)):
    title = data['title']
    content = data['content']
    writer_name = data['writer_name']

    saved_file_name = ''  # This will store the path to the saved image

    if image:
        # Save the image and get the path
        saved_file_name = save_uploaded_image(image)

    print('title:', title)
    print('content:', content)
    print('writer_name', writer_name)
    print('image_path', saved_file_name)

    current_datetime = datetime.now()
    new_article_model = Article(**data, image=saved_file_name, date_time=current_datetime, _id=generate_article_id())
    result = get_article_col().insert_one(new_article_model.dict(by_alias=True))


    return {
        "success": True,
        "inserted_id": result.inserted_id,
    }

    

@router.get(path="/latest", tags=[SwaggerTag.ARTICLE])
def read_latest_article():
    query = get_latest_article()
    if query:
        latest_article = Article(**query)
    else:
        latest_article = None
        return {
            "success": False
        }
        
    return {
        "success": True,
        "title": latest_article.title,
        "writer": latest_article.writer_name,
        "date": latest_article.date_time,
        "image": latest_article.image

    }

@router.get(path="/all", tags=[SwaggerTag.ARTICLE])
def read_all_article():
    response = get_all_article()

    return response


@router.get(path="/my-articles/{username}", tags=[SwaggerTag.ARTICLE])
def read_my_article(username: str):
    response = get_my_article(username)
    print('response:', response)
    return response
