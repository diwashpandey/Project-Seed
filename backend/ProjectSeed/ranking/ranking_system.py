# Models import
from colleges.models import College
from universities.models import University
from django.contrib.auth import get_user_model
from django.db.models import F

from django.urls import reverse_lazy

User = get_user_model()

class StudentsRankingSystem:
    """
        This is a class designed to fetch top students from either a college, university, or overall:

        Methods:
            get_top_students_from_college (college_name, count)
            get_top_students_from_university (university_name, count)
            get_top_students_from_global (count)

        Returns:
            data (dictionary) or None

        This class automatically sets the message_to_client and success_status attributes.

    """

    def get_top_students_from_college(self, college_name, count=10, *args, **kwargs):
        try:
            college = College.objects.get(name = college_name)
            data = college.college_students.all().order_by("-rise_points")[0:count].values("name", "username", "rise_points")
            self.success_status = True
            return data
        except:
            self.message_to_client = "College doesn't exists"
            return None

    def get_top_students_from_university(self, university_name, count=10, *args, **kwargs):
        try:
            university = University.objects.get(name = university_name)
            data = university.university_students.all().order_by("-rise_points")[0:count].values("name", "username", "rise_points")
            self.success_status = True
            
            return data
        except:
            self.message_to_client = "This university doesn't exists"
            return None
    
    def get_top_students_from_global(self, count=10, *args, **kwargs):
        data = list(User.objects.all().order_by("-rise_points")[0:count].values("full_name", "username", "rise_points"))
        self.success_status = True

        return data