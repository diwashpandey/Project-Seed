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
    Class for fetching top student profiles from a college, university, or globally.
    """
    success_status:bool = False
    message_to_client:str = ""

    def __init__(self, get_from=None, academy_identifier=None, skill=None, count=10):
        """
        Initialize the system with source, academy identifier, skill, and count.
        """
        self.get_from = get_from
        self.academy_identifier = academy_identifier
        self.skill = skill
        self.count = count

    def get_top_profiles(self):
        """
        Fetch top profiles based on the source and skill presence.
        Uses a method dictionary to select the appropriate method.
        Defaults to global profiles if the key is not found.
        """
        method = {
            ("college", True): self.get_profiles_with_skill_from_college,
            ("college", False): self.get_profiles_from_college,
            ("university", True): self.get_profiles_with_skill_from_university,
            ("university", False): self.get_profiles_from_university,
            (None, True): self.get_profiles_with_skill_from_global,
            (None, False): self.get_profiles_from_global,
        }

        key = (self.get_from, self.skill is not None)
        return method.get(key, self.get_profiles_from_global)()

    def get_profiles_from_college(self):
        """
        Fetch top profiles from the specified college.
        """
        try:
            data = User.objects.filter(
                collegeconnection__college__college_identifier=self.academy_identifier,
                collegeconnection__role='s'
            ).order_by("-rise_points")[:self.count]
            return self._check_data(data, "No profiles found for this college.")
        
        except Exception:
            self.message_to_client = "College doesn't exist."
            return None
    

    def get_profiles_from_university(self):
        """
        Fetch top profiles from the specified university.
        """
        try:
            data = User.objects.filter(
                universityconnection__university__university_identifier=self.academy_identifier,
                universityconnection__role='s'
            ).order_by("-rise_points")
            return self._check_data(data, "No profiles found from this university.")
        
        except Exception:
            self.message_to_client = "University doesn't exist."
            return None

    def get_profiles_from_global(self):
        """
        Fetch top profiles globally.
        """
        data = User.objects.all().order_by("-rise_points")[:self.count]
        self.success_status = True # No need to do the _check_data() here cause global profiles surely exists
        return data

    def get_profiles_with_skill_from_college(self):
        """
        Fetch top profiles from the specified college with a specific skill.
        """
        try:
            data = User.objects.filter(
                collegeconnection__college__college_identifier=self.academy_identifier,
                collegeconnection__role='s',
                skills__name__icontains=self.skill
            ).order_by("-rise_points")[:self.count]
            return self._check_data(data, "No profiles found with this skill for the college.")
        
        except Exception:
            self.message_to_client = "College doesn't exist."
            return None

    def get_profiles_with_skill_from_university(self):
        """
        Fetch top profiles from the specified university with a specific skill.
        """
        try:
            data = User.objects.filter(
                universityconnection__university__university_identifier=self.academy_identifier,
                universityconnection__role='s',
                skills__name__icontains=self.skill
            ).order_by("-rise_points")[:self.count]
            return self._check_data(data, "No profiles found with this skill for the university.")
        
        except Exception:
            self.message_to_client = "University doesn't exist."
            return None
        
    def get_profiles_with_skill_from_global(self):
        """
        Fetch top profiles globally with a specific skill.
        """
        try:
            data = User.objects.filter(
                collegeconnection__role='s',
                skills__name__icontains=self.skill
            ).order_by("-rise_points")[:self.count]
            return self._check_data(data, "No profiles found with this skill.")
        
        except Exception:
            self.message_to_client = "No profiles found with this skill."
            return None

    def _check_data(self, data, error_message):
        """
        Check if the data exists and set the appropriate message.
        """
        if data.exists():
            self.success_status = True
            return data
        self.message_to_client = error_message
        return None

        
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

    message_to_client:str = ""

    def get_top_posts_from_college(self, college_name, count=10, *args, **kwargs):

        try:
            college = College.objects.get(name = college_name)
            data = Post.objects.filter(user__colleges = college).order_by("-rises_count")[0:count]
            return data

        except:
            self.message_to_client = "College doesn't exists"
            return None

    def get_top_posts_from_university(self, university_name, count=10, *args, **kwargs):

        try:
            university = University.objects.get(name = university_name)
            data = Post.objects.filter(user__universities = university).order_by("-rises_count")[0:count]
            return data

        except:
            self.message_to_client = "This university doesn't exists"
            return None
    
    def get_top_posts_from_global(self, count=10, *args, **kwargs):

        data = list(Post.objects.all().order_by("-rises_count")[0:count])
        return data