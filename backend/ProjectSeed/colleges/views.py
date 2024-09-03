# Imports from django
from django.shortcuts import render

# Imports from RestFramework -> DRF
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response

# Additional Imports
from utilities.response.response_utilities import ResponseUtilities

# Importing Serializers
from .serializers import CollegeDetailSerializer

# Models Imports
from .models import College

# Create your views here.
class RegisterCollege(APIView, ResponseUtilities):
    permission_classes = [IsAuthenticated]

    def post(self, request, format=None):
        pass

class CollegeProfileView(APIView, ResponseUtilities):
    permission_classes = [ AllowAny ]
    
    def get(self, request, format=None):
        # Retrieve the college identifier from query parameters
        college_identifier = request.query_params.get('college_identifier', None)
        print("I'm here to get the data for:", college_identifier)
        print(self.permission_classes)
        
        # Check if college identifier is provided
        if not college_identifier:
            self.message_to_client = "College ID is required."
            return Response(self.get_generated_response())

        try:
            # Attempt to retrieve the college instance using the provided identifier
            college = College.objects.get(college_identifier=college_identifier)
            serialized_data = CollegeDetailSerializer(instance=college).data

            # Set default values for `is_admin` and `is_management_team`
            serialized_data["is_admin"] = False
            serialized_data["is_management_team"] = False

            # Check if the request is authenticated
            if request.user.is_authenticated:
                # Update `is_admin` and `is_management_team` if the user is the one
                serialized_data["is_admin"] = college.admin == request.user
                serialized_data["is_management_team"] = request.user in college.management_team.all()

            # Assign serialized data to the response
            self.response_data = serialized_data
            self.success_status = True
            self.message_to_client = "College details retrieved successfully."

        except College.DoesNotExist:
            # Handle case where college is not found
            self.message_to_client = "College not found."

        # Return the generated response with the appropriate message and data
        return Response(self.get_generated_response())
