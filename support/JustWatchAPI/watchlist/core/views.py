from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.views import APIView

from .serializers import MovieSerieSerializer, UserSerializer, RegisterSerializer

from .models import MovieSeries
from django.contrib.auth.models import User


from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.authentication import TokenAuthentication
from rest_framework import generics


# Create your views here.

class MovieSerieView(viewsets.ModelViewSet):
    serializer_class = MovieSerieSerializer
    queryset = MovieSeries.objects.all()


# Class based view to Get User Details using Token Authentication
class UserDetailAPI(APIView):
    authentication_classes = (TokenAuthentication,)
    permission_classes = (AllowAny,)

    def get(self, request, *args, **kwargs):
        user = User.objects.get(id=request.user.id)
        serializer = UserSerializer(user)
        return Response(serializer.data)

# Class based view to register user


class RegisterUserAPIView(generics.CreateAPIView):
    permission_classes = (AllowAny,)
    serializer_class = RegisterSerializer
