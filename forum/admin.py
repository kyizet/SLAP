from django.contrib import admin

# Register your models here.
from .models import ThreadType, Thread, Topic, Comment


class ThreadAdmin(admin.ModelAdmin):
    list_display = ('pk', 'thread_title', 'for_community')


class TopicAdmin(admin.ModelAdmin):
    list_display = ('pk', 'topic_title', 'thread_title', 'owner', 'get_email')

    def get_email(self, obj):
        return obj.owner.email


admin.site.register(ThreadType)
admin.site.register(Thread, ThreadAdmin)
admin.site.register(Topic, TopicAdmin)
admin.site.register(Comment)
