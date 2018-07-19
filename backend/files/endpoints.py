from django.conf.urls import url, include
from rest_framework import routers
from django.views.generic import TemplateView


from .views import FileViewSet

router = routers.DefaultRouter()

router.register(r'', FileViewSet, base_name='file')

urlpatterns = [
    url("^", include(router.urls)),
]

