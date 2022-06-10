from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from core import views

router = routers.DefaultRouter()
router.register(r'movie_series', views.MovieSerieView, 'movie_series')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
]
