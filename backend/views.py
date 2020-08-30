from django.shortcuts import render
from django.http import JsonResponse

# Create your views here.
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializers import CarouselSerializer, VersionSerializer, ChangelogSerializer, HelperSerializer

from .models import Carousel, Version, Changelog, Helper


@api_view(['GET'])
def overview(request):
    api_urls = {
        'carousel-list': '/home/carousel-list',
        'changelogs': '/changelogs',
        'changelog-version': '/changelog-version',
        'helpers': '/helpers'
    }
    return Response(api_urls)


@api_view(['GET'])
def carouselList(request):
    carousels = Carousel.objects.all()
    serializer = CarouselSerializer(carousels, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def versionList(request):
    versions = Version.objects.all()
    serializer = VersionSerializer(versions, many=True)
    return Response(serializer.data)


@api_view(['POST'])
def changelogList(request, version):
    changelogs = Changelog.objects.filter(version_number__version_number=version)
    serializer = ChangelogSerializer(changelogs, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def helperList(request):
    helpers = Helper.objects.all()
    serializer = HelperSerializer(helpers, many=True)
    return Response(serializer.data)