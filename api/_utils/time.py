from datetime import datetime, timezone
from _config import TIMEZONE

startTime = {
    "hour": 0,
    "minute": 0,
    "second": 0,
    "microsecond": 0,
}
endTime = {
    "hour": 23,
    "minute": 59,
    "second": 59,
    "microsecond": 999999,
}


def get_now():
    return datetime.now(tz=TIMEZONE)


def get_utc_now():
    return datetime.now(tz=timezone.utc)
