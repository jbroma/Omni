from django.urls import path, include

from rest_framework.routers import DefaultRouter

from advert import views


router = DefaultRouter()

router.register('image', views.AdvertImageViewset, basename='image')
router.register('', views.AdvertViewset)

app_name = 'advert'

urlpatterns = router.urls
