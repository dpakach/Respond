from django.conf.urls import url
from django.conf.urls import include
from django.views.generic import TemplateView
from .views.user import UserView
from .views.profile import UserProfileView
from .views.reset_password import ResetPasswordCodeget, ResetPasswordView
from .views.update_password import UpdatePasswordView
from .views.profile import UserProfileSerializerUpdate, UserProfileView

from . import views

urlpatterns = [

    # Password management
    url(r'^reset-password/$', ResetPasswordCodeget.as_view()),
    url(r'^update-password/$', UpdatePasswordView.as_view()),
    url(r'^reset-password/(?P<code>[0-9A-Fa-f-]+)/$', ResetPasswordView.as_view(), name='reset_password'),

    # UserProfiles
    url(r'^user/profile/$', UserProfileView.as_view()),

    # Users
    url(r'^user/$', UserView.as_view()),

]
