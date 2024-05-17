from django.urls import path
from . import views


urlpatterns = [
    path("home-data-authenticated/", views.HomeViewAuthenticated.as_view(), name="home_authenticated"),
    path("home-data-non-authenticated/", views.HomeViewNonAuthenticated.as_view(), name="home_non_authenticated"),
]


