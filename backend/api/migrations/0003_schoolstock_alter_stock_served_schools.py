# Generated by Django 5.1.1 on 2024-10-05 19:12

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("api", "0002_school_stock_served_schools"),
    ]

    operations = [
        migrations.CreateModel(
            name="SchoolStock",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("iron_sheets_taken", models.IntegerField(default=0)),
                ("cement_packs_taken", models.IntegerField(default=0)),
                (
                    "school",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE, to="api.school"
                    ),
                ),
                (
                    "stock",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE, to="api.stock"
                    ),
                ),
            ],
        ),
        migrations.AlterField(
            model_name="stock",
            name="served_schools",
            field=models.ManyToManyField(
                related_name="served_schools",
                through="api.SchoolStock",
                to="api.school",
            ),
        ),
    ]
