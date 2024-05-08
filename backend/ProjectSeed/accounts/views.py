# imports from django_rest_framework
from rest_framework.views import APIView
from rest_framework.response import Response

# imports from rest_framework_simplejwt
from rest_framework_simplejwt.tokens import RefreshToken

# imports from django
from django.contrib.auth import authenticate
from django.urls import reverse_lazy
from django.contrib.auth import get_user_model

# Getting the user model using the django provided function
User = get_user_model()

# Custom Class for creating user account
from . registration import CustomUserRegistration

# Custom function to get the JWT tokens for the user
def get_tokens_for_user(user):
    refresh = RefreshToken.for_user(user)

    return {
        'refresh': str(refresh),
        'access': str(refresh.access_token),
    }

class RegisterUser(APIView, CustomUserRegistration):

    def post(self, request, format=None):
        data = request.data

        created_user = self.register_user_if_valid(registration_data=data)  # this returns user if created else None
        
        return Response({
                "success_status":self.success_status, # set by CustomUserRegistration automatically
                "message":self.message_to_client # set by CustomUserRegistration automatically
            })

class LoginUser(APIView):
    
    # These will be sent to client as a JsonResponse
    success_status = False  # This will be true if authentication is success
    message_to_client = None  # This will be sent as a success/error message
    redirect_url = None  # This will be sent for redirecting client to homepage
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

        return Response({
                "success_status":self.success_status,
                "message":self.message_to_client,
                "redirect_url": self.redirect_url,  # Client side will use this to go to homepage
                "tokens":self.tokens
                })