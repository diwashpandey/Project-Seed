# imports from djagno
from django.urls import path

# imports from rest_framework_simplejwt
from rest_framework_simplejwt.views import TokenRefreshView

# imports from APPS
from . import views

urlpatterns = [
       # Authentications
       path("login/", views.LoginView.as_view(), name="login"),
       path("register/", views.RegisterView.as_view(), name="register"),

       # Tokens
       path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

       # Profile
       path("auth-user-quick-data/", views.AuthUserQuickData.as_view(), name="auth_user_quick_data"),

]
