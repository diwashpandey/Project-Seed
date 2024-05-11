# imports from rest_framework
from rest_framework import serializers

# imports from django
from django.contrib.auth import get_user_model

# using djagno provided function to get the USER Model
User = get_user_model()

class UserProfileSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = User
        fields = "__all__"
        exclude = ["password", "created_date", "first_name", "last_name"]
        


class TopProfilesSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = User
        fields = ["full_name", "intro", "username", "rise_points", "college__name"]
        read_only_fields = ["full_name", "intro", "username", "rise_points"]