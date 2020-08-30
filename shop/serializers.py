from rest_framework import serializers

from .models import Product, ProductType


class ProductTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductType
        fields = ('id', 'product_type')

class ProductSerializer(serializers.ModelSerializer):
    product_type = serializers.SerializerMethodField()

    class Meta:
        model = Product
        fields = ('id', 'product_name', 'product_type', 'product_image', 'product_price', 'product_description')

    def get_product_type(self, product):
        return product.product_type.product_type