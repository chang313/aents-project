from typing import Optional
from pydantic import BaseModel, Field, validator
from datetime import datetime
from fastapi import UploadFile, File

# from pydantic.types import constr


class ArticleBase(BaseModel):
    """
    블로그 글
    """

    title: str = Field(description="글 제목")
    content: str = Field(description="글 내용")
    date_time: datetime = Field(description="글 최초 작성일시")
    writer_name: str = Field(description="글쓴이 이름")
    image: Optional[UploadFile] = File(..., description="대표 이미지") 

# @validator("image")
# def validate_image(cls, value):
#     # Validate the maximum file size (5 MB)
#     if value.file.seekable():
#         value.file.seek(0, 2)  # Move to the end of the file
#         file_size = value.file.tell()
#         value.file.seek(0)  # Reset file position

#         max_size = 5 * 1024 * 1024  # 5 MB limit
#         if file_size > max_size:
#             raise ValueError(f"File size exceeds the maximum limit of {max_size} bytes")

#     return value


class Article(ArticleBase):
    """
    데이터베이스 블로그 글 모델
    """

    id: str = Field(alias="_id", description="글 식별자")
