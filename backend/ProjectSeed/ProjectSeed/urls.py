from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include("home.urls")),
    path('account/', include("accounts.urls")),
    path('post/', include("posts.urls")),
    path('college/', include("colleges.urls")),
    path('university/', include("universities.urls")),
    path('ranking/', include("ranking.urls")),
]
