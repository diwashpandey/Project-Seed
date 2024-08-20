from django.urls import path
from . import views

urlpatterns = [
    path("top-profiles", views.GetTopProfiles.as_view(), name = "top_profiles"),
]