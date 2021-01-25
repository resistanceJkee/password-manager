from peewee import *
from modules.Protect import Protect


db = SqliteDatabase("database.db")
protect = Protect()


class Passwords(Model):
    id = PrimaryKeyField(null=False)
    category = CharField(null=False)
    login = CharField(null=False)
    password = CharField(null=False)
    email = CharField(null=True)
    phone = CharField(null=True)
    description = CharField(null=True)

    class Meta:
        database = db


def add_password_to_db(category, login, password, email=None, phone=None, description=None):
    if not search_password(category, login):
        Passwords(category=category,
                  login=login,
                  password=protect.encrypt(password),
                  email=email,
                  phone=phone,
                  description=description).save()
        return "done"
    else:
        return "decline"


def update_password_bd(row_id, login=None, password=None, email=None, phone=None, description=None):
    try:
        if login:
            Passwords.update(login=login).where(Passwords.id == row_id).execute()
        if password:
            Passwords.update(password=protect.encrypt(password)).where(Passwords.id == row_id).execute()
        if email:
            Passwords.update(email=email).where(Passwords.id == row_id).execute()
        if phone:
            Passwords.update(phone=phone).where(Passwords.id == row_id).execute()
        if description:
            Passwords.update(description=description).where(Passwords.id == row_id).execute()
        return "done"
    except Exception as e:
        return "decline"


def delete_password_bd(row_id):
    try:
        Passwords.delete_by_id(row_id)
        return "done"
    except Exception as e:
        return "decline"


def search_password(category, login):
    try:
        Passwords.get(Passwords.category == category, Passwords.login == login)
        return True
    except Exception as e:
        return False


def search_passwords_by_category(category):
    data = []
    passwords = Passwords.select().where(Passwords.category == category)
    for row in passwords:
        data.append({"id": row.id, "login": row.login, "pass": protect.decrypt(row.password),
                     "email": row.email, "phone": row.phone, "description": row.description})
    return data


def search_categories():
    data = []
    for row in Passwords.select().group_by(Passwords.category):
        data.append(row.category)
    return data


def get_id(category, login):
    return Passwords.get(Passwords.category == category, Passwords.login == login)
