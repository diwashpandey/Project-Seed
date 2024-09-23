from rest_framework.serializers import ( ModelSerializer )
from .models import University

class UniversityMiniDataSerializer(ModelSerializer):

    class Meta:
        model = University
        fields = ["id","name", "profile_photo", "slogan", "state", "city", "country"]