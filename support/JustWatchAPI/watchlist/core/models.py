from django.db import models
from django.contrib.auth.models import User


# Create your models here.


class MovieSeries(models.Model):
    title = models.CharField(max_length=255)
    year = models.IntegerField()
    genre = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    poster = models.URLField(blank=True, default="unavailable")
    providers = models.ManyToManyField('Provider')
    rating = models.IntegerField(default=0)

    def __str__(self):
        return self.title


class Provider(models.Model):
    name = models.CharField(max_length=255, default='provider', unique=True, )
    type = models.CharField(max_length=255, default="unavailable", choices=(
        (1, ("streaming")), (2, ("rental")), (3, ("unavailable"))))
    url = models.URLField(default="unavailable")
    icon = models.URLField(default="unavailable")

    def __str__(self):
        return self.name


class Watchlist(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    movie_series = models.ManyToManyField('MovieSeries')

    def __str__(self):
        return self.user.username + " watchlist"
