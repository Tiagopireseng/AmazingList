from rest_framework import serializers
from .models import MovieSeries, Provider, Watchlist
from django.contrib.auth.models import User
from rest_framework.response import Response
from rest_framework import status
from rest_framework.validators import UniqueValidator
from django.contrib.auth.password_validation import validate_password


class MovieSerieSerializer(serializers.ModelSerializer):
    class Meta:
        model = MovieSeries
        fields = ('id', 'title', 'year', 'genre',
                  'description', 'poster', 'providers')


class ProviderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Provider
        fields = ('id', 'name', 'url', 'type')


class WatchlistSerializer(serializers.ModelSerializer):
    # movie_series = MovieSerieSerializer(many=True, read_only=True)

    class Meta:
        model = Watchlist
        fields = ('id', 'user', 'movie_series')


class GetWatchlistSerializer(serializers.ModelSerializer):
    movie_series = MovieSerieSerializer(many=True, read_only=True)

    class Meta:
        model = Watchlist
        fields = ('id', 'user', 'movie_series')


# Serializer to Get User Details using Django Token Authentication
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "first_name", "last_name", "username"]

# Serializer to Register User


class RegisterSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(
        required=True,
        validators=[UniqueValidator(queryset=User.objects.all())]
    )
    password = serializers.CharField(
        write_only=True, required=True, validators=[validate_password])
    password2 = serializers.CharField(write_only=True, required=True)

    class Meta:
        model = User
        fields = ('username', 'password', 'password2',
                  'email', 'first_name', 'last_name')
        extra_kwargs = {
            'first_name': {'required': True},
            'last_name': {'required': True}
        }

    def validate(self, attrs):
        if attrs['password'] != attrs['password2']:
            raise serializers.ValidationError(
                {"password": "Password fields didn't match."})
        return attrs

    def create(self, validated_data):
        user = User.objects.create(
            username=validated_data['username'],
            email=validated_data['email'],
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name']
        )
        user.set_password(validated_data['password'])
        user.save()
        return user
