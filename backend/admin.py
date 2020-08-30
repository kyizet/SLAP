from django.contrib import admin
from django.contrib.auth.models import Group


from .models import Carousel, Version, Changelog, Helper
# Register your models here.


admin.site.site_header = "Small LAP CMS"
admin.site.unregister(Group)


admin.site.register(Carousel)
admin.site.register(Version)
admin.site.register(Changelog)
admin.site.register(Helper)