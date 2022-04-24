from django.contrib import admin
from .models import Sell
from .models import Product
from .models import Category
from .models import Provider
# Register your models here.


admin.site.register(Sell)
admin.site.register(Product)
admin.site.register(Category)
admin.site.register(Provider)
