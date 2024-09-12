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
from accounts.serializers import UserProfileCardSerializer
from colleges.serializers import CollegeMiniDataSerializer
from universities.serializers import UniversityMiniDataSerializer

# Importing Models
from colleges.models import College
from universities.models import University

# Create your views here.
def temporaryview(request):
    return HttpResponse("I am in home")

class GetTopProfiles(APIView, ResponseUtilities):
    authentication_classes = []

    def get(self, request, format=None):
        """
        Retrieve top-performing students based on query parameters.
        
        Query Parameters:
            - get_from: Specify 'college' or 'university'.
            - name: Name of the college or university.
            - skill: Skill to filter profiles.
            - count: Number of profiles to retrieve (default: 3).
        
        Returns:
            - Response with top profiles and any relevant messages.
        """
        # Extract query parameters
        self.get_from = request.query_params.get('get_from', None)
        self.academy_identifier = request.query_params.get('name', None)
        self.skill = request.query_params.get('skill', None)
        self.count = int(request.query_params.get('count', 3))

        # Initialize ProfileRankingSystem
        profile_ranking_system = ProfileRankingSystem(
            self.get_from,
            self.academy_identifier,
            self.skill,
            self.count
        )

        top_profiles = profile_ranking_system.get_top_profiles()

        # Serialize profile data
        top_profiles_serialized = UserProfileCardSerializer(instance=top_profiles, many=True).data

        # Prepare response data
        self.success_status = profile_ranking_system.success_status
        self.response_data = {
            "top_profiles": top_profiles_serialized,
            "place_details": self.get_place_details()
        }
        self.message_to_client = profile_ranking_system.message_to_client

        return Response(self.get_generated_response())
    
    def get_place_details(self, *args, **kwargs):

        if self.get_from == "college":
            college_details = College.objects.filter(college_identifier=self.academy_identifier).first()
            return CollegeMiniDataSerializer(instance=college_details).data if college_details else None
                
        elif self.get_from == "university":
            university_details = University.objects.filter(university_identifier=self.academy_identifier).first()
            return UniversityMiniDataSerializer(instance=university_details).data if university_details else None
        
        else:
            return None