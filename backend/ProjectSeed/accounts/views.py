# imports from django_rest_framework
from rest_framework.views import APIView
from rest_framework.response import Response

# imports from rest_framework_simplejwt
from rest_framework_simplejwt.tokens import RefreshToken

# imports from django
from django.contrib.auth import authenticate
from django.urls import reverse_lazy
from django.contrib.auth import get_user_model

# imports from serializers
from . serializers import (
    UserPasswordChangeSerializer
)

# Getting the user model using the django provided function
User = get_user_model()

# Custom modules
from . registration import CustomUserRegistration
from custom_utilities.response.response_utilities import ResponseUtilities

# Custom function to get the JWT tokens for the user
def get_tokens_for_user(user):
    refresh = RefreshToken.for_user(user)

    return {
        'refresh': str(refresh),
        'access': str(refresh.access_token),
    }

class RegisterUser(APIView, CustomUserRegistration, ResponseUtilities):

    def post(self, request, format=None):
        data = request.data

        created_user = self.register_user_if_valid(registration_data=data)  # this returns user if created else None
        
        return Response(self.get_generated_response())

class LoginUser(APIView, ResponseUtilities):

    tokens = None

    def post(self, request, format=None):
        email = request.data.get("email")
        password = request.data.get("password")

        user = authenticate(request, username=email, password=password)

        if user is not None:
            self.tokens = get_tokens_for_user(user=user)            

            self.success_status = True
            self.message_to_client = "You have been logged in"
            self.redirect_url = reverse_lazy("home:homepage")
        else:
            self.message_to_client = "Invalid email or password. Please try again."

        return Response(self.get_generated_response())
    
    def get_generated_response(self):
        """
        Overrides the base class method to add tokens in the response.

        :return: generated response including tokens
        """
        response_to_return = super().get_generated_response()

        response_to_return["tokens"] = self.tokens # Adding the tokens to the response

        return response_to_return
    
class ChangePasswordView(APIView, ResponseUtilities):

    def post(self, request, format=None):

        data = request.data
        serialized_data = UserPasswordChangeSerializer(data = data)

        if serialized_data.is_valid():
            user = request.user

            user.set_password(serialized_data.data.get("new_password"))
            user.save()

            self.success_status = True
            self.message_to_client = "You have been logged in successfully"

        return Response(self.get_generated_response())

