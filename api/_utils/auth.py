from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from jose import JWTError, jwt
from datetime import datetime, timedelta
from typing import Union
from pydantic import ValidationError
from _db import get_user_col
from _models.token import TokenData
from _models.user import User
from _utils.password import verify_password
from _config import (
    JWT_SECRET_KEY,
    ALGORITHM,
    JWT_REFRESH_SECRET_KEY,
    ACCESS_TOKEN_EXPIRE_MINUTES,
    REFRESH_TOKEN_EXPIRE_MINUTES,
)


oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/v2/signin")


credentials_exception = HTTPException(
    status_code=status.HTTP_401_UNAUTHORIZED,
    detail="Could not validate credentials",
    headers={"WWW-Authenticate": "Bearer"},
)
permission_exception = HTTPException(
    status_code=status.HTTP_403_FORBIDDEN,
    detail="Could not operate command(No permission)",
    headers={"WWW-Authenticate": "Bearer"},
)


def get_user(email: str):
    user = get_user_col().find_one({"email": email})
    return User(**user) if user else None


def authenticate_user(email: str, password: str):
    user = get_user(email)
    if not user:
        return False
    if not verify_password(password, user.password):
        return False
    return user


def create_access_token(data: dict, expires_delta: Union[timedelta, None] = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    elif data.get("sub") == "aents@aents.co":
        expire = datetime.utcnow() + timedelta(minutes=30 * 24 * 60)  # a month
    else:
        expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, JWT_SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt


def create_refresh_token(data: dict, expires_delta: Union[timedelta, None] = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=REFRESH_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    # database에 refresh_token 추가하기
    encoded_jwt = jwt.encode(to_encode, JWT_REFRESH_SECRET_KEY, ALGORITHM)
    return encoded_jwt


def validate_refresh_token(token: str):
    payload = jwt.decode(token, JWT_REFRESH_SECRET_KEY, ALGORITHM)
    exp = payload.get("exp", 0)
    # database에 refresh_token 확인하기
    if datetime.utcnow().timestamp() > exp:
        raise credentials_exception
    return create_access_token(payload)


# middleware에서 dependency injection을 사용하는 게 안되서
# logging middleware에서 사용자 정보 가져오는 용도로 사용.
def get_current_user_with_token(token):
    try:
        payload = jwt.decode(token, JWT_SECRET_KEY, algorithms=[ALGORITHM])
        email: Union[str, None] = payload.get("sub")
        if email is None:
            raise credentials_exception
        token_data = TokenData(email=email)
    except JWTError:
        raise credentials_exception
    user = get_user(email=token_data.email)
    if user is None:
        raise credentials_exception
    return user


async def get_current_user(token: str = Depends(oauth2_scheme)):
    try:
        payload = jwt.decode(token, JWT_SECRET_KEY, algorithms=[ALGORITHM])
        email: Union[str, None] = payload.get("sub")
        if email is None:
            raise credentials_exception
        token_data = TokenData(email=email)
    except (JWTError, ValidationError):
        raise credentials_exception
    user = get_user(email=token_data.email)
    if user is None:
        raise credentials_exception
    return user
