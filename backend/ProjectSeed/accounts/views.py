# django imports
from django.contrib.auth import get_user_model, authenticate

# rest_framework imports
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

# rest_framework_simplejwt imports
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework_simplejwt.tokens import RefreshToken

# imports from APPS
from utilities.response.response_utilities import ResponseUtilities
from . registration import CustomUserRegistration

# MODELS import

# Serializes imports
from .serializers import (AuthUserQuickDataSerializer, UserProfileSerializer)


# Getting the user model with django provided settings
User = get_user_model()

class LoginView(APIView, ResponseUtilities):

    permission_classes = [AllowAny]
    
    def post(self, request, format=None):
        
        email = request.data.get("email")
        password = request.data.get("password")

        user = authenticate(request, username = email, password = password)

        if user:
            refresh = RefreshToken.for_user(user)

            self.success_status = True
            self.message_to_client = "logged in successfully"
            self.response_data = {
                    'refresh': str(refresh),
                    'access': str(refresh.access_token),
                }
        else:
            self.message_to_client = "username or password was not matched !"

        return Response(self.get_generated_response())
    
class RegisterView(APIView, ResponseUtilities, CustomUserRegistration):
    
    def post(self, request, format=None):

        user = self.register_user_if_valid(request.data)

        return Response(self.get_generated_response())
    
class AuthUserQuickData(APIView, ResponseUtilities):

    permission_classes = [IsAuthenticated]
    
    def get(self, request, format=None):
        try:
            self.response_data = AuthUserQuickDataSerializer(instance = request.user).data
            self.success_status = True
        except:
            self.message_to_client = "Something went wrong when fetching the data"
        return Response(self.get_generated_response())
    
class ProfileView(APIView, ResponseUtilities):
    
    permission_classes = [IsAuthenticated]

    def get(self, request, format=None):

        asked_username = request.query_params.get("username")
        print(asked_username)
        try:
            user = User.objects.get(username = asked_username)
            self.response_data = UserProfileSerializer(instance=user).data
            
            # Adding if_owner to True
            # if the requester is the Owner of the profile
            self.response_data["is_owner"] = False
            if request.user == user: 
                self.response_data["is_owner"] = True

            self.success_status = True

        except:
            self.message_to_client = "User didn't found"
        
        return Response(self.get_generated_response())

    
class ProfileViewNonAuthenticated(APIView, ResponseUtilities):
    
    permission_classes = [AllowAny]
    authentication_classes = []

    def get(self, request, format=None):

        asked_username = request.query_params.get("username")
        print(asked_username)
        try:
            user = User.objects.get(username = asked_username)
            self.response_data = UserProfileSerializer(instance=user).data

            # Adding if_owner to False
            self.response_data["is_owner"] = False
            self.success_status = True
            print("returning the data")

        except Exception as e:
            print("returning the data", e)
            self.message_to_client = "User didn't found"
        
        return Response(self.get_generated_response())

