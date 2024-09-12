# imports from rest_framework
from rest_framework import serializers

# imports from django
from django.contrib.auth import get_user_model

# serializers import
from colleges.serializers import CollegeMiniDataSerializer
from universities.serializers import UniversityMiniDataSerializer


# using djagno provided function to get the USER Model
User = get_user_model()

class UserProfileDataSerializer(serializers.ModelSerializer):
    """
        Serializer for user profile data, excluding sensitive fields.
        
        Includes mini data of connected colleges and universities.
    """
    colleges = CollegeMiniDataSerializer(many=True)
    universities = UniversityMiniDataSerializer(many=True)

    class Meta:
        model = User
        exclude = ["id", "password", "is_staff", "is_superuser", "date_joined", "last_login", "groups", "user_permissions"]
        depth = 2

class UserProfileCardSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ["id", "username", "full_name", "profile_photo", "intro", "rise_points"]
