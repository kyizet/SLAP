from django.shortcuts import render
from django.http import JsonResponse

# Create your views here.
from rest_framework.decorators import api_view
from rest_framework.response import Response

from .models import Product, ProductType

from .serializers import ProductTypeSerializer, ProductSerializer

@api_view(['GET'])
def overview(request):
    api_urls = {
        'product-types': '/shop/product-types',
        'product/<str:product_type>': 'shop/product/<str:product_name>',
    }
    return Response(api_urls)


@api_view(['GET'])
def productTypeList(request):
    productTypes = ProductType.objects.all()
    serializer = ProductTypeSerializer(productTypes, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def productsAll(request):
    products = Product.objects.all()
    serializer = ProductSerializer(products, many=True)
    return Response(serializer.data)

@api_view(['POST'])
def productsByType(request, product_type):
    products = Product.objects.filter(product_type__product_type=product_type)
    serializer = ProductSerializer(products, many=True)
    return Response(serializer.data)