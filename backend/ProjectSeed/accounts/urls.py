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
       path("username-availability-service/", views.UsernameAvailabilityService.as_view(), name="username_availability_service"),
       path("email-availability-service/", views.EmailAvailabilityService.as_view(), name="username_availability_service"),

       # Profile
       path("auth-user-quick-data/", views.AuthUserQuickData.as_view(), name="auth_user_quick_data"),
       path("profile", views.ProfileView.as_view(), name="profile"),
       path("profile-non-authenticated", views.ProfileViewNonAuthenticated.as_view(), name="profile_non_authenticated"),
       path("downtown/", views.ProfileDowntownView.as_view(), name="profile_downtown"),
       path("downtown-non-authenticated/", views.ProfileDowntownNonAuthenticatedView.as_view(), name="profile_downtown_nonauthenticated"),

       # Tokens
       path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

       # Rise and Following
       path("profile-rise-handler/", views.RiseHandlerView.as_view(), name="rise_handler"),
       path("profile-follow-handler/", views.FollowHandlerView.as_view(), name="follow_handler"),

       # Settings
       path("skills-list/", views.SkillListView.as_view(), name="skills_list"),
       path("interests-list/", views.InterestListView.as_view(), name="interests_list"),

       # Profile Update
       path("update-first-and-last-name/", views.FirstAndLastNameUpdater.as_view(), name="update_first_and_last_name"),
       path("update-intro/", views.IntroUpdater.as_view(), name="update_intro"),
       path("update-about-me/", views.AboutMeUpdater.as_view(), name="update_about_me"),
       path("update-profile-photo/", views.ProfilePhotoUpdater.as_view(), name="update_profile_photo"),
       path("update-background-photo/", views.ProfileBackgroundUpdater.as_view(), name="update_background_photo"),
       path("update-skills/", views.SkillsUpdater.as_view(), name="update_skills"),
       path("update-interests/", views.InterestsUpdater.as_view(), name="update_interests"),
       path("update-location/", views.LocationUpdater.as_view(), name="update_location"),

]
