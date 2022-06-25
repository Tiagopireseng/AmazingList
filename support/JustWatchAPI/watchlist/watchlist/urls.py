from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from core.views import GetWatchlistView, MovieSerieView, ProviderView, RegisterUserAPIView, UserDetailAPI, UserView, WatchlistView
from rest_framework.authtoken import views

router = routers.DefaultRouter()
router.register(r'movie_series', MovieSerieView, 'movie_series')
router.register(r'providers', ProviderView, 'providers')
router.register(r'watchlist', WatchlistView, 'watchlist')
router.register(r'getwatchlist', GetWatchlistView, 'getwatchlist')
router.register(r'users', UserView, 'users')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('register/', RegisterUserAPIView.as_view()),
    path('api/', include(router.urls)),
    path('api-token-auth/', views.obtain_auth_token, name="api-token-auth"),
    path("login", UserDetailAPI.as_view()),
]
