from django.contrib.auth.models import User
from django.core.validators import FileExtensionValidator
from rest_framework import serializers

from post.models import Post


class PostSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Post
        fields  = '__all__'

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username')

