from django.db import models
from django.contrib.auth import get_user_model # Djagno given function to get the AUTH USER model

# Getting the User from the dajngo given settings
User = get_user_model()
 
# Create your models here.
class CollegeRating(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="rated_colleges")
    college = models.ForeignKey("colleges.College", on_delete=models.CASCADE, related_name="college_ratings")
    rating = models.PositiveIntegerField()
    comment = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        unique_together = ('user', 'college')  # Ensure one rating per user per college
        ordering = ['-created_at']

    def __str__(self):
        return f'{self.user} rated {self.college} as {self.rating}'