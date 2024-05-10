# django imports
from django.contrib.auth import get_user_model, authenticate

# rest_framework imports
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny
from rest_framework.response import Response

# rest_framework_simplejwt imports
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework_simplejwt.tokens import RefreshToken

# imports from APPS
from utilities.response.response_utilities import ResponseUtilities
from . registration import CustomUserRegistration

# MODELS import

# Serializes imports



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