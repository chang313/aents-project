from fastapi import APIRouter, HTTPException, status
from pydantic import BaseModel, Field
from fastapi import UploadFile, File
from _db import get_article_col, get_latest_article, get_all_article
from _const import SwaggerTag
from datetime import datetime
from _models.article import Article
from _utils.id import generate_article_id
from datetime import datetime
from typing import Optional

class PostArticleModel(BaseModel):
    """블로그 글 추가"""

    title: str = Field(description="글 제목")
    content: str = Field(description="글 내용")
    # date_time: datetime = Field(description="글 최초 작성일")
    writer_name: str = Field(description="글쓴이 이름")
    image: Optional[UploadFile] = File(description="대표 이미지") 


router = APIRouter()


@router.post(path="", tags=[SwaggerTag.ARTICLE])
def create_article(article: PostArticleModel):

    current_datetime = datetime.now()
    new_article_model = Article(**article.dict(), date_time=current_datetime, _id=generate_article_id())
    result = get_article_col().insert_one(new_article_model.dict(by_alias=True))

    return {
        "success": True,
        "inserted_id": result.inserted_id,
        "inserted_document": {
            "title": new_article_model.title,
            "writer": new_article_model.writer_name,
            "date": new_article_model.date_time
        },
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

@router.get(path="/test", tags=[SwaggerTag.ARTICLE])
def test():
    response = 'test'
    return {"res": response}