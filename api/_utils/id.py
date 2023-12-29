import uuid


def _generate_uuid():
    return uuid.uuid4()


def _generate_template(keyword: str):
    return f"{keyword}-{_generate_uuid()}"


def generate_user_id():
    return _generate_template("user")
