# imports from rest_framework
from rest_framework import serializers

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