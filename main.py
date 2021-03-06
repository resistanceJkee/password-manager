from flask import *
from threading import Thread
from modules.Database import *
import webbrowser
import os
import modules.MoveDB

app = Flask(__name__)
Passwords.create_table()
settings_path = os.path.join(os.path.split(os.path.abspath(__file__))[0], "settings"+os.sep+"settings.json")


@app.route("/")
def index():
    return render_template("index.html")


@app.route("/categories", methods=["GET"])
def get_categories():
    categories = search_categories()
    return json.dumps({"message": categories})


@app.route("/password", methods=["GET"])
def get_passwords():
    category = request.values.get("category")
    passwords = search_passwords_by_category(category)
    return json.dumps({"message": passwords})


@app.route("/password", methods=["POST"])
def add_password():
    message = add_password_to_db(request.values.get("category"), request.values.get("login"),
                                 request.values.get("password"), request.values.get("mail") or None,
                                 request.values.get("phone") or None, request.values.get("description") or None)
    return json.dumps({"message": message})


@app.route("/password", methods=["PUT"])
def update_password():
    message = update_password_bd(request.values.get("id"), request.values.get("login"),
                                 request.values.get("password"), request.values.get("mail"),
                                 request.values.get("phone"), request.values.get("description"))
    return json.dumps({"message": message})


@app.route("/password", methods=["DELETE"])
def delete_password():
    message = delete_password_bd(request.values.get("id"))
    return json.dumps({"message": message})


@app.route("/settings", methods=["GET"])
def get_settings():
    with open(settings_path, "r") as st:
        return json.dumps(json.load(st))


@app.route("/settings", methods=["PUT"])
def set_settings():
    auto_copy = request.values.get("autoCopy")
    focus_to_new = request.values.get("focusToNew")
    open_this_category = request.values.get("openThisCategory")
    with open(settings_path, "r") as file:
        data = json.load(file)
        data["autoCopy"] = auto_copy
        data["focusToNew"] = focus_to_new
        data["openThisCategory"] = open_this_category
    with open(settings_path, "w") as file:
        file.write(json.dumps(data))
    return json.dumps({"message": "good"})


@app.route("/import_key", methods=["GET"])
def import_key():
    return modules.MoveDB.import_some_key()


@app.route("/export_key", methods=["GET"])
def export_key():
    return modules.MoveDB.export_some_key()


@app.route("/import_db", methods=["GET"])
def import_db():
    return modules.MoveDB.import_some_db()


@app.route("/export_db", methods=["GET"])
def export_db():
    return modules.MoveDB.export_some_db()


@app.route("/import_all", methods=["GET"])
def import_all():
    return modules.MoveDB.import_all_files()


@app.route("/export_all", methods=["GET"])
def export_all():
    return modules.MoveDB.export_all_files()


def st_sv():
    app.run()


def open_browser():
    webbrowser.open_new_tab("http://localhost:5000/")


def main():
    srv = Thread(target=st_sv)
    ob = Thread(target=open_browser)
    srv.start()
    ob.start()


if __name__ == '__main__':
    main()
