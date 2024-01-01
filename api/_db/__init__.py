from pymongo import MongoClient
from _config import MONGODB_URL


def get_client():
    return MongoClient(MONGODB_URL)


def get_database():
    return get_client().get_database("test")


def get_user_col():
    return get_database().get_collection("users")


def get_article_col():
    return get_database().get_collection("articles")
