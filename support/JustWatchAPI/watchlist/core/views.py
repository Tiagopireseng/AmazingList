from django.shortcuts import render
from rest_framework import viewsets
from .serializers import MovieSerieSerializer
from .models import MovieSeries


# Create your views here.

class MovieSerieView(viewsets.ModelViewSet):
    serializer_class = MovieSerieSerializer
    queryset = MovieSeries.objects.all()
