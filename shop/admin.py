from django.contrib import admin

# Register your models here.
from .models import Product, ProductType

admin.site.register(Product)
admin.site.register(ProductType)