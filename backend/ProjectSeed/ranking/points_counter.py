from django.db.models.functions import Coalesce
from django.db.models import Count
from django.db.models import Q

def get_risepoints_of_user(user):
    """
    This function computes the rise points for a given user
     and return the point at the last

    Rise points calculation method:
        - Rise by a teacher: 5 points per rise
        - Rise by a students: 2 points per rise
        - Rise in posts: 1 point per rise
    """

    # Using 👉Coalesce👈 for if value is null 👇
    # Getting the count of rises by teacher and friends
    rises = user.rises.aggregate(
            teachers_count= Coalesce(Count("id", filter=Q(is_teacher=True)), 0),friends_count=Coalesce(Count("id", filter=Q(is_teacher=False)),0)
            )
        
    # Getting the rise for every posts that followed_user has created
    post_rises = user.posts.aggregate(rises_in_post = Coalesce(Count("rises__id"), 0))

    # Calculating points as Rise points calculation method
    points = (rises["teachers_count"] * 5) + (rises["friends_count"] * 2) + post_rises["rises_in_post"]
    print("got the point", points, "of user", user)
    return points