"""

    This is where the post recommendation systems are written.
    This was written by Diwash at 2024 April 18, Thursday

    Ask Diwash if any confusion in the code

    This Comment will be removed later when other people do the bulk update here

"""
# Python built in libraries
from random import shuffle

# Django functions
from django.db.models import Q

# Models
from posts.models import Post
from colleges.models import College
from universities.models import University

# Django function to get USER Model
from django.contrib.auth import get_user_model

# Getting the User Model using the django function
User = get_user_model()

class PostsRecommendation:
    def get_posts_for_user(self, user=None, offset=0, limit=10):
        """
        Get posts for a user, considering user's interests, following, and college/university.
        
        Args:
            user (User, optional): The user for whom to get posts. Defaults to None.
            offset (int, optional): The starting index for pagination. Defaults to 0.
            limit (int, optional): The maximum number of posts to retrieve. Defaults to 10.
        
        Returns:
            QuerySet: A queryset containing the recommended posts.
        """
        if not user.is_authenticated:
            return self.get_random_posts(offset, limit)
        
        # Check if the user has interests or following, if yes, get personalized posts
        if user.skills.exists() or user.following.exists() or user.college or user.university:
            recommended_posts = self.get_personalized_posts(user, offset, limit)
        else:
            recommended_posts = self.get_random_posts(offset, limit)

        return recommended_posts

    def get_personalized_posts(self, user, offset=0, limit=10):
        """
        Get personalized posts based on user's skills, following, and college/university.
        
        Args:
            user (User): The user for whom to get personalized posts.
            offset (int, optional): The starting index for pagination. Defaults to 0.
            limit (int, optional): The maximum number of posts to retrieve. Defaults to 10.
        
        Returns:
            QuerySet: A queryset containing the personalized posts.
        """
        # Find similar users based on user's skills or following
        similar_users = self.find_similar_users(user)
        
        # Get latest posts from similar users and users followed/rised by the user
        recommended_posts = self.get_latest_posts_from_similar_users(similar_users)
        recommended_posts |= self.get_latest_posts_from_following_and_rises(user)
        
        # Include posts from users in the same college or university
        recommended_posts |= self.get_posts_from_same_college_or_university(user, offset, limit)
        
        # Shuffle the posts to add some randomness
        recommended_posts = list(recommended_posts)
        
        return shuffle(recommended_posts[offset:offset+limit])

    def find_similar_users(self, user):
        """
        Find similar users based on user's skills or following.
        
        Args:
            user (User): The user for whom to find similar users.
        
        Returns:
            QuerySet: A queryset containing the similar users.
        """
        similar_users = User.objects.filter(
            Q(skills__in=user.skills.all()) | Q(following__in=user.following.all())
        ).exclude(id=user.id).distinct()
        return similar_users

    def get_latest_posts_from_similar_users(self, similar_users):
        """
        Get the latest posts from similar users.
        
        Args:
            similar_users (QuerySet): Queryset containing similar users.
        
        Returns:
            QuerySet: A queryset containing the latest posts from similar users.
        """
        posts = Post.objects.filter(user__in=similar_users).order_by('-uploaded_date')
        return posts

    def get_latest_posts_from_following_and_rises(self, user):
        """
        Get the latest posts from users followed or posts rised by the user.
        
        Args:
            user (User): The user for whom to get posts.
        
        Returns:
            QuerySet: A queryset containing the latest posts from following and rises.
        """
        following_and_rises = user.following.all() | user.rises.all()
        posts = Post.objects.filter(user__in=following_and_rises).order_by('-uploaded_date')
        return posts

    def get_posts_from_same_college_or_university(self, user, offset=0, limit=10):
        """
        Get the latest posts from users in the same college or university.
        College posts are prioritized over university posts, except when the user doesn't have many following or rises.
        
        Args:
            user (User): The user for whom to get posts.
            offset (int, optional): The starting index for pagination. Defaults to 0.
            limit (int, optional): The maximum number of posts to retrieve. Defaults to 10.
        
        Returns:
            QuerySet: A queryset containing the latest posts from same college or university.
        """
        college = user.college
        university = user.university
        
        if college:
            # Get posts from users in the same college
            users_in_college = User.objects.filter(college=college)
            posts = Post.objects.filter(user__in=users_in_college).order_by('-uploaded_date')
        elif university:
            # Get posts from users in the same university
            colleges_in_university = College.objects.filter(university=university)
            users_in_university = User.objects.filter(college__in=colleges_in_university)
            posts = Post.objects.filter(user__in=users_in_university).order_by('-uploaded_date')
        else:
            # No college or university information available, return empty queryset
            posts = self.get_random_posts(offset, limit)
        
        return posts[offset:offset+limit]

    def get_random_posts(self, offset=0, limit=10):
        """
        Get random posts.
        
        Args:
            offset (int, optional): The starting index for pagination. Defaults to 0.
            limit (int, optional): The maximum number of posts to retrieve. Defaults to 10.
        
        Returns:
            QuerySet: A queryset containing random posts.
        """
        random_posts = Post.objects.order_by('?')[offset:offset+limit]
        return random_posts