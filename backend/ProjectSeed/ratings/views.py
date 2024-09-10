# Importing from RestFrameWork
from rest_framework.views import APIView
from rest_framework.response import Response

# Additional imports
from utilities.response.response_utilities import ResponseUtilities

# Importing Serializers
from .serializers import CollegeRatingSerializer

# importing Models
from colleges.models import College
from .models import CollegeRating

class GetCollegeRatings(APIView, ResponseUtilities):
    def get(self, request, format=None):
        # Extract query parameters
        college_identifier = request.query_params.get("college_identifier")
        count = int(request.query_params.get("count", 10))  # Default to 10 if count is not provided
        
        # Validate query parameters
        if not college_identifier:
            self.message_to_client = "College identifier is required."
            return Response(self.get_generated_response())

        # Fetch ratings for the specified college
        ratings = CollegeRating.objects.filter(college__college_identifier=college_identifier)[:count]

        if ratings.exists():
            try:
                serialized_data = CollegeRatingSerializer(ratings, many=True).data
                self.response_data = serialized_data
                self.success_status = True
                self.message_to_client = "College ratings retrieved successfully."
            except College.DoesNotExist:
                self.message_to_client = "Problem occured while searching College Ratings"
        else:
            self.message_to_client = "College doesn't exists"

        return Response(self.get_generated_response())

class GetCollegeRatingsNonAuth(APIView, ResponseUtilities):

    authentication_classes = []

    def get(self, request, format=None):
        # Extract query parameters
        college_identifier = request.query_params.get("college_identifier")
        count = int(request.query_params.get("count", 10))  # Default to 10 if count is not provided
        
        # Validate query parameters
        if not college_identifier:
            self.message_to_client = "College identifier is required."
            return Response(self.get_generated_response())

        # Fetch ratings for the specified college
        ratings = CollegeRating.objects.filter(college__college_identifier=college_identifier)[:count]

        if ratings.exists():
            try:
                serialized_data = CollegeRatingSerializer(ratings, many=True).data
                self.response_data = serialized_data
                self.success_status = True
                self.message_to_client = "College ratings retrieved successfully."
            except College.DoesNotExist:
                self.message_to_client = "Problem occured while searching College Ratings"
        else:
            self.message_to_client = "College doesn't exists"

        return Response(self.get_generated_response())