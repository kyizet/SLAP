from django.db import models

# Create your models here.


class Carousel(models.Model):
    title = models.CharField(max_length=50)
    description = models.CharField(max_length=150)
    image = models.ImageField(blank=False, null=False, upload_to="carousels")

    def __str__(self):
        return self.title


# for changelog
class Version(models.Model):
    version_number = models.FloatField(max_length=50, default='1')
    version_published_date = models.DateField()

    def __str__(self):
        return str(self.version_number)


class Changelog(models.Model):
    version_number = models.ForeignKey(
        Version, related_name="version", on_delete=models.CASCADE)
    title = models.CharField(max_length=50)
    description = models.TextField()

    def __str__(self):
        return self.title


class Helper(models.Model):
    helper_title = models.CharField(max_length=50)
    helper_description = models.TextField()

    def __str__(self):
        return self.helper_title
