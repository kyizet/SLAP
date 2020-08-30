from django.urls import path
from . import views
from rest_framework.authtoken.views import obtain_auth_token

urlpatterns = [
    path('register', views.registration_view, name="register"),
    path('login', obtain_auth_token, name="login"),
    path('userprofile', views.account_profile_view, name="userprofile"),
    path('update', views.update_account_view, name="update")
]
