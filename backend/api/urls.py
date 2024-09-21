from django.urls import path
from .views import StockViewSet

urlpatterns = [
    path('stock/', StockViewSet.as_view({'get': 'list'})),
    path('stock/reduce/', StockViewSet.as_view({'put': 'reduce_stock'})),
]
