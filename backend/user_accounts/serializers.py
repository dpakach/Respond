from django.contrib.auth.password_validation import validate_password
from rest_framework import serializers
from rest_framework.authtoken.models import Token
from user_accounts.models import UserProfile, User
from rest_framework.parsers import FormParser

class UserSerializer(serializers.ModelSerializer):
    user_profile = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'first_name', 'last_name', 'gender', 'date_of_birth', 'is_responder', 'phone', 'user_profile')

    @staticmethod
    def get_user_profile(user):
        """
        Get or create profile
        """

        profile, created = UserProfile.objects.get_or_create(user=user)
        return UserProfileSerializer(profile, read_only=True).data



class UserSerializerCreate(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ('username', 'email', 'first_name', 'last_name', 'password', 'gender', 'date_of_birth', 'is_responder', 'phone')

    @staticmethod
    def validate_password(password):
        """
        Validate password
        """

        validate_password(password)
        return password

class UserProfileSerializer(serializers.ModelSerializer):

    class Meta:
        model = UserProfile
        fields = '__all__'

class UserProfileSerializerUpdate(serializers.ModelSerializer):

    class Meta:
        model = UserProfile
        fields = ('profile_photo',)

class UserSerializerUpdate(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ('username', 'first_name', 'last_name', 'gender', 'date_of_birth', 'is_responder',)

