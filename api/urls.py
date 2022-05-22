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

portfolio_purchases_list = views.PurchasesListViewSet.as_view({
    'get':'list',
})

urlpatterns = [
    path('tasks/', views.periodic_task_create, name="tasks_create"),
    path('portfolio/tasks/<int:pk>/', views.periodic_task_list, name="task_list"),
    path('portfolio/purchases/', views.PurchaseCreateView, name="create_purchase"),
    path('portfolio/purchases/<int:pk>', portfolio_purchases_list, name='portfolio_purchases'),
    path('portfolio/holdings/<int:pk>', views.HoldingsView, name='holdings'),
    path('portfolio/', portfolio_list, name='portfolio-list'),
    path('portfolio/<int:pk>', portfolio_detail, name='portfolio-detail'),
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('create_user/', views.CreateUser.as_view(), name='create_user'),
    path('user/', views.UserView.as_view(), name='get_user'),
]
