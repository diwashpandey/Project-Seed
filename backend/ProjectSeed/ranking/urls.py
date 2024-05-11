from django.urls import path
from . import views

urlpatterns = [
    path("get-top-profiles", views.GetTopProfiles.as_view(), name = "get_top_profiles'"),
]