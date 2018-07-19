import uuid as uuid_lib

from django.db import models


class UUIDEnabled(models.Model):
    """
     Add UUID Field to each models
    """

    uuid = models.UUIDField(  # Used by the API to look up the record
        db_index=True,
        default=uuid_lib.uuid4, editable=False
    )

    class Meta:
        abstract = True


class IntervalEnabled(models.Model):
    """
    Add start date and end date to the model

    """
    start_date = models.DateField(null=True, blank=True)
    end_date = models.DateField(null=True, blank=True)

    class Meta:
        abstract = True


class TimestampEnabled(models.Model):
    """
    Add created_at and updated_at to the model

    """
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True
