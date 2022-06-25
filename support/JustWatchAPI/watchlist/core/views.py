from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.views import APIView

from .serializers import GetWatchlistSerializer, MovieSerieSerializer, ProviderSerializer, UserSerializer, RegisterSerializer, WatchlistSerializer

from .models import MovieSeries, Provider, Watchlist
from django.contrib.auth.models import User


from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.authentication import TokenAuthentication
from rest_framework import generics


# Create your views here.

class MovieSerieView(viewsets.ModelViewSet):
    serializer_class = MovieSerieSerializer
    queryset = MovieSeries.objects.all()


class ProviderView(viewsets.ModelViewSet):
    serializer_class = ProviderSerializer
    queryset = Provider.objects.all()


class GetWatchlistView(viewsets.ModelViewSet):
    serializer_class = GetWatchlistSerializer
    queryset = Watchlist.objects.all()

    def get_queryset(self):
        """
        Optionally restricts the returned purchases to a given user,
        by filtering against a `username` query parameter in the URL.
        """
        queryset = Watchlist.objects.all()
        user = self.request.query_params.get('user')
        if user is not None:
            queryset = queryset.filter(user=user)
        return queryset


class WatchlistView(viewsets.ModelViewSet):
    serializer_class = WatchlistSerializer
    queryset = Watchlist.objects.all()

    def get_queryset(self):
        """
        Optionally restricts the returned purchases to a given user,
        by filtering against a `username` query parameter in the URL.
        """
        queryset = Watchlist.objects.all()
        user = self.request.query_params.get('user')
        if user is not None:
            queryset = queryset.filter(user=user)
        return queryset

    def del_queryset(self):
        queryset = Watchlist.objects.all()
        user = self.request.query_params.get('user')
        if user is not None:
            queryset = queryset.filter(user=user)
        return queryset

    def put_queryset(self):
        queryset = Watchlist.objects.all()
        user = self.request.query_params.get('user')
        if user is not None:
            queryset = queryset.filter(user=user)
        return queryset

# Class based view to Get User Details using Token Authentication


class UserView(viewsets.ModelViewSet):
    authentication_classes = (TokenAuthentication,)
    permission_classes = (AllowAny,)
    queryset = User.objects.all()
    serializer_class = UserSerializer

    def get_queryset(self, *args, **kwargs):
        queryset = User.objects.all()
        username = self.request.query_params.get('username')
        if username is not None:
            queryset = queryset.filter(username=username)
        return queryset


class UserDetailAPI(APIView):
    authentication_classes = (TokenAuthentication,)
    permission_classes = (AllowAny,)

    def get(self, request, *args, **kwargs):
        user = User.objects.all
        serializer = UserSerializer(user)
        return Response(serializer.data)


# Class based view to register user


class RegisterUserAPIView(generics.CreateAPIView):
    permission_classes = (AllowAny,)
    serializer_class = RegisterSerializer
