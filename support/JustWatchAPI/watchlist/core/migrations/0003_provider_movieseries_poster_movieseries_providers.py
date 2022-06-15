# Generated by Django 4.0.5 on 2022-06-15 20:02

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0002_movieseries_description_movieseries_genre_and_more'),
    ]

    operations = [
        migrations.CreateModel(
            name='Provider',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255)),
                ('url', models.URLField()),
            ],
        ),
        migrations.AddField(
            model_name='movieseries',
            name='poster',
            field=models.TextField(blank=True),
        ),
        migrations.AddField(
            model_name='movieseries',
            name='providers',
            field=models.ManyToManyField(to='core.provider'),
        ),
    ]
