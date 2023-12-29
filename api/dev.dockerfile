
FROM python:3.10-slim AS builder

WORKDIR /app

COPY requirements.txt ./

COPY . .

RUN --mount=type=cache,target=/root/.cache/pip \
    pip install -r requirements.txt

# COPY . .

CMD [\
    "uvicorn", \
    "main:app", \
    "--proxy-headers", \
    "--host", "0.0.0.0", \
    "--port", "8000", \
    "--reload" \
]