from django.urls import path
from . import views

urlpatterns = [
    path('', views.overview, name="overview"),
    path('product-types/', views.productTypeList, name="producttypelist"),
    path('productall/', views.productsAll, name="productall"),
    path('product/<str:product_type>', views.productsByType, name="productsbytype")
]
