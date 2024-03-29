from logging import raiseExceptions
import os
import json
import datetime
from django.http import HttpResponse
from rest_framework import permissions, status, viewsets, generics
from django.shortcuts import get_object_or_404
from django.db.models import Sum
from rest_framework.views import APIView
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.response import Response

from backend import settings
from .models import Portfolio, Purchase
from django_celery_beat.models import PeriodicTask, CrontabSchedule
from .serializers import UserSerializerWithToken, UserSerializer, \
     PortfolioSerializer, PortfolioHoldingsSerializer, PurchaseSerializer, \
     PeriodicTaskSerializer, SearchResultSerializer
from .permissions import IsOwner
from .helpers import lookup, get_profile, search_stock

class CreateUser(APIView):
    """
    Create a new user.
    """
    permission_classes = (permissions.AllowAny,)

    def post(self, request):
        serializer = UserSerializerWithToken(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class UserView(APIView):
    """
    View a single user.
    """
    def get(self, request):
        serializer = UserSerializer(request.user)

        return Response(serializer.data)

class PortfolioViewSet(viewsets.ModelViewSet):
    """
    View User's Portfolios and Create a new one
    """
    queryset = Portfolio.objects.all()
    serializer_class = PortfolioSerializer

    # Only authenticated users are allowed to see their own portfolios
    permission_classes = [permissions.IsAuthenticated,IsOwner]

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

    def get_object(self):
        obj = get_object_or_404(self.queryset, pk=self.kwargs["pk"])
        self.check_object_permissions(self.request, obj)
        return obj

    def get_queryset(self):
        # Filter portfolios by its owner and return the queryset
        self.check_permissions(self.request)
        owner_queryset = self.queryset.filter(owner=self.request.user)
        return owner_queryset

@api_view(["GET"])
def HoldingsView(request, pk):
    """
    View Portfolio's holdings
    """
    # Filter portfolios by its owner
    try:
        portfolio = Portfolio.objects.get(pk=pk)
    except Portfolio.DoesNotExist:
        return Response({"detail": "Not found"}, status=status.HTTP_404_NOT_FOUND)

    if not portfolio.owner == request.user:
        return Response({
            "detail": "You do not have permission to perform this action."
            }, status=status.HTTP_403_FORBIDDEN)

    holdings = portfolio.purchases.values(
        'ticker').annotate(shares=Sum('shares')).filter(shares__gt=0)

    serializer = PortfolioHoldingsSerializer(holdings, many=True)

    holdings = list(serializer.data)

    for asset in holdings:
        print(f"Getting data from Symbol: {asset['ticker']}")
        response = lookup(asset['ticker'])

        if response is None:
            asset['price'] = ''
            asset['change'] = ''
            asset['change_percent'] = ''
        else:
            asset['price'] = response['price']
            asset['change'] = response['change']
            asset['change_percent'] = response['change_percent']
    return Response(holdings)

class PurchasesListViewSet(viewsets.ModelViewSet):
    """
    View Portfolio's Purchases
    """
    queryset = Portfolio.objects.all()
    serializer_class = PurchaseSerializer
    permission_classes = [permissions.IsAuthenticated,
                          IsOwner]

    def get_object(self):
        obj = get_object_or_404(self.queryset, pk=self.kwargs["pk"])
        self.check_object_permissions(self.request, obj)
        return obj

    def get_queryset(self):
        portfolio = self.get_object()

        return portfolio.purchases.order_by('-date')

@api_view(["GET", "POST"])
def PurchaseCreateView(request):
    """
    Save a new Purchase
    """
    if request.method == "GET":
        queryset = Purchase.objects.filter(portfolio__owner = request.user)
        serializer = PurchaseSerializer(queryset, many=True)

        return Response(serializer.data)

    if request.method == "POST":
        purchase = request.data

        purchase['date'] = datetime.date.today()

        purchase['ticker']= purchase['ticker'].upper()

        quote = lookup(purchase['ticker'])

        if quote is None:
            return Response({"detail": "Finhub API is not responding. Please try againg."},
                             status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        if quote['price'] == 0:
            return Response({"detail": "Invalid Symbol"},
                            status=status.HTTP_400_BAD_REQUEST)

        purchase['price'] = quote['price']

        serializer = PurchaseSerializer(data=purchase)

        if serializer.is_valid(raise_exception=True):

            shares = int(serializer.validated_data['shares'])
            ticker = serializer.validated_data['ticker']
            portfolio = serializer.validated_data['portfolio']

            if shares < 0:
                portfolio = Portfolio.objects.get(pk=portfolio.pk)

                check_balance = portfolio.check_balance(ticker, shares)

                if check_balance:
                    serializer.save()
                    return Response(serializer.data, status=status.HTTP_201_CREATED)

                return Response(
                    {"detail": "Not enough balance"},
                    status=status.HTTP_400_BAD_REQUEST
                    )
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(["GET"])
@permission_classes([permissions.AllowAny])
def StockProfileView(request):
    if request.method == "GET":
        try:
            symbol = request.query_params["symbol"]
        except:
            return Response({"detail": "Bad Symbol Request"},
                            status=status.HTTP_400_BAD_REQUEST)

        profile = get_profile(symbol)

        if profile == None:
            return Response({"detail": "Finhub API is not responding. Please try againg."},
                             status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        return Response(profile, status.HTTP_200_OK)

@api_view(["GET"])
@permission_classes([permissions.AllowAny])
def StockSearchView(request):
    if request.method == "GET":
        try:
            query = request.query_params["query"]
        except:
            return Response({"detail": "Bad Query Request"},
                            status=status.HTTP_400_BAD_REQUEST)

        result = search_stock(query)

        if result == None:
            return Response({"detail": "Finhub API is not responding. Please try againg."},
                             status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        result_serialized = SearchResultSerializer(data=result, many=True)

        if result_serialized.is_valid(raise_exception=True):
            return Response(result_serialized.data, status=status.HTTP_200_OK)

        return Response(result_serialized.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(["GET"])
def periodic_task_list(request, pk):
    if request.method == "GET":
        queryset = PeriodicTask.objects.all()
        queryset_filtered = [periodic_task for periodic_task in queryset if 'username' in periodic_task.kwargs]
        queryset_filtered = [periodic_task for periodic_task in queryset_filtered if json.loads(periodic_task.kwargs)['user_pk'] == request.user.pk]
        queryset_filtered = [periodic_task for periodic_task in queryset_filtered if json.loads(periodic_task.kwargs)['portfolio_pk'] == pk]

        serializer = PeriodicTaskSerializer(queryset_filtered, many=True)

        return Response(serializer.data)

@api_view(["POST"])
def periodic_task_create(request):
    if request.method == "POST":
        try:
            last_instance = PeriodicTask.objects.last()
            last_pk = last_instance.pk
            unique_name = last_pk + 1
        except:
            unique_name = 1

        schedule, _ = CrontabSchedule.objects.get_or_create(
            minute='30',
            hour='21',
            day_of_week='1-5',
            day_of_month='*',
            month_of_year='*',
        )

        new_task = {
            "crontab":schedule.pk,
            "name": unique_name,
            "task": "check_price",
            "one_off": False,
            "enabled": True,
            "kwargs": json.dumps(request.data)
        }

        serializer = PeriodicTaskSerializer(data=new_task)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class PeriodicTaskDetail(generics.RetrieveDestroyAPIView):
    queryset = PeriodicTask.objects.all()
    serializer_class = PeriodicTaskSerializer

# View to return the static front-end code
def index(request):
    try:
        with open(os.path.join(settings.REACT_APP_DIR, 'build', 'index.html'), encoding="utf-8") as f:
            return HttpResponse(f.read())
    except FileNotFoundError:
        return HttpResponse(
            """
            Please build the front-end using cd frontend && npm install && npm run build
            """,
            status=501,
        )
