# imports from rest_framework
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.permissions import AllowAny

# imports from APPS
from recommendation.post_recommendation_system import PostsRecommendation
from utilities.response.response_utilities import ResponseUtilities

# Serializers imports
from . serializers import PostSerializer

# Models import
from . models import Post

