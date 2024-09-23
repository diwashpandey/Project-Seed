from django.urls import path
from . import views

urlpatterns = [
       path("universities-list/", views.GetUniversitiesListView.as_view(), name="get_universities_list"),
]
