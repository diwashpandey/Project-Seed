# imports from rest_framework
from rest_framework import serializers

# imports from django
from django.contrib.auth import get_user_model

# serializers import
from colleges.serializers import CollegeMiniDataSerializer
from universities.serializers import UniversityMiniDataSerializer

# models imports
from .models import Interest, Skill

# using djagno provided function to get the USER Model
User = get_user_model()

class SkillSerializer(serializers.ModelSerializer):
    class Meta:
        fields = ["name"]
        model = Skill

class InterestSerializer(serializers.ModelSerializer):
    class Meta:
        fields = ["name"]
        model = Interest

class UserProfileDataSerializer(serializers.ModelSerializer):
    """
        Serializer for user profile data, excluding sensitive fields.
        
        Includes mini data of connected colleges and universities.
    """
    colleges = CollegeMiniDataSerializer(many=True)
    interests = InterestSerializer(many=True)
    skills = SkillSerializer(many=True)
    universities = UniversityMiniDataSerializer(many=True)

    class Meta:
        model = User
        exclude = ["id", "password", "is_staff", "is_superuser", "date_joined", "last_login", "groups", "user_permissions"]
        depth = 2

class UserProfileCardSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = User
        fields = ["id", "username", "full_name", "profile_photo", "intro", "rise_points"]

class UserSearchBoxProfileCardSerializer(serializers.ModelSerializer):
    college_name = serializers.SerializerMethodField()
    university_name = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = ["id", "username", "full_name", "profile_photo", "intro", "rise_points", "college_name", "university_name"]

    def get_college_name(self, obj):
        # Since colleges are prefetched, we don't hit the database again.
        college = obj.collegeconnection_set.first()
        return college.college.name if college else None

    def get_university_name(self, obj):
        # Similarly, universities are prefetched, avoiding additional queries.
        university = obj.universityconnection_set.first()
        return university.university.name if university else None