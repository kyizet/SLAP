from django.db import models
from django.utils.text import slugify
from usercontrol.models import Account
import random

# Create your models here.


class ThreadType(models.Model):
    thread_type = models.CharField(max_length=30)

    def __str__(self):
        return self.thread_type


class Thread(models.Model):
    thread_title = models.CharField(max_length=30)
    thread_type = models.ForeignKey(ThreadType, on_delete=models.CASCADE)
    thread_description = models.TextField()
    for_community = models.BooleanField(default=True)

    def __str__(self):
        return self.thread_title


class Topic(models.Model):
    topic_title = models.CharField(max_length=255)
    topic_content = models.TextField(default="DEFAULT")
    owner = models.ForeignKey(
        Account, on_delete=models.CASCADE)
    thread_title = models.ForeignKey(Thread, on_delete=models.CASCADE)
    created_date = models.DateTimeField(auto_now_add=True)
    topic_slug = models.SlugField(
        max_length=500, unique=True, blank=True, allow_unicode=True)

    def __str__(self):
        return self.topic_title

    def save(self, *args, **kwargs):
        self.topic_slug = slugify(
            self.topic_title + str(random.randint(0, 99999999999)))
        super(Topic, self).save(*args, **kwargs)


class Comment(models.Model):
    topic_title = models.ForeignKey(Topic, on_delete=models.CASCADE)
    owner = models.ForeignKey(Account, on_delete=models.CASCADE)
    comment_text = models.TextField()
    created_date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.owner.username
