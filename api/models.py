from django.db import models
from django.db.models import Sum
from django.conf import settings

class Portfolio(models.Model):
    owner = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        related_name="portfolios",
        on_delete=models.CASCADE
        )
    name = models.CharField(max_length=24)

    def __str__(self):
        return f"Id: {self.pk}. Portfolio name: {self.name}"

    def check_balance(self, ticker, shares):
        balance = self.purchases.values(
            'ticker').annotate(shares=Sum('shares')).filter(ticker=ticker)
        if not balance.exists():
            return True
        if balance[0]['shares'] >= abs(int(shares)):
            return True
        return False


class Purchase(models.Model):
    portfolio = models.ForeignKey(Portfolio, on_delete=models.CASCADE, related_name="purchases")
    ticker = models.CharField(max_length=64)
    date = models.DateField()
    price = models.FloatField()
    shares = models.IntegerField()

    def __str__(self):
        return f"Asset ticker: {self.ticker}. Amount: {self.shares} shares"
