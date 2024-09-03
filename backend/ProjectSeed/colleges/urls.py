from django.urls import path
from . import views

urlpatterns = [
    path("profile/", views.CollegeProfileView.as_view(), name="college_profile"),
]
