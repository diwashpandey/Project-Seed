from django.db import models
from django.contrib.auth import get_user_model # Djagno given function to get the AUTH USER model

# Getting the User from the dajngo given settings
User = get_user_model()

class Post(models.Model):
    
    # Caption of the photo
    caption = models.TextField(max_length = 5000)
    
    # Uploaded date - This will auto add
    uploaded_date = models.DateTimeField(auto_now_add = True)

    # Rises and Comments Count
    rises_count = models.IntegerField(default=0)
    comments_count = models.IntegerField(default=0)
    
    #           **********************     Relations     **********************     #

    # Users who have risen the post
    rises = models.ManyToManyField(User, symmetrical=False, blank = True, related_name="risen_posts")

    # The owner of the post
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name = 'posts')

    # Post photoes - M2M field for future pruffing (feature of multiple photos can be added)
    photos = models.ManyToManyField('PostPhoto', related_name='related_photos')

    #           ******************     End of Relations     ******************     #


    class Meta:
        ordering = ["uploaded_date", "user__username"]

    def __str__(self) -> str:
        return f"{self.user.username} -> {self.caption[:30]}"
        # returns string with username and the post caption


class PostPhoto(models.Model):

    # Photo that is connected to it's parent post
    photo = models.ImageField(upload_to="users_posts/", blank=True, null=True)

    # This will be automatically added
    uploaded_at = models.DateTimeField(auto_now_add=True)


class Comment(models.Model):

    # The comment, user has done
    the_comment = models.TextField(max_length = 5000)


    # This will be automatically added
    uploaded_date = models.DateTimeField(auto_now_add = True)
    
    #           **********************     Relations     **********************     #

    # Owner User of the comment
    user = models.ForeignKey(User, on_delete=models.CASCADE)

    # Relation Key to Parent POST
    post = models.ForeignKey(Post, on_delete=models.CASCADE, related_name="comments")

    #           ******************     End of Relations     ******************     #


    class Meta:
        ordering = ["uploaded_date", "post__user__username"]

    def __str__(self) -> str:
        return f"Post: {self.post.caption[:10]} -> {self.the_comment[:30]}"
        # returns string with the post caption(only first 10 words) and Comment itself(only first 30 words)