from pymongo import MongoClient, UpdateOne
from _config import MONGODB_URL


def get_client():
    return MongoClient(MONGODB_URL)


def get_database():
    return get_client().get_database("test")


def get_user_col():
    return get_database().get_collection("users")


def get_article_col():
    return get_database().get_collection("articles")


def get_latest_article():
    result = get_article_col().find_one(sort=[("date_time", -1)])
    return result

def get_all_article():
    result = list(get_article_col().find({}).sort("date_time", -1 ))
    return result

def get_my_article(username):
    result = list(get_article_col().find({'writer_name': username}).sort("date_time", -1))
    return result

def update_target_article(article_id, title, content, image, datetime, isImageChange):
    if isImageChange:
        updates = {
            "$set": {
                "title": title,
                "content": content,
                "image": image,
                "date_time": datetime,
            }
        }
    else:
        updates = {
            "$set": {
                "title": title,
                "content": content,
                "date_time": datetime,
            }
        }

    get_article_col().update_one({"_id": article_id}, updates)

def delete_target_article(article_id):
    get_article_col().delete_one({"_id": article_id})