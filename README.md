# SLAP - Small LAP
Just a small website, that is intended to use as a website for a game, which will deliberately sell items in game and inform players with changelogs.

## Developers 
* Zet

## Languages and Frameworks used
* Django 
* Django Rest Framework 
* React
* MDBootstrap
* Stripe for payment

## Prerequisites
* Do install the dependencies from requirements.txt (Best to be used with a virtual environment)
    * Steps for virtualenv
        * ```git clone https://github.com/kyizet/slap```
        * ```cd slap```
        * ```virtualenv .```
        * ```pip install -r requirements.txt```
    * Activating virtualenv 
        * For Windows
            * ```Scripts\activate```
        * For Linux
            * ```source bin/activate```
* Create a new superuser
    * ```python manage.py createsuperuser```
* Run the backend django server 
    * ```python manage.py runserver```
* Run the frontend server
    * ```npm start```

### Note
* Although it won't be necessary
    * Run ```python manage.py makemigrations```
    * Run ```python manage.py migrate```