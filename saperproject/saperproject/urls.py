
from django.contrib import admin
from django.urls import path,include
from projectwebsite.views import home, saper

urlpatterns = [
    path('admin/', admin.site.urls),
     path('', include('projectwebsite.urls')),
    path('users/', include('django.contrib.auth.urls')),
    path('users/', include('users.urls')),
]
