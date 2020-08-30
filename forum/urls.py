from django.urls import path
from . import views

urlpatterns = [
    path('threadtypes/', views.ThreadTypeList.as_view()),
    path('threads/', views.ThreadList.as_view()),
    path('topics/<str:pk>', views.TopicList),
    path('topic/<str:pk>', views.TopicDetail),
    path('addtopic/', views.AddTopic),
    path('updatetopic/<str:pk>', views.UpdateTopic),
    path('deletetopic/<str:pk>', views.DeleteTopic),
    path('addcomment/', views.AddComment),
    path('comments/<str:pk>', views.CommentList),
]
