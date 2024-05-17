# imports from rest_framework
from rest_framework import serializers

# imports from django
from django.contrib.auth import get_user_model

# using djagno provided function to get the USER Model
User = get_user_model()

class UserProfileSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = User
        fields = ["email","username","full_name","age","gender","intro","about_me","profile_photo","background_photo","is_teacher","is_verified","is_email_verified","following_count","followers_count","rise_points","github","linkedin","instagram","colleges","universities","skills","interests","following", "rise"]      


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