from django.contrib.auth.hashers import make_password
from django.contrib.auth.models import User
from django.core.validators import FileExtensionValidator
from rest_framework import serializers

from post.models import Post


class PostSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Post
        fields  = '__all__'

from rest_framework import serializers
from django.contrib.auth import get_user_model # If used custom user model

UserModel = get_user_model()


class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    def create(self, validated_data):
        print('AAAAAAAAAAAAAAAAAAAAAA')
        try:
            print('try')
            user = User.objects.create_user(
                username=validated_data['username'],
                password=validated_data['password'],
            )

            return user
        except Exception as e:
            print('Caatch')
            print(e)

    class Meta:
        model = User
        # Tuple of serialized model fields (see link [2])
        fields = ( "id", "username", "password", 'email' )


class UserRegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username', 'first_name', 'last_name', 'email', 'password')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        validated_data['password'] = make_password(validated_data.get('password'))
        return super(UserRegisterSerializer, self).create(validated_data)

