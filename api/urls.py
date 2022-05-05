from django.urls import path
from rest_framework_simplejwt.views import (
    TokenObtainPairView
)

from . import views

portfolio_list = views.PortfolioViewSet.as_view({
    'get':'list',
    'post':'create'
})

portfolio_detail = views.PortfolioViewSet.as_view({
    'get':'retrieve',
    'put':'update',
    'patch':'partial_update',
    'delete':'destroy'
})

urlpatterns = [
    path('portfolio/', portfolio_list, name='portfolio-list'),
    path('portfolio/<int:pk>', portfolio_detail, name='portfolio-detail'),
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('create_user/', views.CreateUser.as_view(), name='create_user'),
    path('user/', views.UserView.as_view(), name='get_user'),
]
