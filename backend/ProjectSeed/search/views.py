# Improts from Django
from django.db.models import Q
from django.contrib.auth import get_user_model

#  Importing form rest_framework
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status


# Importing Models
from colleges.models import College
from universities.models import University

# Importing Serailizers
from accounts.serializers import UserSearchBoxProfileCardSerializer
from colleges.serializers import CollegeMiniDataSerializer
from universities.serializers import UniversityMiniDataSerializer

# Additional Imports
from utilities.response.response_utilities import ResponseUtilities

# Getting the User Model with the django provided function
User = get_user_model()

class SearchView(APIView, ResponseUtilities):
    authentication_classes = []

    def get(self, request, format=None):
        query = request.query_params.get('search-for', '')
        self.response_data = {
            'users': [],
            'colleges': [],
            'universities': []
        }
        self.success_status = True

        if not query:
            return Response(self.get_generated_response())

        try:
            users = User.objects.filter(
                Q(full_name__icontains=query) | Q(username__icontains=query)
            ).prefetch_related(
                'collegeconnection_set__college',  # Prefetch related colleges
                'universityconnection_set__university'  # Prefetch related universities
            )[0:3]
            colleges = College.objects.filter(name__icontains=query)[:3]
            universities = University.objects.filter(name__icontains=query)[:3]

            self.response_data['users'] = UserSearchBoxProfileCardSerializer(users, many=True).data
            self.response_data['colleges'] = CollegeMiniDataSerializer(colleges, many=True).data
            self.response_data['universities'] = UniversityMiniDataSerializer(universities, many=True).data

        except Exception as e:
            print(e)
            self.success_status = False
            self.messege_to_client = str(e)
            return Response(self.get_generated_response())

        return Response(self.get_generated_response())