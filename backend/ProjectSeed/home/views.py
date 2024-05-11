# imports from django_rest_framework
from rest_framework.generics import ListAPIView
from rest_framework.views import APIView
from rest_framework.response import Response

# imports from apps
from ranking.ranking_system import ProfileRankingSystem, PostsRankingSystem
from utilities.response.response_utilities import ResponseUtilities

# imports from django
from django.http import HttpResponse

# importing serializers
from ranking.serializers import TopProfilesSerializer
from posts.serializers import PostSerializer
from accounts.serializers import UserProfileSerializer

# Create your views here.
class HomePageView(APIView, ResponseUtilities, ProfileRankingSystem, PostsRankingSystem):
    
    def get(self, request, format=None):

        #           *******   Fetching Top Profiles *******

        top_profiles = None  # This will be sent to the Client 
        top_posts = None  # This will be sent to the Client
        user = None
        
        if request.user.is_authenticated:
            print("Authenticated user request in home view")

            user = request.user
            user = UserProfileSerializer(instance = user)

            if request.user.colleges:
                top_profiles = self.get_top_profile_from_college(request.user.colleges[0].name, count = 3)
                top_posts = self.get_top_posts_from_college(request.user.colleges[0].name, count = 3)

            elif request.user.universities:
                top_profiles = self.get_top_profiles_from_university(request.user.universities[0].name, count = 3)
                top_posts = self.get_top_posts_from_university(request.user.universities[0].name, count = 3)
            else:
                top_profiles = self.get_top_profiles_from_global(count = 3)
                top_posts = self.get_top_posts_from_global(count = 3)

        else:
            print("NOn Authenticated user request in home view")
            top_posts = self.get_top_posts_from_global(count = 3)
            top_profiles = self.get_top_profiles_from_global(count = 3)

        # Serializing the data
        top_profiles_serialized_data = TopProfilesSerializer(instance = top_profiles, many=True)
        top_posts_serialized_data = PostSerializer(instance = top_posts, many=True)

        # print("The top profiles are:", top_profiles_serialized_data) # This is temporary code for testing(Remove if you see it)

        # Adding the data to the response_data
        self.response_data = {"top3Photos":top_profiles_serialized_data.data,
                              "top3Posts": top_posts_serialized_data.data,
                              "user":user}

        return Response(self.get_generated_response())