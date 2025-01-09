from django.urls import path
from . import views
urlpatterns = [
    path('home/', views.home, name="home"),
     path('saper/', views.saper, name="saper"),
]