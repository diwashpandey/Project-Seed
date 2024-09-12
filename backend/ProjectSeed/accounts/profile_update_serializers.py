
# imports from rest_framework
from rest_framework import serializers
import re

# imports from django
from django.contrib.auth import get_user_model

# serializers import
from colleges.serializers import CollegeMiniDataSerializer
from universities.serializers import UniversityMiniDataSerializer
from posts.serializers import PostSerializer
from .models import User

# class NameUpdateSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = User
#         fields = ["first_name", "last_name", "full_name"]

class NameUpdateSerializer(serializers.Serializer):
    full_name = serializers.CharField(max_length = 50, required=True)
    last_name = serializers.CharField(max_length = 25, required=True)
    first_name = serializers.CharField(max_length = 25, required=True)

class IntroUpdateSerializer(serializers.Serializer):
    intro = serializers.CharField(max_length = 100)

# Helper function for no numbers validation
def validate_no_numbers(value):
    if any(char.isdigit() for char in value):
        raise serializers.ValidationError("Numbers are not allowed in the skill or interest name.")

class SkillsSerializer(serializers.Serializer):
    skills = serializers.ListField(
        child=serializers.CharField(
            min_length=2,  # Minimum length of skill name
            max_length=100,  # Maximum length of skill name
            validators=[validate_no_numbers]  # Custom validation
        ),
        allow_empty=False
    )

class InterestsSerializer(serializers.Serializer):
    interests = serializers.ListField(
        child=serializers.CharField(
            min_length=2,  # Minimum length of interest name
            max_length=100,  # Maximum length of interest name
            validators=[validate_no_numbers]  # Custom validation
        ),
        allow_empty=False
    )

class LocationSerializer(serializers.Serializer):
    """
    Serializer for updating the location of a user.

    This serializer validates and processes the location data sent from the client.
    """
    country = serializers.CharField(max_length=100, required=True)
    state = serializers.CharField(max_length=100, required=True)
    city = serializers.CharField(max_length=100, required=True)

    def validate(self, data):
        """
        Validate that none of the fields contain numbers.
        """
        for field in ['country', 'state', 'city']:
            if any(char.isdigit() for char in data[field]):
                raise serializers.ValidationError({field: f"{field.capitalize()} must not contain numbers."})

        return data