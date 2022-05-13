from rest_framework import serializers
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.reverse import reverse
from django.contrib.auth import get_user_model

from .models import Portfolio, Purchase

class UserSerializer(serializers.ModelSerializer):
    """
    User serializer without tokens
    """
    class Meta:
        model = get_user_model()
        fields = ['id', 'email', 'username']

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

    class Meta:
        model = Portfolio
        fields = ['pk','name', 'holdings_url', 'purchases_url']

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

#pylint: disable=W0223
class PortfolioHoldingsSerializer(serializers.Serializer):
    ticker = serializers.CharField(max_length=64)
    shares = serializers.IntegerField()

class PurchaseSerializer(serializers.ModelSerializer):
    owner = serializers.ReadOnlyField(source='portfolio.owner.username')

    class Meta:
        model = Purchase
        fields = ['pk','owner','ticker','portfolio', 'date', 'price', 'shares']
