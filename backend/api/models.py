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
    served_schools = models.ManyToManyField(School, blank=True)  # Schools served by this stock

    def save(self, *args, **kwargs):
        if not self.pk:
            self.remaining_iron_sheets = self.total_iron_sheets
            self.remaining_cement_packs = self.total_cement_packs
        super().save(*args, **kwargs)
