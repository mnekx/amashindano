from django.urls import path
from .views import StockViewSet, SchoolViewSet

urlpatterns = [
    path('stock/', StockViewSet.as_view({'get': 'list'})),
    path('stock/reduce/', StockViewSet.as_view({'put': 'reduce_stock'})),
     # Route for fetching list of schools
    path('schools/', SchoolViewSet.as_view({'get': 'list'})),
]
