# Imports from django
from django.contrib.auth import get_user_model
from django.db.models import Q
from django.shortcuts import get_object_or_404

# Imports from RestFramework -> DRF
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response

# Additional Imports
from utilities.response.response_utilities import ResponseUtilities

# Importing Serializers
from .serializers import CollegeDetailSerializer
from accounts.serializers import UserProfileCardSerializer

# Models Imports
from .models import College

# Getting the user model with django provided settings
User = get_user_model()

# Create your views here.
class RegisterCollege(APIView, ResponseUtilities):
    permission_classes = [IsAuthenticated]

    def post(self, request, format=None):
        pass



class CollegeProfileView(APIView, ResponseUtilities):
    permission_classes = [IsAuthenticated]
    
    def get(self, request, format=None):
        # Retrieve the college identifier from query parameters
        college_identifier = request.query_params.get('college_identifier', None)
        print("Auth view ma xu haiii auth maaa", college_identifier)

        # Check if college identifier is provided
        if not college_identifier:
            self.message_to_client = "College ID is required."
            return Response(self.get_generated_response())

        try:
            # Attempt to retrieve the college instance using the provided identifier
            college = College.objects.get(college_identifier=college_identifier)
            serialized_data = CollegeDetailSerializer(instance=college).data

            serialized_data["is_admin"] = college.admin == request.user
            serialized_data["is_management_team"] = college.collegeconnection_set.filter(user=request.user, role="m").exists()

            # Assign serialized data to the response
            self.response_data = serialized_data
            self.success_status = True
            self.message_to_client = "College details retrieved successfully."

        except College.DoesNotExist:
            # Handle case where college is not found
            self.message_to_client = "College not found."

        # Return the generated response with the appropriate message and data
        return Response(self.get_generated_response())

class CollegeProfileNonAuthenticatedView(APIView, ResponseUtilities):

    permission_classes = [ AllowAny ]
    authentication_classes = []
    
    def get(self, request, format=None):
        # Retrieve the college identifier from query parameters
        college_identifier = request.query_params.get('college_identifier', None)
        print("I'm in college non auth view to get for:", college_identifier)

        # Check if college identifier is provided
        if not college_identifier:
            self.message_to_client = "College ID is required."
            return Response(self.get_generated_response())

        try:
            # Attempt to retrieve the college instance using the provided identifier
            college = College.objects.get(college_identifier=college_identifier)
            serialized_data = CollegeDetailSerializer(instance=college).data

            # Set default values for `is_admin` and `is_management_team`
            serialized_data["is_admin"] = False
            serialized_data["is_management_team"] = False

            # Assign serialized data to the response
            self.response_data = serialized_data
            self.success_status = True
            self.message_to_client = "College details retrieved successfully."

        except College.DoesNotExist:
            # Handle case where college is not found
            self.message_to_client = "College not found."

        # Return the generated response with the appropriate message and data
        return Response(self.get_generated_response())


class GetCollegeStudentsView(APIView, ResponseUtilities):
    """
    This view fetches students of a college based on the requested pagination parameters.
    """

    authentication_classes = []
    college = None  # This will hold the current college object being processed

    def get(self, request, *args, **kwargs):
        """
        Handles GET requests to fetch students of a college.

        Request parameters:
        - college_identifier: The unique ID or identifier for the college.
        - start: (Optional) The index to start fetching students from, for pagination.
        - count: (Optional) The number of students to fetch, for pagination.

        Returns a JSON response with student data or an error message if the college is not found.
        """

        college_identifier = request.query_params.get('college_identifier')
        if not college_identifier:
            self.message_to_client = "College identifier is required"
            return Response(self.get_generated_response())

        try:
            self.college = College.objects.get(college_identifier=college_identifier)
        except College.DoesNotExist:
            self.message_to_client = "College not found"
            return Response(self.get_generated_response())

        start_index = int(request.query_params.get('start', 0))
        count = int(request.query_params.get('count', 25))

        if self.college.students_count == 0:
            self.response_data = {
                "students": None,
                "has_more": False,
                "has_students": False
            }
            self.message_to_client = "No students found in this college."
            return Response(self.get_generated_response())

        # Fetch students with pagination
        students = self.get_students(start_index, count)
        serialized_data = UserProfileCardSerializer(students, many=True).data
        self.response_data = {
            "students": serialized_data,
            "has_more": students.count() > start_index + count,
            "has_students": True
        }
        self.message_to_client = "Students fetched successfully."
        self.success_status = True

        return Response(self.get_generated_response())

    def get_students(self, start_index, count):
        """
        Fetches students with pagination for the college.

        Parameters:
        - start_index: The index to start fetching students from.
        - count: The number of students to fetch.

        Returns:
        - QuerySet of students associated with the college, sliced for pagination.
        """
        return User.objects.filter(
            collegeconnection__college=self.college, 
            collegeconnection__role="s"
        )[start_index:start_index + count]
    

class GetCollegeMembersView(APIView, ResponseUtilities):
    """
    This view fetches teachers, admin, and management team members of a college.
    """

    authentication_classes = []
    college = None

    def get(self, request, *args, **kwargs):
        """
        Handles GET requests to fetch teachers, admin, and management team members of a college.

        Request parameters:
        - college_identifier: The unique ID or identifier for the college.

        Returns a JSON response with teachers, admin, and management team data or an error message if the college is not found.
        """

        college_identifier = request.query_params.get('college_identifier')
        if not college_identifier:
            self.message_to_client = "College identifier is required."
            return Response(self.get_generated_response())

        try:
            self.college = College.objects.get(college_identifier=college_identifier)
        except College.DoesNotExist:
            self.message_to_client = "College not found."
            return Response(self.get_generated_response())

        # Fetch teacher-related members
        teacher_data = self.get_teacher_related_members()
        self.response_data = {
            "teachers": teacher_data.get("teachers"),
            "admin": teacher_data.get("admin"),
            "management_team": teacher_data.get("management_team"),
            "has_members": any(teacher_data.values())  # Check if there are any members in the data
        }
        self.message_to_client = "Teachers, admin, and management team fetched successfully."
        self.success_status = True

        return Response(self.get_generated_response())

    def get_teacher_related_members(self):
        """
        Fetches teachers, admin, and management team members for the college with pagination applied.

        Optimization:
        - This method uses a single query to fetch all required members (teachers, admin, and management team).
        - By filtering on the role directly in the `collegeconnection` model, it optimizes query performance.
        """

        # Fetch all relevant members in a single query
        admin = self.college.admin

        members = User.objects.filter(
            Q(collegeconnection__college=self.college, collegeconnection__role="t") |  # teachers
            Q(pk=admin.pk if admin else None) |  # Admin
            Q(collegeconnection__college=self.college, collegeconnection__role="m")  # Management team
        )

        # Separate the members into categories
        teachers = members.filter(collegeconnection__role="t")
        admin = members.filter(pk=admin.pk if admin else None)
        management_team = members.filter(collegeconnection__role="m")

        # Return the serialized data for each group
        return {
            "teachers": UserProfileCardSerializer(teachers, many=True).data,
            "admin": UserProfileCardSerializer(admin, many=True).data,
            "management_team": UserProfileCardSerializer(management_team, many=True).data
        }
