from django.conf.urls import url, include
from rest_framework import routers


from .views import PhotoViewSet

router = routers.DefaultRouter()

router.register(r'', PhotoViewSet, base_name='photo')

urlpatterns = [
    url("^", include(router.urls)),
]

