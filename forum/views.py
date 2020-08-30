from django.shortcuts import render
from django.http import Http404
from rest_framework.views import APIView
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAuthenticatedOrReadOnly
from rest_framework.response import Response
from rest_framework import status
from rest_framework import generics

from .serializers import ThreadTypeSerializer, ThreadSerializer, TopicSerializer, TopicDetailSerializer, TopicCreatorSerializer, TopicUpdaterSerializer, CommentSerializer
from .models import ThreadType, Thread, Topic, Comment
from usercontrol.models import Account
# Create your views here.


class ThreadTypeList(APIView):
    def get(self, request, format=None):
        threadtypes = ThreadType.objects.all()
        serializer = ThreadTypeSerializer(threadtypes, many=True)
        return Response(serializer.data)


class ThreadList(APIView):
    def get(self, request, format=None):
        threads = Thread.objects.all()
        serializer = ThreadSerializer(threads, many=True)
        return Response(serializer.data)


@api_view(['POST'])
def TopicList(request, pk):
    topics = Topic.objects.filter(thread_title__pk=pk)
    serializer = TopicSerializer(topics, many=True)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes((IsAuthenticatedOrReadOnly,))
def TopicDetail(request, pk):
    try:
        topic = Topic.objects.get(pk=pk)
    except:
        return Response(status=status.HTTP_404_NOT_FOUND)
    data = {}

    if topic.owner == request.user:
        data['isOwner'] = True
    else:
        data['isOwner'] = False

    if request.method == 'GET':
        serializer = TopicDetailSerializer(topic)
        data = {**data, **serializer.data}
        return Response(data)


@api_view(['POST'])
@permission_classes((IsAuthenticated,))
def AddTopic(request):
    author = request.user
    topic = Topic(owner=author)
    if request.method == "POST":
        serializer = TopicCreatorSerializer(topic, data=request.data)
        data = {}
        if serializer.is_valid():
            topic = serializer.save()
            data['slug'] = topic.topic_slug
            data['id'] = topic.pk
            return Response(data)
        else:
            return Response(serializer.errors)


@api_view(['PUT', ])
@permission_classes((IsAuthenticated,))
def UpdateTopic(request, pk):
    try:
        topic = Topic.objects.get(pk=pk)
    except:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if topic.owner != request.user:
        return Response({"Response": "You do not have permission to edit this."})

    if request.method == "PUT":
        serializer = TopicUpdaterSerializer(topic, data=request.data)
        data = {}
        if serializer.is_valid():
            topic = serializer.save()
            data['id'] = topic.pk
            return Response(data)
        else:
            return Response(serializer.errors)


@api_view(['DELETE', ])
@permission_classes((IsAuthenticated,))
def DeleteTopic(request, pk):
    try:
        topic = Topic.objects.get(pk=pk)
    except:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if topic.owner != request.user:
        return Response({"Response": "You do not have permission to delete this."})

    if request.method == "DELETE":
        operation = topic.delete()
        data = {}
        if operation:
            data['Response'] = "Successfully Deleted"
        else:
            data['Response'] = "Failed"
        return Response(data=data)


@api_view(['POST'])
@permission_classes((IsAuthenticated,))
def AddComment(request):
    author = request.user
    comment = Comment(owner=author)
    if request.method == "POST":
        serializer = CommentSerializer(comment, data=request.data)
        data = {}
        if serializer.is_valid():
            comment = serializer.save()
            data['response'] = "Success"
            return Response(data)
        else:
            return Response(serializer.errors)


@api_view(['GET'])
def CommentList(request, pk):
    comments = Comment.objects.filter(topic_title__pk=pk)
    serializer = CommentSerializer(comments, many=True)
    return Response(serializer.data)
