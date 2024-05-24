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

       # Profile
       path("auth-user-quick-data/", views.AuthUserQuickData.as_view(), name="auth_user_quick_data"),
       path("profile", views.ProfileView.as_view(), name="profile"),
       path("profile-non-authenticated", views.ProfileViewNonAuthenticated.as_view(), name="profile"),
       path("downtown/", views.ProfileDowntownView.as_view(), name="profile_downtown"),
       path("downtown-non-authenticated/", views.ProfileDowntownNonAuthenticatedView.as_view(), name="profile_downtown_nonauthenticated"),

       # Tokens
       path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

       #Rise and Following
       path("profile-rise-handler/", views.RiseHandlerView.as_view(), name="rise_handler"),
       path("profile-follow-handler/", views.FollowHandlerView.as_view(), name="follow_handler")

]
