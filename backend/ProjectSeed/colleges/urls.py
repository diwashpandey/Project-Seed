from django.urls import path
from . import views

urlpatterns = [
    path("college-profile/", views.CollegeProfileView.as_view(), name="college_profile"),
    path("college-profile-non-authenticated/", views.CollegeProfileNonAuthenticatedView.as_view(), name="college_profile_non_authenticated"),
    path("get-college-students/", views.GetCollegeStudentsView.as_view(), name="get_college_students"),
    path("get-college-members/", views.GetCollegeMembersView.as_view(), name="get_college_members"),

    path("colleges-list/", views.GetCollegesListView.as_view(), name="get_colleges_list"),
]
