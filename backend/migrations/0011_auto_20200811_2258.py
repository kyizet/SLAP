# Generated by Django 3.1 on 2020-08-11 16:28

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0010_auto_20200811_2257'),
    ]

    operations = [
        migrations.AlterField(
            model_name='version',
            name='version_number',
            field=models.CharField(default='1', max_length=50),
        ),
        migrations.AlterField(
            model_name='version',
            name='version_published_date',
            field=models.DateField(),
        ),
    ]