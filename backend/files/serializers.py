from rest_framework import serializers

from .models import File


class FileSerializer(serializers.ModelSerializer):
    user = serializers.SlugRelatedField(
       slug_field='username',
       read_only=True,
    )
    size = serializers.SerializerMethodField()

    def get_size(self, obj):
        return obj.file.size
    class Meta:
        model = File
        fields = ( "uuid", "created_at", "user", "updated_at", "file", "file_type", "size", "name")
        read_only_fields = ( 'uuid', 'created_at', 'user', 'updated_at', "file_type", "size", "name")
        depth = 1
