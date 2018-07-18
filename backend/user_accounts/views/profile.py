from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from user_accounts.models import UserProfile
from user_accounts.serializers import (
    UserProfileSerializer,
    UserProfileSerializerUpdate)
 

# profiles
class UserProfileView(APIView):

    @staticmethod
    def get(request):
        """
        List profiles
        """
        if not request.user.is_authenticated():
            return Response({}, status=status.HTTP_204_NO_CONTENT)
        profile = get_object_or_404(UserProfile, user=request.user)
        return Response(UserProfileSerializer(profile).data)

    @staticmethod
    def patch(request):
        """
        Update profile of authenticated user
        """
        if not request.user.is_authenticated():
            return Response({}, status=status.HTTP_204_NO_CONTENT)
        profile = get_object_or_404(UserProfile, user=request.user)
        if profile.user != request.user:
            return Response(status=status.HTTP_401_UNAUTHORIZED)
        print(request.data)
        serializer = UserProfileSerializerUpdate(profile, data=request.data, context={'request': request}, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(UserProfileSerializer(profile).data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
