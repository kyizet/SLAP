### SLAP - Small LAP

## Developers 
* Zet

## About
Just a small website, that is intended to use as a website for a game, which will deliberately sell items in game and inform players with changelogs.

## Languages and Frameworks used
* Django 
* Django Rest Framework 
* React
* MDBootstrap

## Prerequisites
* Do install the dependencies from requirements.txt (Best to be used with a virtual environment)
    * Steps for virtualenv
        * git clone https://github.com/kyizet/slap
        * cd slap
        * virtualenv .
        * pip install -r requirements.txt
* Create a new superuser
    * python manage.py createsuperuser
* Run the backend django server 
    * python manage.py runserver
* Run the frontend server
    * npm start