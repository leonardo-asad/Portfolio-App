from django.urls import path
from rest_framework_simplejwt.views import (
    TokenObtainPairView
)

from . import views

urlpatterns = [
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('create_user/', views.CreateUser.as_view(), name='create_user'),
]
