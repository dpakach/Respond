import os
import random

from django.db import models
from django.contrib.auth import get_user_model


from utils.util_behaviour import TimestampEnabled, UUIDEnabled



User = get_user_model()


def upload_posts_media_to(instance, filename):
    username = instance.user
    _, file_extension = os.path.splitext(filename)
    filename = str(random.getrandbits(64)) + file_extension
    return f"photos/{username}/{filename}"


class Photo(UUIDEnabled, TimestampEnabled, models.Model):
    image = models.ImageField(upload_to=upload_posts_media_to)
