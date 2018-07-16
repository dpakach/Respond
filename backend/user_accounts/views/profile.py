from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from user_accounts.models import UserProfile
from user_accounts.serializers import (
    UserProfileSerializer,
    UserProfileSerializerUpdate,
    UserSerializerLogin
)
 

# profiles
class UserProfileView(APIView):

    @staticmethod
    def get(request):
        """
        List profiles
        """

        profiles = UserProfile.objects.all()
        return Response(UserProfileSerializer(profiles, many=True).data)


# profiles/{profile_id}
class UserProfileDetail(APIView):

    @staticmethod
    def patch(request, profile_id):
        """
        Update profile of authenticated user
        """

        profile = get_object_or_404(UserProfile, pk=profile_id)
        if profile.user != request.user:
            return Response(status=status.HTTP_401_UNAUTHORIZED)
        serializer = UserProfileSerializerUpdate(profile, data=request.data, context={'request': request}, partial=True)
        if serializer.is_valid():
            serializer.validated_data['pending_verification'] = True
            profile = serializer.save()
            return Response(UserSerializerLogin(profile.user).data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# profiles
class DoctorProfileView(APIView):

    @staticmethod
    def get(request):
        """
        List profiles
        """

        profiles = DoctorProfile.objects.all()
        return Response(DoctorProfileSerializer(profiles, many=True).data)


# profiles/{profile_id}
class DoctorProfileDetail(APIView):

    @staticmethod
    def patch(request, profile_id):
        """
        Update profile of authenticated user
        """

        profile = get_object_or_404(DoctorProfile, pk=profile_id)
        if profile.user != request.user:
            return Response(status=status.HTTP_401_UNAUTHORIZED)
        serializer = DoctorProfileSerializerUpdate(profile, data=request.data, context={'request': request}, partial=True)
        if serializer.is_valid():
            serializer.validated_data['pending_verification'] = True
            profile = serializer.save()
            return Response(UserSerializerLogin(profile.user).data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
