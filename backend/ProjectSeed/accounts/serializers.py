# imports from rest_framework
from rest_framework import serializers

# imports from django
from django.contrib.auth import get_user_model

# serializers import
from colleges.serializers import CollegeMiniData
from universities.serializers import UniversityMiniData
from posts.serializers import PostSerializer


# using djagno provided function to get the USER Model
User = get_user_model()

class UserProfileSerializer(serializers.ModelSerializer):

    colleges = CollegeMiniData(many=True)
    universities = UniversityMiniData(many=True)
    posts = PostSerializer(many=True)

    class Meta:
        model = User
        exclude = ["password", "is_staff", "is_superuser", "date_joined", "last_login", "groups", "user_permissions", "following", "rises"]
        depth = 2

class DowntownProfileCardsSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ["id","username", "full_name", "profile_photo"]


class TopProfilesSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["full_name", "intro", "username", "rise_points"]
        read_only_fields = ["full_name", "intro", "username", "rise_points"]


class AuthUserQuickDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["full_name", "intro", "username", "rise_points", "profile_photo", "background_photo", "following_count", "followers_count"]

        read_only_fields = ["full_name", "intro", "username", "rise_points", "profile_photo", "background_photo", "following_count", "followers_count"]