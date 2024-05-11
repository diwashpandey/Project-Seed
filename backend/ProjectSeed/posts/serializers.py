# imports form rest_framework
from rest_framework import serializers

# Models Import
from . models import Post

class PostSerializer(serializers.ModelSerializer):

    class Meta:
        model = Post
        fields = "__all__"
