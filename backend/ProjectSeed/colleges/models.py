# Imports from django
from django.db import models
from django.utils.text import slugify
from django.contrib.auth import get_user_model # Djagno given function to get the AUTH USER model

# Models import
from universities.models import University

# Getting the User from the dajngo given settings
User = get_user_model()

class College(models.Model):

    # Details
    name = models.CharField(max_length=256)
    college_identifier = models.SlugField(max_length=255, unique=True, blank=True)
    intro = models.CharField(max_length = 100, null=True, blank=True)
    about_us= models.TextField(max_length=1000, null=True, blank=True)

    # Profile Photos
    profile_photo = models.ImageField(default="college_default_profile_photo.jpg", upload_to="colleges_profile_photos/", blank=True, null=True)
    background_photo = models.ImageField(default="college_default_background_photo.jpg", upload_to = "colleges_background_photos/", blank=True, null=True)

    # Location and Country
    location = models.CharField(max_length=200)
    country = models.CharField(max_length=128)

    # Verifications
    is_verified = models.BooleanField(default=False)

    # Counts and Points
    rise_points = models.IntegerField(default = 0, null=True)
    students_count = models.PositiveIntegerField(default=0, null=True)
    
    # Timestamps
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    # ********************** Relations ********************** #

    # Users who controls the page
    admin = models.ForeignKey(User, on_delete=models.SET_NULL, related_name="administered_colleges", null=True, blank=True)

    # Foreign key to the University
    university = models.ForeignKey(University, related_name="colleges", on_delete=models.SET_NULL, null=True, blank=True)

    # ****************** End of Relations ****************** #

    class Meta:
        ordering = ["name"]

    def save(self, *args, **kwargs):
        if not self.college_identifier:
            self.college_identifier = slugify(self.name)
        super().save(*args, **kwargs)
    
    def __str__(self) -> str:
        return self.name
