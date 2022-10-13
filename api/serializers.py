import json

from rest_framework import serializers
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.reverse import reverse
from django.contrib.auth import get_user_model
from django_celery_beat.models import IntervalSchedule, PeriodicTask

from .models import Portfolio, Purchase
from .helpers import lookup

class UserSerializer(serializers.ModelSerializer):
    """
    User serializer without tokens
    """
    class Meta:
        model = get_user_model()
        fields = ['pk', 'email', 'username']

class UserSerializerWithToken(serializers.ModelSerializer):
    """
    User serializer with tokens
    """

    token = serializers.SerializerMethodField()
    password = serializers.CharField(write_only=True)

    def get_token(self, obj):

        refresh = RefreshToken.for_user(obj)

        return str(refresh.access_token)

    def create(self, validated_data):
        password = validated_data.pop('password', None)
        instance = self.Meta.model(**validated_data)
        if password is not None:
            instance.set_password(password)
        instance.save()
        return instance

    class Meta:
        model = get_user_model()
        fields = ('token', 'username', 'email' ,'password')

class PortfolioSerializer(serializers.ModelSerializer):
    holdings_url = serializers.SerializerMethodField(read_only=True)
    purchases_url = serializers.SerializerMethodField(read_only=True)
    alerts_url = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Portfolio
        fields = ['pk','name', 'holdings_url', 'purchases_url', 'alerts_url']

    def get_holdings_url(self, obj):
        request = self.context.get('request')
        if request is None:
            return None
        return reverse("holdings", kwargs={"pk": obj.pk}, request=request)

    def get_purchases_url(self, obj):
        request = self.context.get('request')
        if request is None:
            return None
        return reverse("portfolio_purchases", kwargs={"pk": obj.pk}, request=request)

    def get_alerts_url(self, obj):
        request = self.context.get('request')
        if request is None:
            return None
        return reverse("task_list", kwargs={"pk": obj.pk}, request=request)

#pylint: disable=W0223
class PortfolioHoldingsSerializer(serializers.Serializer):
    ticker = serializers.CharField(max_length=64)
    shares = serializers.IntegerField()

class PurchaseSerializer(serializers.ModelSerializer):
    owner = serializers.ReadOnlyField(source='portfolio.owner.username')

    class Meta:
        model = Purchase
        fields = ['pk','owner','ticker','portfolio', 'date', 'price', 'shares']

class PeriodicTaskSerializer(serializers.ModelSerializer):
    threshold = serializers.SerializerMethodField(read_only=True)
    price = serializers.SerializerMethodField(read_only=True)
    symbol = serializers.SerializerMethodField(read_only=True)
    type = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = PeriodicTask
        fields = ['pk', 'symbol', 'type', 'crontab', 'name', 'task', 'one_off', 'enabled', 'threshold', 'price', 'kwargs']

    def get_threshold(self, obj):
        return json.loads(obj.kwargs)['threshold']

    def get_symbol(self, obj):
        return json.loads(obj.kwargs)['symbol']

    def get_price(self, obj):
        symbol = self.get_symbol(obj)
        return lookup(symbol)['price']

    def get_type(self, obj):
        return json.loads(obj.kwargs)['type']


class IntervalScheduleSerializer(serializers.ModelSerializer):
    class Meta:
        model = IntervalSchedule
        fields = ['every', 'period']

class StockProfileSerializer(serializers.Serializer):
    country = serializers.CharField(max_length=16)
    currency = serializers.CharField(max_length=16)
    exchange = serializers.CharField(max_length=32)
    finnhubIndustry = serializers.CharField(max_length=32)
    ipo = serializers.DateField()
    logo = serializers.URLField(allow_blank=True)
    marketCapitalization = serializers.CharField(max_length=32)
    name = serializers.CharField(max_length=16)
    phone = serializers.CharField(max_length=32)
    shareOutstanding = serializers.DecimalField(max_digits = 24 ,decimal_places=2)
    ticker = serializers.CharField(max_length=16)
    weburl = serializers.URLField(allow_blank=True)
