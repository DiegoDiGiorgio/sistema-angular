from rest_framework import serializers
from .models import Sell, Product, Provider, Category
from django.contrib.auth.models import User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id','username','email', 'last_name', 'first_name', 'is_superuser']

class ProviderSerializer(serializers.ModelSerializer):

    class Meta:
        model = Provider
        fields = ['name', 'phone', 'mail', 'id']

class SellSerializer(serializers.ModelSerializer):

    #seller = UserSerializer(read_only=True)
    'SellProducts = ProductSerializer(many=True)'

    class Meta:
        model = Sell
        fields = [ 'SellProducts','seller', 'mount', 'date', 'id']

class CategorySerializer(serializers.ModelSerializer):

    class Meta:
        model = Category
        fields = ['name', 'id']

class ProductSerializer(serializers.ModelSerializer):
    category = CategorySerializer(read_only=True)
    provider = ProviderSerializer(read_only=True)

    class Meta:
        model = Product
        fields= ['name', 'stock', 'bar_code', 'sell_price', 'base_price', 'min_stock','id','provider','category']
