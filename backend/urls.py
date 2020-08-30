from django.urls import path
from . import views

urlpatterns = [
    path('', views.overview, name="overview"),
    path('home/carousel-list', views.carouselList, name="carouselList"),
    path('changelog-versions/', views.versionList, name="versionList"),
    path('changelogs/<str:version>', views.changelogList, name="chnagelogList"),
    path('helpers/', views.helperList, name="helperList")
]
