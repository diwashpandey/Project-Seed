# import from django
from django.db.models import Count

# imports from rest_framework
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.permissions import AllowAny

# imports from APPS
from utilities.response.response_utilities import ResponseUtilities

# Serializers imports
from . serializers import PostSerializer

# Models import
from . models import Post

class PostRiseHandler(APIView, ResponseUtilities):
    """
        This is the class to handle the rise request from user to a post

        What it does?
        =    Do the thing and return Response using the response utilities.
    """
    permission_classes = [ IsAuthenticated ]
    # authentication_class is JWT authentication by default in settings

    def get_new_rise_count_of_post(self, post):
        # Using the aggregation to count to count the M2M fields 
        # of the users who have M2M relation to this post
        return post.rises.aggregate(new_rises_count_of_post = Count("id"))["new_rises_count_of_post"]

    def post(self, request):
        commit = request.data.get("commit", None)
        post_id = request.data.get("postId", None)
        
        try:
            post = Post.objects.get(pk=post_id)

            if commit == "rise":
                post.rises.add(request.user)
                self.response_data = {"new_rise_count_of_post": self.get_new_rise_count_of_post(post)}
                self.success_status = True

            elif commit == 'unrise':
                post.rises.remove(request.user)
                self.response_data = {"new_rise_count_of_post": self.get_new_rise_count_of_post(post)}
                self.success_status = True

            else:
                self.message_to_client = "There was a problem with your request !"


        except Exception as e:
            print(f"Error occured while Rise/Unrise commit, Post Id:{post_id} and Commit: {commit}", e)
            self.message_to_client = "There was a problem with your request !"

        return Response(self.get_generated_response())