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
from colleges.serializers import CollegeMiniDataSerializer
from universities.serializers import UniversityMiniDataSerializer

# Importing Models
from colleges.models import College
from universities.models import University

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

                -name_of_place:
                    Specify the name of the university or college.

                -count:
                    Number of top profiles to retrieve.


            If no parameters are provided:
                - Returns the top 3 profiles globally.
        """

        # Working with queries that will be used to filter
        self.get_from = request.query_params.get('get_from', None)  # Retrieve the 'get_from' parameter from the request query parameters
        self.name_of_place = request.query_params.get('name', None)  # Retrieve the 'name_of_place' parameter from the request query parameters
        self.count = int(request.query_params.get('count', 3))  # Retribing the count and converting to (int) right away

        print("\n\n\nThe get from is:", self.get_from,"\nThe name of place asked is", self.name_of_place,"\nThe count asked is:", self.count,"\n\n\n")

        # Initialize an instance of the ProfileRankingSystem class
        profile_ranking_system = ProfileRankingSystem()  # This will be used to get the top students

        top_profiles = None  # This will be sent to the Client 
        # Check if both 'name_of_place' and 'get_from' parameters are provided
        if self.name_of_place and self.get_from:
            # Retrieve top profiles based on the specified 'get_from' parameter
            if self.get_from == "college":
                top_profiles = profile_ranking_system.get_top_profiles_from_college(college_name=self.name_of_place, count=self.count)
                print("Was here in college so got topstudents:", top_profiles)

            elif self.get_from == "university":
                top_profiles = profile_ranking_system.get_top_profiles_from_university(university_name=self.name_of_place, count=self.count)
                print("Was here in college so got topstudents:", top_profiles)
            
            else:
                top_profiles = profile_ranking_system.get_top_profiles_from_global(count=self.count)
                print("Was here in non college or university so got topstudents:", top_profiles)

        # Retrieve top profile globally if no specific parameters are provided
        else:
            top_profiles = profile_ranking_system.get_top_profiles_from_global(count=self.count)
        
        # Serialize the top profile data using the TopProfilesSerializer class
        top_profiles_serialized_data = TopProfilesSerializer(instance=top_profiles, many=True).data  # getting the .data directly
        print("Here in down got this:", top_profiles_serialized_data)
        self.success_status = profile_ranking_system.success_status # Setting the success status from the ranking system

        self.response_data = {"top_profiles":top_profiles_serialized_data,
                              "place_details": self.get_place_details()}
        print("The details of place is:", self.get_place_details())
        # Setting the messege to client attribute
        self.message_to_client = profile_ranking_system.message_to_client

        # Return the generated response to the client
        return Response(self.get_generated_response())
    
    def get_place_details(self, *args, **kwargs):

        if self.get_from == "college":
            college_details = College.objects.filter(name__icontains=self.name_of_place).first()
            return CollegeMiniDataSerializer(instance=college_details).data if college_details else None
                
        elif self.get_from == "university":
            university_details = University.objects.filter(name__icontains=self.name_of_place).first()
            return UniversityMiniDataSerializer(instance=university_details).data if university_details else None
        
        else:
            return None