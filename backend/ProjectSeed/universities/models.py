from django.db import models
from django.utils.text import slugify
from django.contrib.auth import get_user_model # Djagno given function to get the AUTH USER model

# Getting the User from the dajngo given settings
User = get_user_model()

class University(models.Model):

    # Name
    name = models.CharField(max_length=80)
    university_identifier = models.SlugField(max_length=255, unique=True, blank=True)
    slogan = models.CharField(max_length = 100, null=True, blank=True)
    about_us= models.TextField(max_length=1000, null=True, blank=True)

    # Profile Photos
    profile_photo = models.ImageField(default="university_default_profile_photo", upload_to="universities_profile_photos/", blank=True, null=True)
    background_photo = models.ImageField(default="university_default_background_photo.jpg", upload_to = "universities_background_photos/", blank=True, null=True)

    # Location fields
    city = models.CharField(max_length=50, null=True, blank=True)
    state = models.CharField(max_length=50, null=True, blank=True)
    country = models.CharField(max_length=2, null=True, blank=True) # Store ISO 3166-1 alpha-2 code

    #   Verifications
    is_verified = models.BooleanField(default=False)

    # Timestamps
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    #           **********************     Relations     **********************     #

    # Users who controls the page
    admin = models.ForeignKey(User, on_delete=models.SET_NULL, related_name="administered_universities", null=True, blank=True)

    #           ******************     End of Relations     ******************     #

    class Meta:
        ordering = ["name"]

    def save(self, *args, **kwargs):
        if not self.university_identifier:
            self.university_identifier = slugify(self.name)
        super().save(*args, **kwargs)
    
    def __str__(self) -> str:
        return self.name