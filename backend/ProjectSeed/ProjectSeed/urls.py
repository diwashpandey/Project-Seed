from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),
    path('home/', include("home.urls")),
    path('accounts/', include("accounts.urls")),
    path('posts/', include("posts.urls")),
    path('colleges/', include("colleges.urls")),
    path('universities/', include("universities.urls")),
    path('search/', include("search.urls")),
    path('ranking/', include("ranking.urls")),
    path('ratings/', include("ratings.urls")),
    path('recommendation/', include("recommendation.urls"))
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)