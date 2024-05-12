# imports from django
from django.dispatch import receiver
from django.db.models.signals import pre_save, m2m_changed
from django.db.models import Count

# Models import
from . models import User

# imports from APPS
from ranking.points_counter import get_risepoints_of_user

@receiver(m2m_changed, sender = User.rise.through)
def rise_counter(sender, instance, action, reverse, model, pk_set, **kwargs):
    """
    This signal updates the rise points of another user, whom the current user (Sender Model) has just rised.

    """
    if action == "post_add" or action == "post_remove":
        #Getting the user that has just got followed
        #Getting the id from the pk_set that comes as argument
        raised_user = User.objects.get(pk=list(pk_set)[0])

        #Saving the user to trigger the points counter function
        print("here to trigger for", raised_user)
        raised_user.save()

@receiver(m2m_changed, sender = User.following.through)
def users_followers_and_following_counts_updater(sender, instance, action, reverse, model, pk_set, **kwargs):
    """ 
        This will updates the followers_count of a user who just got followed
        and updates the following_count of a user who commited follow

        Uses:
            * Important *
            1. pk_set(set) : pk_set is a set-type which has a pk of user model which just got followed

            2. instance: This the the instance of the user who just committed following

        Process:
            - Get the id of user_to_commit from pk_set
            - Get the user_model from the DATABASE
            - Use aggregation(Count()) in the following field and store the data in followers_count and save()

            - Since we don't need to get it from DATABASE we directlly use the aggregate function and
             Count() the following feild and store it and then save()
    """

    if action == "post_add" or action == "post_remove":
        
        # Working with the user who got followed
        id_of_user_to_commit = list(pk_set)[0] # Here is the id of the model
        user_to_commit = User.objects.get(id = id_of_user_to_commit)
        user_to_commit.followers_count = user_to_commit.followers.aggregate(new_followers_count = Count("id"))["new_followers_count"]
        user_to_commit.save()

        # Working with the user who committed
        instance.following_count = instance.following.aggregate(new_following_count = Count("id"))["new_following_count"]
        instance.save()

        print("following_count of user", instance.following_count)


@receiver(pre_save, sender = User)
def rise_points_setter(sender, instance, **kwargs):
    """
    Functionality:

    - Gets the rise point from the get_risepoints_of_user() and updates the rise_points feild of a saved user

    external functions used:
        get_risepoints_of_user() = For getting the rise point of a user
    """

    # Disclaimer:
    # instance.pk is added to confirm if user is not getting newly created
    # Confirming ManytoManyRelation cause it may rises error if the user is just getting created
    if instance.pk:
        # Getting the risepoints using the custom counter function
        instance.rise_points = get_risepoints_of_user(user = instance)