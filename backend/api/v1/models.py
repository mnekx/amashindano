from django.db import models

class Stock(models.Model):
    total_iron_sheets = models.IntegerField(default=1000)  # Set your fixed total
    total_cement_packs = models.IntegerField(default=500)  # Set your fixed total
    remaining_iron_sheets = models.IntegerField()
    remaining_cement_packs = models.IntegerField()

    def save(self, *args, **kwargs):
        if not self.pk:
            self.remaining_iron_sheets = self.total_iron_sheets
            self.remaining_cement_packs = self.total_cement_packs
        super().save(*args, **kwargs)
