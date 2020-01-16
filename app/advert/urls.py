from django.urls import path

from rest_framework.routers import DefaultRouter
from rest_framework.urlpatterns import format_suffix_patterns

from advert import views


router = DefaultRouter()

router.register('image', views.AdvertImageViewset, basename='image')
router.register('', views.AdvertViewset)

app_name = 'advert'

owner_pattern = [
    path(
        'owner/<int:pk>/',
        views.AdvertOwnerView.as_view(),
        name='owner'
    )
]

owner_pattern = format_suffix_patterns(owner_pattern)

urlpatterns = [*owner_pattern, *router.urls]
