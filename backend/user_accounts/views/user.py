from django.shortcuts import get_object_or_404
from django.contrib.sites.shortcuts import get_current_site
from django.core.mail import EmailMessage
from django.template.loader import render_to_string
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.decorators import api_view
from rest_framework.authtoken.models import Token
from user_accounts.models import UserProfile, User, ResetPasswordCode
from user_accounts.serializers import (
    UserSerializer,
    UserSerializerCreate,
    UserSerializerUpdate
)

# users
class UserView(APIView):
    serializer_class = UserSerializer

    @staticmethod
    def get(request):
        """
        List users
        """

        user = get_object_or_404(User, id=request.user.id)
        return Response(UserSerializer(user).data)

    @staticmethod
    def post(request):
        """
        Create user
        """

        serializer = UserSerializerCreate(data=request.data, context={'request': request})
        if serializer.is_valid():
            user = serializer.save()
            user.set_password(serializer.validated_data['password'])
            user.save()
            UserProfile(user=user).save()
            return Response(UserSerializer(user).data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @staticmethod
    def patch(request,):
        """
        Update authenticated user
        """

        user = get_object_or_404(User, pk=request.user.id)
        if user != request.user:
            return Response(status=status.HTTP_401_UNAUTHORIZED)
        serializer = UserSerializerUpdate(user, data=request.data, context={'request': request}, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(UserSerializer(serializer.instance).data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @staticmethod
    def delete(request):
        """
        Delete user
        """

        user = get_object_or_404(User, pk=request.user.id)
        user.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

