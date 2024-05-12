# imports form djagno
from django.db.models.signals import m2m_changed, post_save
from django.dispatch import receiver
from django.db.models import Count

# models import
from . models import Post, Comment

# Builting Signals
@receiver(m2m_changed, sender = Post.rises.through)
def trigger_rise_points_to_posthost_and_save_rises_count(sender, instance, action, reverse, model, pk_set, **kwargs):
    """
    This signal triggers the save() of the
    host to trigger the pre_save signal and update the rise_points of the host

    and finally update the rises_count field of a post

    """
    if action == "post_add" or action == "post_remove":
        #Getting the user of the post that just got rised
        #Getting the id from the pk_set that comes as argument
        post_host = instance.user

        #Saving the user to trigger the points counter function
        post_host.save()


        # Now this is to update the rises_count of a post
        instance.rises_count = Post.objects.filter(id = instance.id).aggregate(rises_count = Count("rises"))["rises_count"]
        instance.save()

@receiver(post_save, sender = Comment)
def update_comments_count_of_post(sender, instance, **kwargs):
    """
    This signal updates the comment count of a post that it's related to.

    """
    post = instance.post

    post.comments_count = Post.objects.filter(id = post.id).aggregate(comments_count = Count("comments"))["comments_count"]
    post.save()