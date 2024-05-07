from django.contrib import admin
from . models import User, Skill, Interest


# Registering the Models into the admin page
admin.site.register(User)
admin.site.register(Skill)
admin.site.register(Interest)