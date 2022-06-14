from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from core.views import MovieSerieView, UserDetailAPI, RegisterUserAPIView
from rest_framework.authtoken import views

router = routers.DefaultRouter()
router.register(r'movie_series', MovieSerieView, 'movie_series')

urlpatterns = [
    path('admin/', admin.site.urls),
    path("get-details", UserDetailAPI.as_view()),
    path('register', RegisterUserAPIView.as_view()),
    path('api/', include(router.urls)),
    path('api-token-auth/', views.obtain_auth_token, name="api-token-auth"),
]
