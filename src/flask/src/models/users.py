
class BaseUser(object):


    def __init__(self, id, type):
        self.id = id
        self.user_type = type
        self._populate(self)

    
    def _populate(self):
        pass


class User(BaseUser):


    def _get_friends(self):
        pass


    def _get_media_ids(self):
        pass


    def is_admin(self):
        pass


    def get_comments(self):
        pass


class Friend(BaseUser):


    def get_mutuals(self):
        pass

