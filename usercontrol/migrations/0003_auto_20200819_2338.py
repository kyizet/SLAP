# Generated by Django 3.1 on 2020-08-19 17:08

from django.db import migrations, models
import usercontrol.models


class Migration(migrations.Migration):

    dependencies = [
        ('usercontrol', '0002_auto_20200819_1314'),
    ]

    operations = [
        migrations.AlterField(
            model_name='account',
            name='profile_picture',
            field=models.ImageField(blank=True, default='profiles/default.png', upload_to=usercontrol.models.Account.path_and_rename),
        ),
    ]