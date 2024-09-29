from rest_framework import serializers
from .models import Stock, School

class SchoolSerializer(serializers.ModelSerializer):
    class Meta:
        model = School
        fields = ['id', 'name']

class StockSerializer(serializers.ModelSerializer):
    served_schools = SchoolSerializer(many=True)  # Include schools that took stock

    class Meta:
        model = Stock
        fields = ['remaining_iron_sheets', 'remaining_cement_packs', 'served_schools']
