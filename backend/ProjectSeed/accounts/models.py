from django.db import models
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
    
    # User Logins
    email = models.EmailField(unique=True, null=False, blank=False)
    username = models.CharField(max_length=25, unique=True, null=False, blank=False)
    password = models.CharField(null=False, blank=False, max_length=500)

    # User Details
    full_name = models.CharField(max_length=50) # This should be the automatic field while registering or updating the name
    first_name = models.CharField(max_length=25)
    last_name = models.CharField(max_length=25)
    age = models.IntegerField(null=True, blank=True)
    gender = models.CharField(max_length=10)
    intro = models.CharField(max_length = 100, null=True, blank=True)
    about_me= models.TextField(max_length=1000, null=True, blank=True)
    
    # Profile_Photos
    profile_photo = models.ImageField(default="default_profile_photo.jpg", upload_to = "users_profile_photos/")
    background_photo = models.ImageField(default="default_background_photo.jpg", upload_to = "users_background_photos/")

    # This field is later to be decided
    #year = models.IntegerField(null = True, blank= True)

    # Role Verification
    is_teacher = models.BooleanField(default=False)

    # Verifications
    is_verified = models.BooleanField(default=False)
    is_email_verified = models.BooleanField(default=False)

    # Counts and Points
    following_count = models.IntegerField(default = 0, null=True)
    followers_count = models.IntegerField(default = 0, null=True) # All These 3 fields should be handled by the Signals
    rise_points = models.IntegerField(default = 0, null=True)

    # Social Media urls
    github = models.URLField(null=True, blank=True)
    linkedin = models.URLField(null=True, blank=True)
    instagram = models.URLField(null=True, blank=True)

    #           **********************     Relations     **********************     #

    # Qualifications
    colleges = models.ManyToManyField("colleges.College", blank=True, related_name="college_students")
    universities = models.ManyToManyField("universities.University", blank=True, related_name="university_students")

    # Skills and interests
    skills = models.ManyToManyField('Skill', blank=True,  related_name='users')
    interests = models.ManyToManyField('Interest', blank=True,  related_name='users')

    # Follow and Rise
    following = models.ManyToManyField("self", symmetrical=False, related_name="followers", blank=True)
    rises = models.ManyToManyField("self", symmetrical=False, related_name="risen_by", blank=True)
    
    #           ******************     End of Relations     ******************     #

    # Settings
    EMAIL_FIELD = "email"
    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["username"]
    
    #Meta stuffs
    class Meta:
        ordering = ["full_name"]

    # This will setup the default profile_photo when user deletes his/her profile_photo
    def remove_profile_photo(self):
        self.profile_photo = "default_profile_photo.jpg"
        self.save()



# User has the M2M relation along with the related_name to this
class Skill(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name



# User has the M2M relation along with the related_name to this
class Interest(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name