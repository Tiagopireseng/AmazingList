from django.db import models

# Create your models here.


class MovieSeries(models.Model):
    title = models.CharField(max_length=255)
    year = models.IntegerField()
    genre = models.CharField(max_length=255)
    description = models.TextField(blank=True)

    def __str__(self):
        return self.title
