import os
import pytz

APP_PROTOCOL = os.environ["APP_PROTOCOL"]
APP_HOST = os.environ["APP_HOST"]
APP_PORT = os.environ["APP_PORT"]

API_PROTOCOL = os.environ["API_PROTOCOL"]
API_HOST = os.environ["API_HOST"]
API_PORT = os.environ["API_PORT"]

MONGODB_URL = os.environ["MONGODB_URL"]

REPR_API_URL = os.environ["REPR_API_URL"]
REPR_APP_URL = os.environ["REPR_APP_URL"]
REPR_MONGODB_URL = os.environ["REPR_MONGODB_URL"]

# misc
TIMEZONE = pytz.timezone("Asia/Seoul")

# 토큰 관련
# to get a string like this run:  openssl rand -hex 32
JWT_SECRET_KEY = os.environ["JWT_SECRET_KEY"]
JWT_REFRESH_SECRET_KEY = os.environ["JWT_REFRESH_SECRET_KEY"]
ALGORITHM = "HS256"

ACCESS_TOKEN_EXPIRE_MINUTES = 30  # 30분
REFRESH_TOKEN_EXPIRE_MINUTES = 60 * 24 * 7  # 1주일
