# Imports from django
from django.contrib.auth import get_user_model # Djagno given function to get the AUTH USER model

# imports from restframework
from rest_framework.serializers import ( ModelSerializer )

# Models import
from .models import CollegeRating
from colleges.models import College

# Getting the User from the dajngo given settings
User = get_user_model()

# Other Models Serializers for the Realtions
class UserProfileSerializerForRatings(ModelSerializer):
    class Meta:
        model = User
        fields = ["full_name", "username", "profile_photo"]

class CollegeSerializerForRating(ModelSerializer):
    class Meta:
        model = College
        fields = ["id"]

# Serializers of the main model here (Rating)

class CollegeRatingSerializer(ModelSerializer):
    user = UserProfileSerializerForRatings(read_only = True)
    class Meta:
        model = CollegeRating
        exclude = ["college", "updated_at"]
        depth = 2

class CreateCollegeRatingSerializer(ModelSerializer):
    user = UserProfileSerializerForRatings()
    college = CollegeSerializerForRating()

    class Meta:
        model = CollegeRating
        fields = ["user", "college", "rating", "comment"]