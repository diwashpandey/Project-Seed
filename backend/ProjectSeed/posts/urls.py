from django.urls import path
from . import views

urlpatterns = [
    path("rise-commit", views.PostRiseHandler.as_view(), name="post_rise_handler")      
]