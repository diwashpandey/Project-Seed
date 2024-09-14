from django.db import models
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
    
    class Profession(models.TextChoices):
        STUDENT = 's', 'Student'
        TEACHER = 't', 'Teacher'
        PROFESSIONAL = 'p', 'Professional'
        INVESTOR = 'i', 'Investor'

    class Gender(models.TextChoices):
        MALE = 'm', 'Male'
        FEMALE = 'f', 'Female'
        OTHER = 'o', 'Other'

    # User Logins
    email = models.EmailField(unique=True, null=False, blank=False)
    username = models.CharField(max_length=25, unique=True, null=False, blank=False)
    password = models.CharField(null=False, blank=False, max_length=500)

    # User Details
    full_name = models.CharField(max_length=50)  # This should be the automatic field while registering or updating the name
    first_name = models.CharField(max_length=25)
    last_name = models.CharField(max_length=25)
    age = models.PositiveIntegerField(null=True, blank=True)
    intro = models.CharField(max_length=100, null=True, blank=True)
    about_me = models.TextField(max_length=1000, null=True, blank=True)
    gender = models.CharField(max_length=1, choices=Gender.choices)
    
    # Profile Photos
    profile_photo = models.ImageField(default="default_profile_photo.jpg", upload_to="users_profile_photos/")
    background_photo = models.ImageField(default="default_background_photo.jpg", upload_to="users_background_photos/")

    # Profession
    profession = models.CharField(max_length=1, choices=Profession.choices, default=Profession.STUDENT)

    # Verifications
    is_verified = models.BooleanField(default=False)
    is_email_verified = models.BooleanField(default=False)

    # Counts and Points
    following_count = models.PositiveIntegerField(default=0, null=True)
    followers_count = models.PositiveIntegerField(default=0, null=True)  # All these fields should be handled by Signals
    rise_points = models.PositiveIntegerField(default=0, null=True)

    # Location fields
    city = models.CharField(max_length=50, null=True, blank=True)
    state = models.CharField(max_length=50, null=True, blank=True)
    country = models.CharField(max_length=2, null=True, blank=True) # Store ISO 3166-1 alpha-2 code

    # Social Media URLs
    github = models.URLField(null=True, blank=True)
    linkedin = models.URLField(null=True, blank=True)
    instagram = models.URLField(null=True, blank=True)

    # Relations
    # Qualifications
    colleges = models.ManyToManyField("colleges.College", through="CollegeConnection", related_name="college_members")
    universities = models.ManyToManyField("universities.University", through="UniversityConnection", related_name="university_members")

    # Skills and Interests
    skills = models.ManyToManyField('Skill', blank=True, related_name='users')
    interests = models.ManyToManyField('Interest', blank=True, related_name='users')

    # Follow and Rise
    following = models.ManyToManyField("self", symmetrical=False, related_name="followers", blank=True)
    rises = models.ManyToManyField("self", symmetrical=False, related_name="risen_by", blank=True)

    # Settings
    EMAIL_FIELD = "email"
    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["username"]

    # Meta
    class Meta:
        ordering = ["full_name"]

    # Default profile photo handler
    def remove_profile_photo(self):
        self.profile_photo = "default_profile_photo.jpg"
        self.save()


class CollegeConnection(models.Model):
    class Role(models.TextChoices):
        TEACHER = 't', 'Teacher'
        STUDENT = 's', 'Student'
        MANAGEMENT = 'm', "Management"
    
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    college = models.ForeignKey("colleges.College", on_delete=models.CASCADE)
    
    role = models.CharField(max_length=1, choices=Role.choices)  # Choices for role
    verified_by_college = models.BooleanField(default=False)  # Whether verified by college or not
    
    class Meta:
        unique_together = ['user', 'college']

    def __str__(self):
        return f"{self.user.full_name} - {self.college.name} ({self.get_role_display()})"

class UniversityConnection(models.Model):
    class Role(models.TextChoices):
        TEACHER = 't', 'Teacher'
        STUDENT = 's', 'Student'
        MANAGEMENT = 'm', "Management"
    
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    university = models.ForeignKey("universities.University", on_delete=models.CASCADE)
    
    role = models.CharField(max_length=1, choices=Role.choices)  # Choices for role
    verified_by_university = models.BooleanField(default=False)  # Whether verified by university or not
    
    class Meta:
        unique_together = ['user', 'university']

    def __str__(self):
        return f"{self.user.full_name} - {self.university.name} ({self.get_role_display()})"

class Skill(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name


class Interest(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name
