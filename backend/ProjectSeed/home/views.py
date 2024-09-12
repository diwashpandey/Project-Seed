# imports from django_rest_framework
from rest_framework.generics import ListAPIView
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework_simplejwt.authentication import JWTStatelessUserAuthentication

# imports from apps
from ranking.ranking_system import ProfileRankingSystem, PostRankingSystem
from utilities.response.response_utilities import ResponseUtilities

# imports from django
from django.http import HttpResponse
from django.contrib.auth import get_user_model

# importing serializers
from accounts.serializers import UserProfileCardSerializer
from posts.serializers import PostSerializer

# using djagno provided function to get the USER Model
User = get_user_model()

# Create your views here.
def temporaryview(request):
    return HttpResponse("I am in home")


class HomeViewAuthenticated(APIView, ResponseUtilities, PostRankingSystem):
    """
        This is the api view which provides all the data
        that is shown in the home page.

        It uses:
            ProfileRankingSystam: To get top profiles
            PostRankingSystam: To get top posts
            and
            ResponseUtilities: For response stuffs like response_data, success_status, etc

        Disclaimer:
            "IsAuthenticatedOrReadOnly" permission class is used:
                - To make any authenticated or non authenticated user be able to see home page
    """
    permission_classes = [IsAuthenticated]
    
    def get(self, request, format=None):
        top_profiles = None  
        top_posts = None    # These 2 will be sent to the Client

        academy = {
            "college":request.user.colleges.values_list("college_identifier", flat=True).first(),
            # "college":request.user.universities.values_list("university_identifier", flat=True).first(),
            "university":None # This is temporary 
        }
        
        kwargs = {
            "get_from":None,
            "academy_identifier":None,
            "count":3
        }
        if academy["college"] is not None:
            kwargs["get_from"] = "college"
            kwargs["academy_identifier"] = academy["college"]

        elif academy["university"] is not None:
            kwargs["get_from"] = "university"
            kwargs["academy_identifier"] = academy["university"]
        profile_ranking_system = ProfileRankingSystem(**kwargs)
        top_profiles = profile_ranking_system.get_top_profiles()

        print(kwargs)
        print("\n\n\n These are the top profiles:", top_profiles, "\n\n\n")

        if academy["college"]:
            top_posts = self.get_top_posts_from_college(request.user.colleges.first().name, count = 3)

        # Getting top profiles and posts from UNIVERSITY if exists
        elif academy["university"]:
            top_posts = self.get_top_posts_from_university(request.user.universities.first().name, count = 3)

        # Getting top profiles and posts from GLOBAL if BOTH DOESN'T EXISTS
        else:
            top_posts = self.get_top_posts_from_global(count = 3)

        # Serializing the data
        top_3_profiles = UserProfileCardSerializer(instance = top_profiles, many=True).data
        top_3_posts = PostSerializer(instance = top_posts, many=True).data

        # Adding the data to the response_data
        self.response_data = {"top_3_profiles":top_3_profiles,
                              "top_3_posts": top_3_posts}
        self.success_status = profile_ranking_system.success_status

        return Response(self.get_generated_response())
    

class HomeViewNonAuthenticated(APIView, ResponseUtilities,  PostRankingSystem):
    """
        This is the api view which provides all the data
        that is shown in the home page.

        It uses:
            ProfileRankingSystam: To get top profiles
            PostRankingSystam: To get top posts
            and
            ResponseUtilities: For response stuffs like response_data, success_status, etc

        Disclaimer:
            "IsAuthenticatedOrReadOnly" permission class is used:
                - To make any authenticated or non authenticated user be able to see home page
    """
    authentication_classes = []
    permission_classes = [AllowAny] 
    
    def get(self, request, format=None):
        top_profiles = None  
        top_posts = None                # These 3 will be sent to the Client

        profile_ranking_system = ProfileRankingSystem(count=3)
        
        top_profiles = profile_ranking_system.get_profiles_from_global()
        top_posts = self.get_top_posts_from_global(count = 3)


        # Serializing the data
        top_3_profiles = UserProfileCardSerializer(instance = top_profiles, many=True).data
        top_3_posts = PostSerializer(instance = top_posts, many=True).data

        # Adding the data to the response_data
        self.response_data = {"top_3_profiles":top_3_profiles,
                              "top_3_posts": top_3_posts}
        self.success_status = profile_ranking_system.success_status
        

        return Response(self.get_generated_response())