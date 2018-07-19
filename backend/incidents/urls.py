from django.conf.urls import url
from django.conf.urls import include
from .views import IncidentsView, IncidentsDetailView, QueryIncidents, BoundingBoxView

urlpatterns = [
        url(r'^incidents/$', IncidentsView.as_view()),
        url(r'^incidents/(?P<incident_id>[0-9A-Za-z-]+)/$', IncidentsDetailView.as_view()),
        url(r'^find-incidents/$', QueryIncidents.as_view()),
        url(r'^find-box/$', BoundingBoxView.as_view()),
]