from rest_framework.response import Response
from rest_framework import viewsets, status
from .models import Stock, School
from .serializers import StockSerializer, SchoolSerializer
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import action

class StockViewSet(viewsets.ViewSet):

    def list(self, request):
        stock = Stock.objects.first()
        serializer = StockSerializer(stock)
        return Response(serializer.data)

    @action(detail=False, methods=['put'], permission_classes=[IsAuthenticated])
    def reduce_stock(self, request):
        stock = Stock.objects.first()
        iron_sheets = request.data.get('iron_sheets', 0)
        cement_packs = request.data.get('cement_packs', 0)
        school_id = request.data.get('school_id')

        try:
            school = School.objects.get(id=school_id)  # Find the selected school
        except School.DoesNotExist:
            return Response({"error": "School not found"}, status=status.HTTP_404_NOT_FOUND)

        # Deduct iron sheets and cement packs
        if stock.remaining_iron_sheets >= int(iron_sheets):
            stock.remaining_iron_sheets -= int(iron_sheets)
        else:
            return Response({"error": "Not enough iron sheets"}, status=status.HTTP_400_BAD_REQUEST)

        if stock.remaining_cement_packs >= int(cement_packs):
            stock.remaining_cement_packs -= int(cement_packs)
        else:
            return Response({"error": "Not enough cement packs"}, status=status.HTTP_400_BAD_REQUEST)

        # Link the school to the stock record
        stock.served_schools.add(school)
        stock.save()

        return Response({"message": "Stock updated successfully"})

class SchoolViewSet(viewsets.ViewSet):
    """
    ViewSet to handle listing all schools.
    """
    def list(self, request):
        schools = School.objects.all()  # Get all schools
        serializer = SchoolSerializer(schools, many=True)  # Serialize the school data
        return Response(serializer.data)  # Return the serialized data