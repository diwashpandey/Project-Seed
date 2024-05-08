from django.urls import path
from . import views

app_name = "accounts"

urlpatterns = [
    path("register-user/", views.RegisterUser.as_view(), name = "register_user"),
    path("login-user/", views.LoginUser.as_view(), name = "login_user"),
]
