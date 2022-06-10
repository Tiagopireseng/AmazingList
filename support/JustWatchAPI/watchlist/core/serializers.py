from rest_framework import serializers
from .models import MovieSeries


class MovieSerieSerializer(serializers.ModelSerializer):
    class Meta:
        model = MovieSeries
        fields = ('id', 'title', 'year', 'genre', 'description')
