from django.contrib.auth.models import User
from django.core.validators import FileExtensionValidator
from django.db import models


# Create your models here.
class Post(models.Model):
    date = models.DateField(auto_created=True)
    image = models.ImageField(upload_to=r'images/', validators=[FileExtensionValidator(['png'], message='Only png')])
    content = models.CharField(max_length=255)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
