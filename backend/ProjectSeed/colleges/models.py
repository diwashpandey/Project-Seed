from django.db import models
from universities.models import University

from django.contrib.auth import get_user_model # Djagno given function to get the AUTH USER model

# Getting the User from the dajngo given settings
User = get_user_model()

class College(models.Model):

    # Name
    name = models.CharField(max_length=256)

    # Profile Photos
    profile_photo = models.ImageField(default="college_default_profile_photo", upload_to="colleges_profile_photos/", blank=True, null=True)
    background_photo = models.ImageField(default="college_default_background_photo.jpg", upload_to = "colleges_background_photos/", blank=True, null=True)

    #   Location and Country
    location = models.CharField(max_length=200)
    country = models.CharField(max_length=128)

    #   Verifications
    is_verified = models.BooleanField(default=False)

    #           **********************     Relations     **********************     #

    # Users who controls the page
    host = models.ForeignKey(User, on_delete=models.SET_NULL, related_name="hosted_colleges", null=True, blank=True)
    admins = models.ManyToManyField(User, blank=True, related_name="administered_colleges")

    # Foreign key to the University
    university = models.ForeignKey(University, related_name="colleges", on_delete=models.SET_NULL, null=True, blank=True)

    #           ******************     End of Relations     ******************     #

    class Meta:
        ordering = ["name"]

    def __str__(self) -> str:
        return self.name