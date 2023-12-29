from fastapi import APIRouter, HTTPException, status
from pydantic import BaseModel, EmailStr, Field
from _db import get_user_col
from _const import SwaggerTag
from _models.user import User
from _utils.id import generate_user_id
from _utils.password import get_password_hash


class PostUserModel(BaseModel):
    """사용자 추가"""

    name: str = Field(description="사용자 이름")
    email: EmailStr = Field(description="사용자 이메일")
    plain_password: str = Field(description="사용자 비밀번호(평문)")


class PutUserModel(BaseModel):
    name: str = Field(description="사용자 이름")
    email: EmailStr = Field(description="사용자 이메일")
    plain_password: str = Field(description="사용자 비밀번호(평문)")


router = APIRouter()


@router.post(path="", tags=[SwaggerTag.USER])
def 사용자_추가(user: PostUserModel):
    user_col = get_user_col()
    if user_col.find_one({"email": user.email}) != None:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="같은 이메일 주소로 가입된 사용자가 있습니다.",
            headers={"WWW-Authenticate": "Bearer"},
        )
    password = get_password_hash(user.plain_password)
    new_user_model = User(**user.dict(), password=password, _id=generate_user_id())
    result = get_user_col().insert_one(new_user_model.dict(by_alias=True))

    return {
        "success": True,
        "inserted_id": result.inserted_id,
        "inserted_document": {
            "name": new_user_model.name,
            "email": new_user_model.email,
        },
    }
