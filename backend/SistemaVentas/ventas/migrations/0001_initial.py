# Generated by Django 2.2.4 on 2020-11-09 18:38

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Category',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=50, unique=True)),
            ],
        ),
        migrations.CreateModel(
            name='Product',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=50, unique=True)),
                ('stock', models.IntegerField(default=0)),
                ('bar_code', models.IntegerField()),
                ('sell_price', models.FloatField()),
                ('base_price', models.FloatField()),
                ('min_stock', models.IntegerField()),
                ('category', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='productCategory', to='ventas.Category')),
            ],
        ),
        migrations.CreateModel(
            name='Provider',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=50, unique=True)),
                ('phone', models.IntegerField()),
                ('mail', models.CharField(max_length=100)),
            ],
        ),
        migrations.CreateModel(
            name='Sell',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('mount', models.IntegerField(default=0)),
                ('date', models.DateTimeField(auto_now_add=True)),
                ('SellProducts', models.ManyToManyField(default='', to='ventas.Product')),
            ],
        ),
        migrations.CreateModel(
            name='User',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=50, unique=True)),
                ('phone', models.IntegerField()),
                ('sells', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='ventas.Sell')),
            ],
        ),
        migrations.AddField(
            model_name='sell',
            name='seller',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='ventas.User'),
        ),
        migrations.AddField(
            model_name='product',
            name='provider',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='productProvider', to='ventas.Provider'),
        ),
    ]
