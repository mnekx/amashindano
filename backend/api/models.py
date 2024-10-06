from django.db import models

class School(models.Model):
    name = models.CharField(max_length=255)

    def __str__(self):
        return self.name

class Stock(models.Model):
    total_iron_sheets = models.IntegerField(default=1000)
    total_cement_packs = models.IntegerField(default=500)
    remaining_iron_sheets = models.IntegerField()
    remaining_cement_packs = models.IntegerField()
    served_schools = models.ManyToManyField(
        School, through='SchoolStock', related_name='served_schools'
    )

    def save(self, *args, **kwargs):
        if not self.pk:
            self.remaining_iron_sheets = self.total_iron_sheets
            self.remaining_cement_packs = self.total_cement_packs
        super().save(*args, **kwargs)

# Through Model for Many-to-Many Relationship
class SchoolStock(models.Model):
    stock = models.ForeignKey(Stock, on_delete=models.CASCADE)
    school = models.ForeignKey(School, on_delete=models.CASCADE)
    iron_sheets_taken = models.IntegerField(default=0)
    cement_packs_taken = models.IntegerField(default=0)

    def __str__(self):
        return f"{self.school.name} - {self.iron_sheets_taken} iron sheets, {self.cement_packs_taken} cement packs"
