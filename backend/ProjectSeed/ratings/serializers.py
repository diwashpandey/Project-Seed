# Imports from django
from django.contrib.auth import get_user_model # Djagno given function to get the AUTH USER model

# imports from restframework
from rest_framework.serializers import ( ModelSerializer )

# Models import
from .models import CollegeRating

# Getting the User from the dajngo given settings
User = get_user_model()

# Other Models Serializers for the Realtions
class UserProfileSerializerForRatings(ModelSerializer):
    class Meta:
        model = User
        fields = ["full_name", "username", "profile_photo"]

# Serializers of the main model here (Rating)

class CollegeRatingSerializer(ModelSerializer):
    user = UserProfileSerializerForRatings(read_only = True)
    class Meta:
        model = CollegeRating
        exclude = ["college"]
        depth = 2