from django.urls import path
from . import views

urlpatterns = [
    path("upload-post", views.UploadPostHandler.as_view(), name="upload_post"),
    path("rise-commit", views.PostRiseHandler.as_view(), name="post_rise_handler"),

    path("get-user-posts", views.GetUserPosts.as_view(), name="get_user_post"),
    path("get-user-posts-non-auth", views.GetUserPostsNonAuth.as_view(), name="get_user_post_non_auth")
]

