from rest_framework.views import APIView
from rest_framework.response import Response

# Django built-in module to get the AUTH User
from django.contrib.auth import get_user_model

# Getting the user model using the django provided function
User = get_user_model()

# importing serializers
# from . serializers import UserRegisterationSerializer

# importing json for JSON works
import json

# Custom Class for creating user account
from . registration import CustomUserRegistration

class RegisterUser(APIView, CustomUserRegistration):

    def post(self, request):
        data = request.data

        created_user = self.register_user_if_valid(registration_data=data)  # this returns user if created else None

        return Response({
                "success":self.success, # set by CustomUserRegistration automatically
                "message":self.message_to_client # set by CustomUserRegistration automatically
            })