from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm

from _const import SwaggerTag
from _models.token import RefreshToken, Token
from _models.user import User
from _utils.auth import (
    authenticate_user,
    create_access_token,
    create_refresh_token,
    get_current_user,
    validate_refresh_token,
)

router = APIRouter()


@router.post(path="/signin", response_model=Token, tags=[SwaggerTag.AUTH])
def 로그인(form_data: OAuth2PasswordRequestForm = Depends()):
    user = authenticate_user(form_data.username, form_data.password)

    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="이메일 또는 비밀번호가 잘못되었습니다.",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token = create_access_token(data={"sub": user.email, "name": user.name})
    refresh_token = create_refresh_token(data={"sub": user.email})

    return {
        "access_token": access_token,
        "refresh_token": refresh_token,
        "token_type": "bearer",
    }


@router.post(path="/refresh-token", tags=[SwaggerTag.AUTH])
def 토큰_재발행(form_data: RefreshToken):
    token = form_data.refresh_token
    return {"access_token": validate_refresh_token(token)}


@router.get(path="/users/me", response_model=User, tags=[SwaggerTag.AUTH])
def 사용자_정보(current_user: User = Depends(get_current_user)):
    return current_user
