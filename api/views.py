from rest_framework.views import APIView
from rest_framework import permissions, status
from rest_framework.response import Response

from .serializers import UserSerializerWithToken, UserSerializer

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
