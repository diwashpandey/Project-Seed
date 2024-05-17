# imports from djagno
from django.db.models import F
from django.contrib.auth import get_user_model
from django.urls import reverse_lazy

# Models import
from colleges.models import College
from universities.models import University
from posts.models import Post

# Getting the user model with django provided settings
User = get_user_model()

class ProfileRankingSystem:
    """
        This is a class designed to fetch top students from either a college, university, or overall:

        Methods:
            get_top_students_from_college (college_name, count)
            get_top_students_from_university (university_name, count)
            get_top_students_from_global (count)

        Returns:
            data (dictionary) or None

        This class has the message_to_client and success_status attributes too,
        You can use them to send to the client
    """

    success_status:bool = False
    message_to_client:str = ""

    def get_top_profiles_from_college(self, college_name, count=10, *args, **kwargs):

        try:
            college = College.objects.get(name = college_name)
            data = college.college_students.all().order_by("-rise_points")[0:count]
            self.success_status = True
            return data

        except:
            self.message_to_client = "College doesn't exists"
            return None

    def get_top_profiles_from_university(self, university_name, count=10, *args, **kwargs):

        try:
            university = University.objects.get(name = university_name)
            data = university.university_students.all().order_by("-rise_points")[0:count]
            self.success_status = True
            return data

        except:
            self.message_to_client = "This university doesn't exists"
            return None
    
    def get_top_profiles_from_global(self, count=10, *args, **kwargs):

        data = User.objects.all().order_by("-rise_points")[0:count]
        self.success_status = True
        return data


class PostRankingSystem:
    """
        This is a class designed to fetch top students from either a college, university, or overall:

        Methods:
            get_top_students_from_college (college_name, count)
            get_top_students_from_university (university_name, count)
            get_top_students_from_global (count)

        Returns:
            data (dictionary) or None

        This class has the message_to_client and success_status attributes too,
        You can use them to send to the client
    """

    success_status:bool = False
    message_to_client:str = ""

    def get_top_posts_from_college(self, college_name, count=10, *args, **kwargs):

        try:
            college = College.objects.get(name = college_name)
            data = Post.objects.filter(user__colleges = college).order_by("-rises_count")[0:count]
            self.success_status = True
            return data

        except:
            self.message_to_client = "College doesn't exists"
            return None

    def get_top_posts_from_university(self, university_name, count=10, *args, **kwargs):

        try:
            university = University.objects.get(name = university_name)
            data = Post.objects.filter(user__universities = university).order_by("-rises_count")[0:count]
            self.success_status = True
            return data

        except:
            self.message_to_client = "This university doesn't exists"
            return None
    
    def get_top_posts_from_global(self, count=10, *args, **kwargs):

        data = list(Post.objects.all().order_by("-rises_count")[0:count])
        self.success_status = True
        return data