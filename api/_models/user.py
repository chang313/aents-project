from typing import Literal, Optional, Union
from pydantic import BaseModel, EmailStr, Field

# from pydantic.types import constr


class UserBase(BaseModel):
    """
    사용자 모델
    """

    name: str = Field(description="사용자 이름")
    email: EmailStr = Field(description="사용자 이메일")
    password: str = Field(description="해시된 비밀번호")


class User(UserBase):
    """
    데이터베이스 사용자 모델
    """

    id: str = Field(alias="_id", description="사용자 식별자")
