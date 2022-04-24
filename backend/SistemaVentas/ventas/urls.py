from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import CategoryViewSet, SellViewSet, ProviderViewSet, ProductViewSet,UserViewSet

router = DefaultRouter()

router.register(r'categories', CategoryViewSet)
router.register(r'sells', SellViewSet)
router.register(r'users', UserViewSet)
router.register(r'providers', ProviderViewSet)
router.register(r'products', ProductViewSet)

urlpatterns = [
path(r'', include(router.urls)),
]
