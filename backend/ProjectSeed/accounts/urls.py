# imports from djagno
from django.urls import path

# imports from rest_framework_simplejwt
from rest_framework_simplejwt.views import TokenRefreshView

# imports from APPS
from . import views

urlpatterns = [
       path("login/", views.LoginView.as_view(), name="login"),
       path("register/", views.RegisterView.as_view(), name="register"),
       path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]
