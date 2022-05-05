from rest_framework.views import APIView
from rest_framework import permissions, status, viewsets
from django.shortcuts import get_object_or_404
from rest_framework.response import Response

from .models import Portfolio
from .serializers import UserSerializerWithToken, UserSerializer, PortfolioSerializer

from .permissions import IsOwner

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
