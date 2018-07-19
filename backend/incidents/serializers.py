from rest_framework import serializers

class UserSerializer(serializers.Serializer):
    location = serializers.SerializerMethodField()

    class Meta:
        fields = ('id', 'username', 'email', 'first_name', 'last_name', 'gender', 'date_of_birth', 'is_responder', 'phone', 'user_profile')