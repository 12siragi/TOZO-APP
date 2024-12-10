from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/auth/',  include('useraccount.urls')),  
    path('auth/', include('allauth.urls')),
    path('api/', include('tasks.urls')),
]
