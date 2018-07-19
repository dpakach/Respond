from django.shortcuts import render, get_object_or_404

from rest_framework.viewsets import ViewSet
from rest_framework import permissions, response, parsers, status


from .models import Photo
from .serializers import PhotoSerializer


class PhotoViewSet(ViewSet):
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)
    parser_classes = (parsers.MultiPartParser,)
    lookup_field = 'uuid'
    lookup_value_regex = '[0-9a-f-]+'

    def retrieve(self, request, uuid):
        photo = get_object_or_404(Photo, uuid=uuid)
        serializer = PhotoSerializer(photo, context={'request': request})
        return response.Response(serializer.data)

    def create(self, request):
        """Create photo.
        
        **Use multipart encoding**
        ```js
        {
            "image": <binary-file>
        }
        ```
        """
        serializer = PhotoSerializer(data=request.data, context={'request': request})
        serializer.is_valid(raise_exception=True)
        serializer.save(user=request.user)
        return response.Response(serializer.data, status=status.HTTP_201_CREATED)