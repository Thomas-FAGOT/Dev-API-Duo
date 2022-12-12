import datetime
import re

import rest_framework.status
from django.shortcuts import get_object_or_404
from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.exceptions import ParseError
from rest_framework.parsers import FileUploadParser
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView

from api.serializer import *
from post.models import *


class PostViewThisUser(APIView):
    permission_classes = (IsAuthenticated,)

    def put(self, request):
        user = User.objects.all().get(id=request.data['id'])
        queryset = list(Post.objects.filter(user=user))
        context = {'request': request}
        serializer = []
        for post in queryset:
            serializer.append((PostSerializer(queryset, many=True, context=context).data))
        print(serializer)
        return Response(serializer)






class UserViewSet(viewsets.ViewSet):
    """
    A simple ViewSet for listing or retrieving users.
    """

    def list(self, request):
        queryset = User.objects.all()
        serializer = UserSerializer(queryset, many=True)
        return Response(serializer.data)

    def retrieve(self, request, pk=None):
        queryset = User.objects.all()
        user = get_object_or_404(queryset, pk=pk)
        serializer = UserSerializer(user)
        return Response(serializer.data)


class ViewUsername(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request):
        user = request.user
        return Response({
            'username': user.username
        })


class ModifyPost(APIView):
    permission_classes = (IsAuthenticated,)

    def put(self, request):
        user = request.user
        id = request.data['id']
        content = None
        file = None
        post = Post.objects.all().get(id=id)
        if post.user == user:
            res = ""
            try:
                if request.data['content']:
                    post.content = request.data['content']
                    res = 'Contenu modifié (Texte)'
            except KeyError:
                res = 'Contenu non modifié'
            try:
                if request.data['file'] != 'undefined':
                    post.image = request.data['file']
                    if res == 'Contenu modifié (Texte)':
                        res += ' + (Img)'
                    else:
                        res = 'Contenu modifié (Img)'
            except KeyError:
                res += ' Image non modifiée'
            post.save()
            return Response(res, status=rest_framework.status.HTTP_200_OK)
        else:
            return Response("Vous n'avez pas le droit de modifier ce post",
                            status=rest_framework.status.HTTP_401_UNAUTHORIZED)

class DeletePost(APIView):
    permission_classes = (IsAuthenticated,)
    def put(self, request):
        user = request.user
        id = request.data['id']
        content = None
        file = None
        post = Post.objects.all().get(id=id)
        if post.user == user:
            post.delete()
            return Response("Post supprimé", status=rest_framework.status.HTTP_200_OK)
        else:
            return Response("Vous n'avez pas le droit de supprimer ce post",
                            status=rest_framework.status.HTTP_401_UNAUTHORIZED)


from rest_framework import permissions
from rest_framework.generics import CreateAPIView
from django.contrib.auth import get_user_model  # If used custom user model


class CreateUserView(APIView):
    permission_classes = (AllowAny,)  # Or anon users can't register
    def post(self,request):
        print(request.data['username'])
        if len(User.objects.all().filter(username=request.data['username'])) == 1:
            return Response('Username already exists', status=rest_framework.status.HTTP_401_UNAUTHORIZED)
        try:
            model = get_user_model()
            serializer_class = UserSerializer
        except Exception as e:
            print(e)


class PostViewThisUser(APIView):
    permission_classes = (IsAuthenticated,)
    def put(self, request):
        user = User.objects.all().get(id=request.data['id'])
        queryset = list(Post.objects.filter(user=user))
        context = {'request': request}
        serializer = []
        for post in queryset:
            serializer.append((PostSerializer(queryset, many=True, context=context).data))
        print(serializer)
        return Response(serializer)



class PostViewUser(APIView):
    permission_classes = (IsAuthenticated,)
    def get(self, request):
        queryset = list(Post.objects.filter(user=request.user))
        context = {'request': request}
        serializer = []
        for post in queryset:
            serializer.append((PostSerializer(queryset, many=True, context=context).data))
        print(serializer)
        return Response(serializer)


class PostViewSet(viewsets.ViewSet):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    permission_classes = (IsAuthenticated,)

    @action(detail=True, methods=['post'])
    def upload_docs(self, request):
        try:
            file = request.data['file']
        except KeyError:
            raise ParseError('Request has no resource file attached')
        post = Post.objects.create()
        post.image = file
        post.content = request.data['content']
        post.user = request.user

    def list(self, request):
        queryset = Post.objects.all()
        context = {'request': request}
        serializer = PostSerializer(queryset, many=True, context=context)
        return Response(serializer.data)

    def retrieve(self, request, pk=None):
        queryset = Post.objects.all()
        user = get_object_or_404(queryset, pk=pk)
        context = {'request': request}
        serializer = PostSerializer(user, context=context)
        return Response(serializer.data)


class UserViewSet(viewsets.ViewSet):
    """
    A simple ViewSet for listing or retrieving users.
    """

    def list(self, request):
        queryset = User.objects.all()
        serializer = UserSerializer(queryset, many=True)
        return Response(serializer.data)

    def retrieve(self, request, pk=None):
        queryset = User.objects.all()
        user = get_object_or_404(queryset, pk=pk)
        serializer = UserSerializer(user)
        return Response(serializer.data)


class ViewUsername(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request):
        user = request.user
        return Response({
            'username': user.username
        })

class UserRegisterCreate(CreateAPIView):
    permission_classes = (rest_framework.permissions.AllowAny,)
    queryset = User.objects.all()
    serializer_class = UserRegisterSerializer


class PostView(APIView):
    permission_classes = (IsAuthenticated, )

    def post(self,request):
        new_post = Post()
        new_post.user = request.user
        new_post.image = request.data['file']
        print(request.data['file'])
        new_post.image.name = f"{request.user}_post_{len(Post.objects.all()) + 1}.png"
        new_post.content = request.data['content']
        new_post.date = datetime.datetime.today()
        new_post.save()
        return Response('Post créé')

