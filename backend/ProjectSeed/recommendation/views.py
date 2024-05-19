# imports from rest_framework
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.permissions import AllowAny

# imports from APPS
from recommendation.post_recommendation_system import PostsRecommendation
from utilities.response.response_utilities import ResponseUtilities

# Serializers imports
from posts.serializers import PostSerializer

# Models import
from posts.models import Post

class GetPosts(APIView, ResponseUtilities):
    """
        This serves as an API endpoint.

        When the frontend sends a request here, it includes the offset and limit to fetch additional posts.

        In response, this endpoint provides a JSON object containing the post data for the frontend to handle.

        The frontend then creates post elements using this data and adds them to the page's body.
    """
    permission_classes = [IsAuthenticated]

    def get(self, request):
        offset = int(request.GET.get("offset", 0))
        limit = int(request.GET.get("limit", 10))

        postrecommendation = PostsRecommendation()
        # recommended_posts = postrecommendation.get_posts_for_user(user=request.user, offset=offset, limit=limit)
        recommended_posts = Post.objects.all() # Temporary

        serialized_data = PostSerializer(instance = recommended_posts, many=True)

        self.response_data = serialized_data.data
        self.success_status = True

        return Response(self.get_generated_response())

class GetPostsNonAuthenticated(APIView, ResponseUtilities):
    """
        This serves as an API endpoint.

        When the frontend sends a request here, it includes the offset and limit to fetch additional posts.

        In response, this endpoint provides a JSON object containing the post data for the frontend to handle.

        The frontend then creates post elements using this data and adds them to the page's body.
    """
    authentication_classes = []
    permission_classes = [AllowAny]

    def get(self, request):
        import time
        time.sleep(2)
        offset = int(request.GET.get("offset", 0))
        limit = int(request.GET.get("limit", 10))

        postrecommendation = PostsRecommendation()
        # recommended_posts = postrecommendation.get_posts_for_user(user=request.user, offset=offset, limit=limit)
        recommended_posts = Post.objects.all() # Temporary

        serialized_data = PostSerializer(instance = recommended_posts, many=True)

        self.response_data = serialized_data.data
        self.success_status = True

        return Response(self.get_generated_response())

