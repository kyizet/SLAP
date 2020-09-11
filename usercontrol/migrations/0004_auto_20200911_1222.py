# Generated by Django 3.1 on 2020-09-11 05:52

from django.db import migrations, models
import usercontrol.models


class Migration(migrations.Migration):

    dependencies = [
        ('usercontrol', '0003_auto_20200819_2338'),
    ]

    operations = [
        migrations.AlterField(
            model_name='account',
            name='profile_picture',
            field=models.ImageField(blank=True, default='profiles/default.png', upload_to=usercontrol.models.Account.photo_path),
        ),
    ]
