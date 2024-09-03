# Importing from rest_framework
from rest_framework.serializers import ( ModelSerializer )

# Imports from Django
from django.contrib.auth import get_user_model # Djagno given function to get the AUTH USER model

# importing models
from .models import College
from ratings.serializers import CollegeRatingSerializer

# Importings Other Serializers

# Getting the User from the dajngo given settings
User = get_user_model()

# Other Models Serializers for the Realtions
class UserProfileSerializerForCollege(ModelSerializer):
    class Meta:
        model = get_user_model()
        fields = ["id", "username", "full_name", "profile_photo"]


# Serializers of the main model here (College)
class CollegeMiniDataSerializer(ModelSerializer):

    class Meta:
        model = College
        fields = ["id","name", "profile_photo", "background_photo", "location", "country"]


class CollegeDetailSerializer(ModelSerializer):
    admin = UserProfileSerializerForCollege(read_only=True)
    management_team = UserProfileSerializerForCollege(many=True, read_only=True)
    college_ratings = CollegeRatingSerializer(many=True, read_only=True)

    class Meta:
        model = College
        exclude = [
            'created_at',
            'updated_at'
        ]