# imports from rest_framework
from rest_framework import serializers

# imports from django
from django.contrib.auth import get_user_model

# Models Import
from . models import Post
from . models import PostPhoto

# Getting User Model with djagno provided function
User = get_user_model()

# Additional Imports

class UserProfileForPostSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ["full_name", "username", "profile_photo"]

class PhotosSerializer(serializers.ModelSerializer):

    class Meta:
        model = PostPhoto
        fields = ["photo"]

class PostSerializer(serializers.ModelSerializer):
    user = UserProfileForPostSerializer()
    photos = PhotosSerializer(many=True)

    class Meta:
        model = Post
        fields = "__all__"
