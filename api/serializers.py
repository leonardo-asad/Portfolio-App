from rest_framework import serializers
from django.conf import settings
from rest_framework_simplejwt.tokens import RefreshToken

from .models import Portfolio

class UserSerializer(serializers.ModelSerializer):
    """
    User serializer without tokens
    """
    class Meta:
        model = settings.AUTH_USER_MODEL
        fields = ['id', 'username']

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
        model = settings.AUTH_USER_MODEL
        fields = ('token', 'username', 'email' ,'password')

class PortfolioSerializer(serializers.ModelSerializer):

    class Meta:
        model = Portfolio
        fields = ['pk','name']

#pylint: disable=W0223
class PortfolioHoldingsSerializer(serializers.Serializer):
    ticker = serializers.CharField(max_length=64)
    shares = serializers.IntegerField()
