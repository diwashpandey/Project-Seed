from rest_framework.serializers import ( ModelSerializer )
from .models import College

class CollegeMiniDataSerializer(ModelSerializer):

    class Meta:
        model = College
        fields = ["id","name", "profile_photo", "background_photo", "location", "country"]