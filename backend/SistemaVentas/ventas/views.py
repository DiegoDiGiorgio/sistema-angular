from rest_framework import viewsets, status
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Sell, Product, Provider, Category
from .serializers import SellSerializer, ProductSerializer,UserSerializer, ProviderSerializer, CategorySerializer
from django.contrib.auth.models import User
import json
# Create your views here.


class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

    filter_backend = [DjangoFilterBackend]
    filter_fields = ['name']

    permission_classes = []

    def create(self, request):
        name = request.data.get('name')
        category = Category(name=name)
        category.save()
        serializer = CategorySerializer(category)
        return Response(serializer.data, status=status.HTTP_200_OK)

        @action(detail=True, methods=['delete'])
        def delete(self, request, pk=None):
            category = Category.objects.get(pk=pk)
            category.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)


    @action(detail=True, methods=['put'])
    def updateCategory(self, request, pk=None):
        category = Category.objects.get(pk=pk)
        serializer = CategorySerializer(category, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=True, methods=['get'] )
    def categoryDetail(self,request,pk=None):
        category= self.queryset.get(pk=pk)
        serializer = CategorySerializer
        return Response(serializer.data, status=status.HTTP_200_OK)

class SellViewSet(viewsets.ModelViewSet):
    queryset = Sell.objects.all()
    serializer_class = SellSerializer

    filter_backend = [DjangoFilterBackend]
    filter_fields = ['name']

    permission_classes = []

    def create(self, request):
        sellerID = request.data.get('seller')
        seller = User.objects.all().get(pk=sellerID)
        products = request.data.get('productos')
        SellProducts=[]
        for prod in request.data.get('productos'):
            SellProducts.append(Product.objects.all().get(pk=prod['producto']['id']))
            self.actualizarstock((Product.objects.all().get(pk=prod['producto']['id'])),prod['cantidad'])
        mount = request.data.get('mount')
        sell = Sell(mount=mount, seller=seller)
        sell.save()
        sell.SellProducts.set(SellProducts)
        serializer = SellSerializer(sell)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    def actualizarstock(self, prod, cant):
        prod.stock = prod.stock-cant
        prod.save()

    @action(detail=True, methods=['put'])
    def updateSell(self, request, pk=None):
        sell = Sells.objects.get(pk=pk)
        serializer = SellSerializer(sell, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=True, methods=['get'] )
    def sellDetail(self,request,pk=None):
        sell= self.queryset.get(pk=pk)
        serializer = SellSerializer
        return Response(serializer.data, status=status.HTTP_200_OK)

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    filter_backend = [DjangoFilterBackend]
    filter_fields = ['name']

    permission_classes = []

    def create(self, request):
        username = request.data.get('mail')
        first_name = request.data.get('name')
        last_name = request.data.get('lastName')
        password = request.data.get('password')
        email = request.data.get('mail')
        is_superuser = request.data.get('isSuperUser')
        user = User(email=email, first_name=first_name, last_name=last_name, password=password, username=username, is_superuser=is_superuser)
        user.save()
        serializer = UserSerializer(user)
        return Response(serializer.data, status=status.HTTP_200_OK)


    @action(detail=True, methods=['get'] )
    def userDetail(self,request,pk=None):
        user= self.queryset.get(pk=pk)
        serializer = UserSerializer
        return Response(serializer.data, status=status.HTTP_200_OK)

    @action(detail=True, methods=['put'])
    def updateUser(self, request, pk=None):
        user = Users.objects.get(pk=pk)
        serializer = UserSerializer(user, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

    filter_backend = [DjangoFilterBackend]
    filter_fields = ['name']

    permission_classes = []

    def create(self, request):
        "id = request.data.get('id')"
        name = request.data.get('name')
        stock = request.data.get('stock')
        bar_code = request.data.get('bar_code')
        sell_price = request.data.get('sell_price')
        base_price = request.data.get('base_price')
        min_stock = request.data.get('min_stock')
        categoryID = request.data.get('category')
        providerID = request.data.get('provider')
        product = Product(name=name,
                          stock=stock,
                          bar_code=bar_code,
                          sell_price=sell_price,
                          base_price=base_price,
                          min_stock=min_stock,
                          category=Category.objects.get(pk=categoryID),
                          provider=Provider.objects.get(pk=providerID))
        product.save()
        serializer = ProductSerializer(product)
        return Response(serializer.data, status=status.HTTP_200_OK)


    @action(detail=True, methods=['put'])
    def updateProduct(self, request, pk=None):
        product= self.queryset.get(pk=pk)
        serializer = ProductSerializer(product, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=True, methods=['get'] )
    def productDetail(self,request,pk=None):
        product= self.queryset.get(pk=pk)
        serializer = ProductSerializer(product)
        return Response(serializer.data, status=status.HTTP_200_OK)
    

class ProviderViewSet(viewsets.ModelViewSet):
    queryset = Provider.objects.all()
    serializer_class = ProviderSerializer

    filter_backend = [DjangoFilterBackend]
    filter_fields = ['name']

    permission_classes = []

    def create(self, request):
        name = request.data.get('name')
        phone = request.data.get('phone')
        mail = request.data.get('mail')

        provider = Provider(name=name,mail=mail,phone=phone)
        provider.save()
        serializer = ProviderSerializer(provider)
        return Response(serializer.data, status=status.HTTP_200_OK)

    @action(detail=True, methods=['put'])
    def updateProvider(self, request, pk=None):
        provider = Provider.objects.get(pk=pk)
        serializer = ProviderSerializer(provider, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=True, methods=['get'] )
    def providerDetail(self,request,pk=None):
        provider= self.queryset.get(pk=pk)
        serializer = ProviderSerializer
        return Response(serializer.data, status=status.HTTP_200_OK)
