from django.urls import path
from . import views

urlpatterns = [
    path("get-recommended-posts", views.GetPosts.as_view(), name="get_recommended_posts"),
    path("get-recommended-posts-non-auth", views.GetPostsNonAuthenticated.as_view(), name="get_recommended_posts")
]
