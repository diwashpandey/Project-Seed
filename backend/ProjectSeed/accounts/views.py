# django imports
from django.contrib.auth import get_user_model, authenticate

# rest_framework imports
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

# rest_framework_simplejwt imports
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework_simplejwt.tokens import RefreshToken

# imports from APPS
from utilities.response.response_utilities import ResponseUtilities
from . registration import CustomUserRegistration
from ranking.points_counter import get_risepoints_of_user

# MODELS import

# Serializes imports
from .serializers import (UserProfileDataSerializer, UserProfileCardSerializer)
from .profile_update_serializers import (NameUpdateSerializer)


# Getting the user model with django provided settings
User = get_user_model()

class LoginView(APIView, ResponseUtilities):

    permission_classes = [AllowAny]
    
    def post(self, request, format=None):
        
        email = request.data.get("email")
        password = request.data.get("password")

        user = authenticate(request, username = email, password = password)

        if user:
            refresh = RefreshToken.for_user(user)

            self.success_status = True
            self.message_to_client = "logged in successfully"
            self.response_data = {
                    'refresh': str(refresh),
                    'access': str(refresh.access_token),
                }
        else:
            self.message_to_client = "username or password was not matched !"

        return Response(self.get_generated_response())


class RegisterView(APIView, ResponseUtilities, CustomUserRegistration):
    
    def post(self, request, format=None):
        user = self.register_user_if_valid(request.data)
        print(self.get_generated_response())

        return Response(self.get_generated_response())


class UsernameAvailabilityService(APIView, ResponseUtilities):

    permission_classes = [AllowAny]
    authentication_classes = []

    def post(self, request, format=None):

        asked_for_username = request.data.get("asked_for_username", None)

        # Check if username is provided
        if not asked_for_username:
            self.message_to_client = "Username must be provided"
            return Response(self.get_generated_response())

        user_exists_or_not = User.objects.filter(username = asked_for_username).exists()

        self.response_data = {"exists_or_not":user_exists_or_not}
        self.success_status = True

        return Response(self.get_generated_response())


class EmailAvailabilityService(APIView, ResponseUtilities):

    permission_classes = [AllowAny]
    authentication_classes = []

    def post(self, request, format=None):
        asked_for_email = request.data.get("asked_for_email", None)

        # Check if username is provided
        if not asked_for_email:
            self.message_to_client = "Username must be provided"
            return Response(self.get_generated_response())

        user_exists_or_not = User.objects.filter(email = asked_for_email).exists()

        self.response_data = {"exists_or_not":user_exists_or_not}
        self.success_status = True

        return Response(self.get_generated_response())


class AuthUserQuickData(APIView, ResponseUtilities):

    permission_classes = [IsAuthenticated]
    
    def get(self, request, format=None):
        try:
            self.response_data = UserProfileDataSerializer(instance = request.user).data
            self.success_status = True
        except:
            self.message_to_client = "Something went wrong when fetching the data"
        
        return Response(self.get_generated_response())


class ProfileView(APIView, ResponseUtilities):
    
    permission_classes = [IsAuthenticated]

    def get(self, request, format=None):

        asked_username = request.query_params.get("username")
        try:
            user = User.objects.get(username = asked_username)
            requested_user = request.user
            self.response_data = UserProfileDataSerializer(instance=user).data
            # Adding if_owner to True
            # if the requester is the Owner of the profile
            self.response_data.update({
                            "is_owner": requested_user == user,
                            "already_risen": user in requested_user.rises.all(),
                            "already_followed": user in requested_user.following.all(),
                        })
            
            self.success_status = True

        except :
            self.message_to_client = "User didn't found"
        
        return Response(self.get_generated_response())

    
class ProfileViewNonAuthenticated(APIView, ResponseUtilities):
    
    permission_classes = [AllowAny]
    authentication_classes = []

    def get(self, request, format=None):

        asked_username = request.query_params.get("username")
        try:
            user = User.objects.get(username = asked_username)
            self.response_data = UserProfileDataSerializer(instance=user).data

            # Adding if_owner to False
            self.response_data["is_owner"] = False
            self.success_status = True

        except Exception as e:
            self.message_to_client = "User didn't found"
        
        return Response(self.get_generated_response())


class ProfileDowntownView(APIView, ResponseUtilities):

    def get(self, request, format=None):

        asked_username = request.query_params.get("username")
        section = request.query_params.get("section")
        try:
            user = User.objects.get(username = asked_username)

            profiles = None
            if section == "followers":
                profiles = user.followers.all()
            elif section == "following":
                profiles = user.following.all()
            elif section == "rises":
                profiles = user.rises.all()
            elif section == "risenBy":
                profiles = user.risen_by.all()
            else:
                raise Exception("Profile Downtown request without SECTION")

            self.response_data = UserProfileCardSerializer(instance=profiles, many=True).data

            self.success_status = True

        except Exception as e:
            self.message_to_client = "User didn't found"
        
        return Response(self.get_generated_response())


class ProfileDowntownNonAuthenticatedView(APIView, ResponseUtilities):
    
    permission_classes = [AllowAny]
    authentication_classes = []

    def get(self, request, format=None):
        asked_username = request.query_params.get("username")
        section = request.query_params.get("section")

        try:
            user = User.objects.get(username = asked_username)

            profiles = None
            if section == "followers":
                profiles = user.followers.all()
            elif section == "following":
                profiles = user.following.all()
            elif section == "rises":
                profiles = user.rises.all()
            elif section == "risenBy":
                profiles = user.risen_by.all()
            else:
                raise Exception("Profile Downtown request without SECTION")

            self.response_data = UserProfileCardSerializer(instance=profiles, many=True).data
            self.success_status = True

        except Exception as e:
            self.message_to_client = "User didn't found"

        return Response(self.get_generated_response())


class RiseHandlerView(APIView, ResponseUtilities):

    permission_classes=[IsAuthenticated]

    def post(self, request):

        try:
            commit = request.data.get("commit")
            user_to_rise = User.objects.get(username =  request.data.get("username"))
            user_who_risen = request.user

            if commit == "rise":
                user_who_risen.rises.add(user_to_rise)
            elif commit == "unrise":
                user_who_risen.rises.remove(user_to_rise)
            else:
                raise Exception("Not valid commit")
            """
            Disclaimer:
                Signal will count rise points too.
                But it was not working properly, I don't know why.
                Might be cause of it's asynchronous or something like that

                So counting again here to deliver the new followers count of user
            """
            self.response_data = {
                "new_rise_points":get_risepoints_of_user(user_to_rise)
            }
            self.success_status = True

        except:
            print("Got error when trying to handle the rise/unrise request !")

        return Response(self.get_generated_response())
    
class FollowHandlerView(APIView, ResponseUtilities):

    permission_classes=[IsAuthenticated]

    def post(self, request):

        commit = request.data.get("commit")
        print("Request here in follow:", request.data.get("username"))
        print("Request here in follow:", request.data.get("commit"))

        try:
            user_to_follow = User.objects.get(username =  request.data.get("username"))
            user_who_followed = request.user

            if commit == "follow":
                user_who_followed.following.add(user_to_follow)
            elif commit == "unfollow":
                user_who_followed.following.remove(user_to_follow)
            else:
                raise Exception("Not valid commit")
            """
            Disclaimer:
                Signal will count rise points too.
                But it was not working properly, I don't know why.
                Might be cause of it's asynchronous or something like that

                So counting again here to deliver the new followers count of user
            """
            self.response_data = {
                "new_followers_count":user_to_follow.followers.count()
            }
            self.success_status = True

        except:
            print("Got error when trying to handle the follow/unfollow request !")

        return Response(self.get_generated_response())
    

class FirstAndLastNameUpdater(APIView, ResponseUtilities):

    permission_classes = [IsAuthenticated]

    def post(self, request, format=None):
        new_first_name = request.data.get("new_first_name", None)
        new_last_name = request.data.get("new_last_name", None)    
        new_full_name = new_first_name + " " + new_last_name 
        user = request.user
        data = {"first_name":new_first_name,
                "last_name":new_last_name,
                "full_name": new_full_name}

        serialized_data = NameUpdateSerializer(data = data)
        
        if serialized_data.is_valid():
            user.first_name = new_first_name
            user.last_name = new_last_name
            user.full_name = new_full_name
            user.save()
            self.success_status = True
            self.message_to_client = "Your name was updated successfully"

        else:
            print("First and Last Name Found Invalid")
            self.message_to_client = "Your request was unsucessfull"
        
        return(Response(self.get_generated_response()))
    
      
class IntroUpdater(APIView, ResponseUtilities):

    permission_classes = [IsAuthenticated]


    def post(self, request, format=None):
        new_intro = request.data.get("new_intro", None)    
        user = request.user

        if (len(new_intro)>99):
            self.message_to_client = "Max character limit is 100"

        elif (not new_intro):
              self.message_to_client = "Intro should now be empty"

        elif (new_intro):
            user.intro = new_intro
            user.save()

            self.success_status = True
            self.message_to_client = "Your intro was updated successfully"    

        else:
            self.message_to_client = "!! Some error occured !!"
        
        return(Response(self.get_generated_response()))
    
class AboutMeUpdater(APIView, ResponseUtilities):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        about_me = request.data.get("about_me", "").strip()
        user = request.user

        if not about_me:
            self.message_from_server = "About Me section cannot be empty"

        else:
            user.about_me = about_me
            user.save()
            self.success_status = True

        return Response(self.get_generated_response())
    
class ProfilePhotoUpdater(APIView, ResponseUtilities):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        commit = request.data.get("commit")
        profile_photo = request.FILES.get("profile_photo", "")
        user = request.user

        if commit == "update":
            if not profile_photo:
                self.message_to_client = "No profile photo provided"
            else:
                # Assign the new profile photo
                user.profile_photo = profile_photo
                user.save()
                self.success_status = True

        elif commit == "remove":
            if user.profile_photo.name == "default_profile_photo.jpg":
                self.message_to_client = "No profile photo to remove"
            else:
                # Revert to default profile photo
                user.remove_profile_photo()
                self.success_status = True
                self.message_to_client = "Profile photo removed successfully"

        else:
            self.message_to_client = "Invalid commit action"

        return Response(self.get_generated_response())

class ProfileBackgroundUpdater(APIView, ResponseUtilities):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        commit = request.data.get("commit")
        background_photo = request.FILES.get("background_photo", "")
        user = request.user

        if commit == "update":
            if not background_photo:
                self.message_from_server = "No background photo provided"
            else:
                user.background_photo = background_photo
                user.save()
                self.success_status = True
                self.message_from_server ="Background photo updated successfully"

        elif commit == "remove":
            if user.background_photo.name == "default_background_photo.jpg":
               self.message_from_server = "No background photo to remove"

            else:
                user.background_photo = "default_background_photo.jpg"
                user.save()
                self.message_from_server ="Background photo removed successfully"

        else:
            self.message_from_server = "Invalid commit action"
        
        return Response(self.get_generated_response())