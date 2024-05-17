# imports from django_rest_framework
from rest_framework import serializers

# imports from django
from django.contrib.auth import get_user_model

# Getting the user model using the django provided function
User = get_user_model()

class TopProfilesSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ["full_name", "username", "rise_points", "profile_photo", "background_photo"]