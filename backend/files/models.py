import os
import random

from django.db import models
from django.contrib.auth import get_user_model

from django.core.exceptions import ValidationError

from utils.util_behaviour import TimestampEnabled, UUIDEnabled


User = get_user_model()


def upload_posts_file_to(instance, filename):
    username = instance.user
    _, file_extension = os.path.splitext(filename)
    filename = str(random.getrandbits(64)) + file_extension
    return f"files/{username}/{filename}"


class File(UUIDEnabled, TimestampEnabled, models.Model):
    file = models.FileField(upload_to=upload_posts_file_to)
    name = models.CharField(max_length=255, null=True, blank=True)
    file_type = models.CharField(max_length=255, null=True, blank=True)

    def save(self, *args, **kwargs):
        file = os.path.basename(self.file.name)
        self.name, self.file_type = os.path.splitext(file)
        return super().save(*args, **kwargs)
