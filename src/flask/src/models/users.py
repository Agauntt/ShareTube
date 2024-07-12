
class BaseUser(object):


    def __init__(self, id, type):
        self.id = id
        self.user_type = type
        self._populate(self)

    
    def _populate(self):
        pass


class User(BaseUser):

    params = [
        'id',
        'first_name',
        'last_name',
        'is_admin',
        'pfp_id'
    ]


    def _get_friends(self):
        pass


    def _get_media_ids(self):
        pass


    def is_admin(self):
        pass


    def get_comments(self):
        pass


class Friend(BaseUser):

    params = [
        'id',
        'first_name',
        'last_name'
    ]


    def get_mutuals(self):
        pass
