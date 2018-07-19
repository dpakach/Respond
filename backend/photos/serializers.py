from rest_framework import serializers

from .models import Photo


class PhotoSerializer(serializers.ModelSerializer):
    user = serializers.SlugRelatedField(slug_field="username", read_only=True)
    width = serializers.SerializerMethodField()
    height = serializers.SerializerMethodField()

    def get_width(self, obj):
        return obj.image.width

    def get_height(self, obj):
        return obj.image.height

    class Meta:
        model = Photo
        fields = (
            "uuid",
            "created_at",
            "user",
            "updated_at",
            "image",
            "height",
            "width",
        )
        read_only_fields = (
            "uuid",
            "created_at",
            "user",
            "updated_at",
            "height",
            "width",
        )
        depth = 1
