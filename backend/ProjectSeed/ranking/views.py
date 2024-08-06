# imports from django_rest_framework
from rest_framework.generics import ListAPIView
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny


# imports from apps
from ranking.ranking_system import ProfileRankingSystem

# Custom modules
from utilities.response.response_utilities import ResponseUtilities

# imports from django
from django.http import HttpResponse

# importing serializers
from ranking.serializers import TopProfilesSerializer
from accounts.serializers import UserProfileSerializer

# Create your views here.
def temporaryview(request):
    return HttpResponse("I am in home")

class GetTopProfiles(APIView, ResponseUtilities):  # Using the Normal APIView for more customization
    authentication_classes = []
    permission_classes = [AllowAny]
    
    def get(self, request, format=None):
        """
            Retrieve data for top-performing students.

            Queries:
                -get_from:
                    Options include 'college' or 'university'.

                -name_of_university_or_college:
                    Specify the name of the university or college.

                -count:
                    Number of top profiles to retrieve.


            If no parameters are provided:
                - Returns the top 3 profiles globally.
        """

        # Retrieve the 'get_from' parameter from the request query parameters
        get_from = request.query_params.get('get_from', None)
        
        # Retrieve the 'name_of_university_or_college' parameter from the request query parameters
        name_of_university_or_college = request.query_params.get('name', None)
        
        # Retribing the count and converting to (int) right away
        count = int(request.query_params.get('count', 3))
        
        # Initialize an instance of the ProfileRankingSystem class
        profile_ranking_system = ProfileRankingSystem()  # This will be used to get the top students

        top_profiles = None  # This will be sent to the Client 
        
        # Check if both 'name_of_university_or_college' and 'get_from' parameters are provided
        if name_of_university_or_college and get_from:
            # Retrieve top profiles based on the specified 'get_from' parameter
            if get_from == "college":
                top_profiles = profile_ranking_system.get_top_profiles_from_college(college_name=name_of_university_or_college, count=count)
            elif get_from == "university":
                top_profiles = profile_ranking_system.get_top_profiles_from_university(university_name=name_of_university_or_college, count=count)
            else:
                top_profiles = profile_ranking_system.get_top_profiles_from_global(count=count)

        # Retrieve top profile globally if no specific parameters are provided
        else:
            top_profiles = profile_ranking_system.get_top_profiles_from_global(count=count)
            print(top_profiles)
        
        # Serialize the top profile data using the TopProfilesSerializer class
        self.response_data = TopProfilesSerializer(instance=top_profiles, many=True).data  # getting the .data directly

        # Setting the messege to client attribute
        self.message_to_client = profile_ranking_system.message_to_client
        
        # Return the generated response to the client
        return Response(self.get_generated_response())
