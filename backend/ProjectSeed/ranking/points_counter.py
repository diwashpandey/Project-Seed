from django.db.models.functions import Coalesce
from django.db.models import Count, Sum
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
    # Getting the count of rises according to the user's roles
    rises = user.risen_by.aggregate(
            teachers_count= Coalesce(Count("id", filter=Q(profession="t")), 0),
            students_count=Coalesce(Count("id", filter=Q(profession="s")),0),
            professionals_count=Coalesce(Count("id", filter=Q(profession="p")),0),
            investors_count=Coalesce(Count("id", filter=Q(profession="i")),0)
            )
    # Getting the rise for every posts that followed_user has created
    post_rises = user.posts.aggregate(rises_in_post = Coalesce(Count("rises__id"), 0))

    # Calculating points as Rise points calculation method
    points = ((rises["teachers_count"] + rises["professionals_count"] + rises["investors_count"] ) * 5) + (rises["students_count"] * 2) + post_rises["rises_in_post"]
    print(f"Got new RisePoints for '{user.full_name}':'{points}'")
    return points