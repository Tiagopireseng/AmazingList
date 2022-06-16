from django.contrib import admin
from .models import MovieSeries, Provider, Watchlist


# Register your models here.

admin.site.register(MovieSeries)
admin.site.register(Provider)
admin.site.register(Watchlist)
