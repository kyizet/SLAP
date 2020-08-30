from rest_framework import serializers

from usercontrol.models import Account
from .models import ThreadType, Thread, Topic, Comment


class ThreadTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = ThreadType
        fields = '__all__'


class ThreadSerializer(serializers.ModelSerializer):
    class Meta:
        model = Thread
        fields = '__all__'


class TopicSerializer(serializers.ModelSerializer):
    topic_author = serializers.SerializerMethodField('get_topic_author')

    class Meta:
        model = Topic
        fields = ['id', 'topic_title', 'created_date',
                  'topic_slug', 'thread_title', 'topic_author']

    def get_topic_author(self, topic):
        return topic.owner.username


class TopicDetailSerializer(serializers.ModelSerializer):
    topic_author = serializers.SerializerMethodField('get_topic_author')
    topic_author_picture = serializers.SerializerMethodField(
        'get_topic_author_picture')

    class Meta:
        model = Topic
        fields = ['id', 'topic_title', 'topic_content', 'created_date',
                  'topic_slug', 'thread_title', 'topic_author', 'topic_author_picture', ]

    def get_topic_author_picture(self, topic):
        return topic.owner.profile_picture.url

    def get_topic_author(self, topic):
        return topic.owner.username


class TopicCreatorSerializer(serializers.ModelSerializer):
    topic_author = serializers.SerializerMethodField('get_topic_author')

    class Meta:
        model = Topic
        fields = ['id', 'topic_title', 'topic_content',
                  'thread_title', 'topic_author']

    def get_topic_author(self, topic):
        return topic.owner.username


class TopicUpdaterSerializer(serializers.ModelSerializer):
    class Meta:
        model = Topic
        fields = ['topic_title', 'topic_content']


class CommentSerializer(serializers.ModelSerializer):
    comment_author = serializers.SerializerMethodField('get_comment_author')

    class Meta:
        model = Comment
        fields = ['id', 'topic_title', 'comment_text', 'comment_author']

    def get_comment_author(self, comment):
        return comment.owner.username
