from django.urls import path
from . import views

urlpatterns = [
    path("upload-post", views.UploadPostHandler.as_view(), name="upload_post"),
    path("rise-commit", views.PostRiseHandler.as_view(), name="post_rise_handler"),
]