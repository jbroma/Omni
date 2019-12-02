from django.shortcuts import get_object_or_404
from django.utils import timezone

from rest_framework import generics, viewsets, mixins, status
from rest_framework.response import Response
from rest_framework.authentication import TokenAuthentication
from rest_framework.decorators import action
from rest_framework.permissions import (
    IsAuthenticatedOrReadOnly, AllowAny, IsAuthenticated
)

from django_filters import rest_framework as filters

from advert.filters import AdvertFilterSet

from core.models import Advert, Category, Location, AdvertImage

from advert.permissions import (
    IsAdvertOwnerOrReadOnly, IsAdvertImageOwnerOrReadOnly
)
from advert.serializers import (
    CategoryListSerializer, LocationListSerializer,
    AdvertListSerializer, AdvertRetrieveSerializer,
    AdvertCreateUpdateSerializer, AdvertImageSerializer
)


class CategoryListView(generics.ListAPIView):
    """View for listing all categories"""
    serializer_class = CategoryListSerializer
    permission_classes = (AllowAny,)
    queryset = Category.objects.filter(parent=None)


class LocationListView(generics.ListAPIView):
    """View for listing all locations"""
    serializer_class = LocationListSerializer
    permission_classes = (AllowAny,)
    queryset = Location.objects.all()


class AdvertViewset(viewsets.ModelViewSet):
    """Viewset for all actions associated with Adverts"""
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticatedOrReadOnly, IsAdvertOwnerOrReadOnly)
    queryset = Advert.objects.all()
    filter_backends = (filters.DjangoFilterBackend,)
    filterset_class = AdvertFilterSet

    def get_serializer_class(self):
        """Return appropiate serializer for action"""
        if self.action in ['list', 'owned']:
            return AdvertListSerializer

        if self.action in ['create', 'update', 'partial_update']:
            return AdvertCreateUpdateSerializer

        if self.action in ['refresh']:
            return None

        return AdvertRetrieveSerializer

    def get_queryset(self):
        """Limit queryset to own adverts in case of owned action"""
        queryset = self.queryset

        if self.action == 'owned':
            queryset.filter(user=self.request.user)

        return queryset.order_by('-date_refreshed')

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    @action(detail=False, name='owned', methods=['GET'],
            permission_classes=(IsAuthenticated,))
    def owned(self, request, *args, **kwargs):
        """List owned adverts"""
        return self.list(request, *args, **kwargs)

    @action(detail=True, name='refresh', methods=['PATCH'])
    def refresh(self, request, pk=None):
        """Refresh a specified advert"""
        qs = self.get_queryset()
        instance = get_object_or_404(qs, pk=pk)
        date_now = timezone.now()
        date_diff = date_now - instance.date_refreshed

        if date_diff.days < 7:
            return Response(status=status.HTTP_403_FORBIDDEN)

        instance.date_refreshed = date_now
        instance.save()
        return Response(status=status.HTTP_200_OK)


class AdvertImageViewset(mixins.CreateModelMixin,
                         mixins.DestroyModelMixin,
                         viewsets.GenericViewSet):
    """Viewset for managing Advert Images"""
    authentication_classes = (TokenAuthentication,)
    permission_classes = (
        IsAuthenticatedOrReadOnly, IsAdvertImageOwnerOrReadOnly
    )
    serializer_class = AdvertImageSerializer
    queryset = AdvertImage.objects.all()
