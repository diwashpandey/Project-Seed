# imports from django_rest_framework
from rest_framework.generics import ListAPIView
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny


# imports from apps
from ranking.ranking_system import ProfileRankingSystem, PostsRankingSystem
from utilities.response.response_utilities import ResponseUtilities

# imports from django
from django.http import HttpResponse
from django.contrib.auth import get_user_model

# importing serializers
from ranking.serializers import TopProfilesSerializer
from posts.serializers import PostSerializer
from accounts.serializers import UserProfileSerializer

# using djagno provided function to get the USER Model
User = get_user_model()

# Create your views here.
def temporaryview(request):
    return HttpResponse("I am in home")

class HomePageView(APIView, ResponseUtilities, ProfileRankingSystem, PostsRankingSystem):
    authentication_classes = []  # Empty list means no authentication required
    permission_classes = [AllowAny]  # Allow any user to access
    
    def get(self, request, format=None):
        
        top_profiles = None  # This will be sent to the Client 
        top_posts = None  # This will be sent to the Client
        loggedin_user_details = None
        
        if request.user.is_authenticated:
            
            loggedin_user_details = UserProfileSerializer(instance = request.user).data

            if request.user.colleges:
                top_profiles = self.get_top_profiles_from_college(request.user.colleges.all()[0].name, count = 3)
                top_posts = self.get_top_posts_from_college(request.user.colleges.all()[0].name, count = 3)

            elif request.user.universities:
                top_profiles = self.get_top_profiles_from_university(request.user.universities.all()[0].name, count = 3)
                top_posts = self.get_top_posts_from_university(request.user.universities.all()[0].name, count = 3)
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

        # Adding the data to the response_data
        self.response_data = {"top_3_profiles":top_profiles_serialized_data.data,
                              "top_3_posts": top_posts_serialized_data.data,
                              "loggedin_user_details":loggedin_user_details}

        return Response(self.get_generated_response())