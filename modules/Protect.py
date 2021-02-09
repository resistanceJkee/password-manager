import os
from cryptography.fernet import Fernet


class Protect:

    def __init__(self):
        self.path_to_pm = self.get_path_to_pm()
        self.key = self.get_key()

    def get_key(self):
        if self.check_files():
            with open(os.path.join(self.path_to_pm, "key/q.key"), 'rb') as key:
                return key.read()
        else:
            return self.create_key()

    def create_key(self):
        key = Fernet.generate_key()
        with open(os.path.join(self.path_to_pm, "key/q.key"), 'wb') as key_file:
            key_file.write(key)
            return key

    def encrypt(self, text):
        f = Fernet(self.key)
        encrypted_text = f.encrypt(text.encode("UTF-8"))
        return encrypted_text

    def decrypt(self, encrypted_text):
        f = Fernet(self.key)
        decrypted_text = f.decrypt(encrypted_text.encode("UTF-8"))
        return decrypted_text.decode("UTF-8")

    def check_files(self):
        key_folder_path = os.path.join(self.path_to_pm, "key")
        check_files = [name for name in os.listdir(key_folder_path)
                       if os.path.isfile(os.path.join(key_folder_path, name))]
        if len(check_files) == 1:
            return True
        else:
            return False

    @staticmethod
    def get_path_to_pm():
        return os.path.split(os.path.split(__file__)[0])[0]
