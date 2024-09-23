# Imports from django

# Imports from RestFramework -> DRF
from rest_framework.views import APIView
from rest_framework.response import Response

# Additional Imports
from utilities.response.response_utilities import ResponseUtilities

# Importing Serializers

# Models Imports
from .models import University

class GetUniversitiesListView(APIView, ResponseUtilities):
    authentication_classes = []

    def get(self, request, format=None):
        self.success_status = True
        self.response_data = University.objects.values("name", "university_identifier")
        
        return Response(self.get_generated_response())