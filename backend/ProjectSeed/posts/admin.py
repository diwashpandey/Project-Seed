from django.contrib import admin
from . models import Post, PostPhoto, Comment


# Registering the Models into the admin page
admin.site.register(Post)
admin.site.register(PostPhoto)
admin.site.register(Comment)
