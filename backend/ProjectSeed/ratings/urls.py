from django.urls import path
from . import views

urlpatterns=[
    path("get-college-ratings/", views.GetCollegeRatings.as_view(), name="get_college_ratings"),
    path("get-college-ratings-non-auth/", views.GetCollegeRatingsNonAuth.as_view(), name="get_college_ratings"),
]