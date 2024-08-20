from rest_framework.serializers import ( ModelSerializer )
from .models import University

class UniversityMiniDataSerializer(ModelSerializer):

    class Meta:
        model = University
        fields = ["id","name", "profile_photo", "background_photo", "location", "country"]