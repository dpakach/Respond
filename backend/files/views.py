from django.shortcuts import render, get_object_or_404

from rest_framework.viewsets import ViewSet
from rest_framework import permissions, response, parsers, status

from .models import File
from .serializers import FileSerializer


class FileViewSet(ViewSet):
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)
    parser_classes = (parsers.MultiPartParser,)
    lookup_field = 'uuid'
    lookup_value_regex = '[0-9a-f-]+'

    def retrieve(self, request, uuid):
        file = get_object_or_404(File, uuid=uuid)
        serializer = FileSerializer(file, context={'request': request})
        return response.Response(serializer.data)

    def create(self, request):
        """ Creates a file. 
        
        **Use multipart encoding**
        """
        serializer = FileSerializer(data=request.data, context={'request': request})
        serializer.is_valid(raise_exception=True)
        serializer.save(user=request.user)
        return response.Response(serializer.data, status=status.HTTP_201_CREATED)

