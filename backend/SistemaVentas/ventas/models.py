from django.db import models
from django.contrib.auth.models import User


class Provider(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=50,unique=True)
    phone = models.IntegerField()
    mail = models.CharField(max_length=100)

    def __str__(self):
        return self.name


class Sell(models.Model):
    id = models.AutoField(primary_key=True)
    SellProducts = models.ManyToManyField('Product', default="")
    seller = models.ForeignKey(User, on_delete=models.CASCADE,null=True, blank=True)
    mount = models.IntegerField(default=0)
    date = models.DateTimeField(auto_now_add=True)


class Product(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=50,unique=True)
    stock = models.IntegerField(default=0)
    bar_code = models.IntegerField()
    sell_price = models.FloatField()
    base_price = models.FloatField()
    min_stock = models.IntegerField()
    category = models.ForeignKey('Category', on_delete=models.SET_NULL, related_name='productCategory', null=True, blank=True)
    provider = models.ForeignKey('Provider', related_name='productProvider', on_delete=models.CASCADE, null=True, blank=True)

    def __str__(self):
        return self.name


class Category(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=50,unique=True)

    def __str__(self):
        return self.name
