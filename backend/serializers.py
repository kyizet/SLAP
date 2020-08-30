from rest_framework import serializers

from .models import Carousel, Version, Changelog, Helper


class CarouselSerializer(serializers.ModelSerializer):
    class Meta:
        model = Carousel
        fields = '__all__'


class VersionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Version
        fields = ['version_number']


class ChangelogSerializer(serializers.ModelSerializer):
    class Meta:
        model = Changelog
        fields = ['title', 'description']

class HelperSerializer(serializers.ModelSerializer):
    class Meta:
        model = Helper
        fields = '__all__'