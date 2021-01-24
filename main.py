from flask import *
from modules.Database import *
import webbrowser

app = Flask(__name__)
Passwords.create_table()


@app.route("/")
def index():
    return render_template("index.html")


@app.route("/get_categories", methods=["GET"])
def get_categories():
    categories = search_categories()
    return json.dumps({"message": categories})


@app.route("/get_passwords", methods=["POST"])
def get_passwords():
    category = request.values.get("category")
    passwords = search_passwords_by_category(category)
    return json.dumps({"message": passwords})


@app.route("/add_password", methods=["POST"])
def add_password():
    message = add_password_to_db(request.values.get("category"), request.values.get("login"),
                                 request.values.get("password"), request.values.get("mail") or None,
                                 request.values.get("phone") or None, request.values.get("description") or None)
    return json.dumps({"message": message})


@app.route("/update_password", methods=["PUT"])
def update_password():
    message = update_password_bd(request.values.get("id"), request.values.get("login"),
                                 request.values.get("password"), request.values.get("mail"),
                                 request.values.get("phone"), request.values.get("description"))
    return json.dumps({"message": message})


@app.route("/delete_password", methods=["DELETE"])
def delete_password():
    message = delete_password_bd(request.values.get("id"))
    return json.dumps({"message": message})


def main():
    webbrowser.open_new_tab("http://localhost:5000/")
    app.run()


if __name__ == '__main__':
    main()
