from django.shortcuts import render

# Create your views here.
from rest_framework import viewsets, status
from rest_framework.response import Response
from .models import Stock
from .serializers import StockSerializer
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import action

class StockViewSet(viewsets.ViewSet):

    @action(detail=False, methods=['put'], permission_classes=[])
    def list(self, request):
        stock = Stock.objects.first()
        serializer = StockSerializer(stock)
        return Response(serializer.data)

    @action(detail=False, methods=['put'], permission_classes=[IsAuthenticated])
    def reduce_stock(self, request):
        stock = Stock.objects.first()
        iron_sheets = request.data.get('iron_sheets', 0)
        cement_packs = request.data.get('cement_packs', 0)

        if stock.remaining_iron_sheets >= int(iron_sheets):
            stock.remaining_iron_sheets -= int(iron_sheets)
        else:
            return Response({"error": "Not enough iron sheets"}, status=status.HTTP_400_BAD_REQUEST)

        if stock.remaining_cement_packs >= int(cement_packs):
            stock.remaining_cement_packs -= int(cement_packs)
        else:
            return Response({"error": "Not enough cement packs"}, status=status.HTTP_400_BAD_REQUEST)

        stock.save()
        return Response({"message": "Stock updated successfully"})
