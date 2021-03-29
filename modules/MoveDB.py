import tkinter as tk
from tkinter import filedialog as fd
import shutil
import os


def import_some_key():
    root = tk.Tk()
    root.withdraw()
    root.attributes("-topmost", True)
    name = fd.askopenfilename(filetypes=[("Key file", ".key")])
    root.destroy()
    target_folder = os.path.join(os.path.split(os.path.dirname(__file__))[0], "key")
    try:
        shutil.copy(name, target_folder)
    except Exception as e:
        return "denied"
    return "success"


def export_some_key():
    root = tk.Tk()
    root.withdraw()
    root.attributes("-topmost", True)
    target_folder = fd.askdirectory()
    root.destroy()
    key_file = os.path.join(os.path.split(os.path.dirname(__file__))[0], f"key{os.sep}q.key")
    try:
        shutil.copy(key_file, target_folder)
    except Exception as e:
        return "denied"
    return "success"


def import_some_db():
    """
    Импорт базы данных в программу
    :return:
    """
    root = tk.Tk()
    root.withdraw()
    root.attributes("-topmost", True)
    name = fd.askopenfilename(filetypes=[("Database file", ".db")])
    root.destroy()
    target_folder = os.path.join(os.path.split(os.path.dirname(__file__))[0], "database")
    try:
        shutil.copy(name, target_folder)
    except Exception as e:
        return "denied"
    return "success"


def export_some_db():
    """
    Экспорт базы данных в место, куда укажет пользователь
    :return:
    """
    root = tk.Tk()
    root.withdraw()
    root.attributes("-topmost", True)
    target_folder = fd.askdirectory()
    root.destroy()
    db_file = os.path.join(os.path.split(os.path.dirname(__file__))[0], f"database{os.sep}database.db")
    try:
        shutil.copy(db_file, target_folder)
    except Exception as e:
        return "denied"
    return "success"


def import_all_files():
    db_target_folder = os.path.join(os.path.split(os.path.dirname(__file__))[0], "database")
    key_target_folder = os.path.join(os.path.split(os.path.dirname(__file__))[0], "key")
    root = tk.Tk()
    root.withdraw()
    root.attributes("-topmost", True)
    name_folder = fd.askdirectory()
    root.destroy()
    db = os.path.join(name_folder, "database.db")
    key = os.path.join(name_folder, "q.key")
    try:
        shutil.copy(db, db_target_folder)
        shutil.copy(key, key_target_folder)
    except Exception as e:
        return "denied"
    return "success"


def export_all_files():
    db_file = os.path.join(os.path.split(os.path.dirname(__file__))[0], f"database{os.sep}database.db")
    key_file = os.path.join(os.path.split(os.path.dirname(__file__))[0], f"key{os.sep}q.key")
    root = tk.Tk()
    root.withdraw()
    root.attributes("-topmost", True)
    name_folder = fd.askdirectory()
    path = os.path.join(name_folder, "password-manager_packages")
    os.mkdir(path)
    try:
        shutil.copy(db_file, path)
        shutil.copy(key_file, path)
    except Exception as e:
        return "denied"
    return "success"
