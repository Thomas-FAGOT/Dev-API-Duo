"""social_network URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import TokenRefreshView, TokenVerifyView

import api.views
from authen.views import *
from api.views import *
from authen.views import BlacklistRefreshView
from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

router = DefaultRouter()
router.register(r'users', UserViewSet, basename='user')
router.register(r'posts', PostViewSet, basename='post')

urlpatterns = [
                  path('admin/', admin.site.urls),
                  path('login/', MyObtainTokenPairView.as_view(), name='token_obtain_pair'),
                  path('logout/', BlacklistRefreshView.as_view()),
                  path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
                  path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
                  path('api/username/', ViewUsername.as_view()),
                  path("api/", include(router.urls)),
                  path('api/post/me/', PostViewUser.as_view()),
                  path('api/post/he/', PostViewThisUser.as_view()),
                  path('api/modif/post/', ModifyPost.as_view()),
                  path('register/', UserRegisterCreate.as_view()),
                  path('post/', PostView.as_view())

              ] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
