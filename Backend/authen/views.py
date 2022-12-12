from django.shortcuts import render

# Create your views here.
# Create your views here.
from django.http import HttpResponse
from rest_framework import generics, permissions, status
from rest_framework.decorators import api_view
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.token_blacklist.management.commands import flushexpiredtokens
from rest_framework_simplejwt.token_blacklist.models import OutstandingToken, BlacklistedToken
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.tokens import RefreshToken, AccessToken

from authen.serializers import MyTokenObtainPairSerializer


class MyObtainTokenPairView(TokenObtainPairView):
    permission_classes = (AllowAny,)
    serializer_class = MyTokenObtainPairSerializer




class BlacklistRefreshView(APIView):
    permission_classes = (IsAuthenticated,)

    def post(self, request):
        token = RefreshToken(request.data.get('refresh'))
        test = OutstandingToken(token)
        token.blacklist()
        return Response("Success")

class LogoutView(APIView):
    permission_classes = (IsAuthenticated,)
    def post(self, request):
        try:
            ref_token = RefreshToken(token=request.data.get('refresh'))
            print(ref_token.verify())
            ref_token.blacklist()
            ref_token = None
            return Response(status=status.HTTP_205_RESET_CONTENT)
        except Exception as e:
            return Response(str(e) + "Mauvaise requête, Refresh token demandé",status=status.HTTP_400_BAD_REQUEST)



