from django.db import models

# Create your models here.
class ProductType(models.Model):
    product_type = models.CharField(max_length=50)

    def __str__(self):
        return self.product_type

class Product(models.Model):
    product_name = models.CharField(max_length=50)
    product_type = models.ForeignKey(ProductType, on_delete=models.CASCADE)
    product_image = models.ImageField(blank=False, null=False, upload_to="products")
    product_price = models.FloatField()
    product_description = models.TextField(default="Product Description")

    def __str__(self):
        return self.product_name