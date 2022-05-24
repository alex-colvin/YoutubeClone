from django import urls
from django.urls import path, include
from . import views

urlpatterns = [
    path('', views.get_all_comments),
    path('all/<str:pk>/', views.get_all_comments),
    path('edit/<int:pk>/', views.edit_comment),
    path('post/', views.user_comment)

]