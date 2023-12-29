from pydantic import BaseModel, Field

# 로그인 사용자에게 반환하는 토큰 형식


class Token(BaseModel):
    access_token: str = Field(description="액세스 토큰")
    refresh_token: str = Field(description="리프레시 토큰")
    token_type: str = Field(description="토큰 형식 (웬만하면 Bearer)")


class TokenData(BaseModel):
    email: str = Field(description="사용자 이메일")


class RefreshToken(BaseModel):
    # grant_type: Literal["refresh_token"] = Field(
    #     description="허가 형식(refresh_token only)")
    refresh_token: str = Field(description="리프레쉬 토큰")
