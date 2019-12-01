from rest_framework import serializers
from rest_framework.reverse import reverse

from core.models import (
    Category, Location, Advert, AdvertImage, AdvertImageLink
)


class CategoryListSerializer(serializers.ModelSerializer):
    """Serializer for listing categories"""
    subcategories = serializers.SerializerMethodField()
    url = serializers.SerializerMethodField()

    class Meta:
        model = Category
        fields = ('id', 'name', 'url', 'subcategories')

    def get_subcategories(self, obj):
        subcategories = Category.objects.filter(parent=obj)
        return CategoryListSerializer(
            subcategories, many=True, context=self.context
        ).data

    def get_url(self, obj):
        # this needs a rework, defining custom action?
        request = self.context.get('request')
        view_url = reverse('advert:advert-list', request=request)
        return f"{view_url}?category__id={obj.id}/"


class LocationListSerializer(serializers.ModelSerializer):
    """Serializer for listing locations"""
    url = serializers.SerializerMethodField()

    class Meta:
        model = Location
        fields = ('id', 'name', 'url')

    def get_url(self, obj):
        request = self.context.get('request')
        view_url = reverse('advert:advert-list', request=request)
        return f"{view_url}?location__id={obj.id}/"


class AdvertImageSerializer(serializers.ModelSerializer):
    """Serializer for a single Advert Image instance"""
    image = serializers.ImageField(max_length=None, use_url=True)
    thumbnail = serializers.ImageField(
        max_length=None, use_url=True, read_only=True
    )

    class Meta:
        model = AdvertImage
        fields = ('id', 'image', 'thumbnail')
        read_only_fields = ('id',)


class AdvertListSerializer(serializers.HyperlinkedModelSerializer):
    """Serializer for listing adverts"""
    category = serializers.PrimaryKeyRelatedField(read_only=True)
    location = serializers.PrimaryKeyRelatedField(read_only=True)
    thumbnail = serializers.SerializerMethodField()

    class Meta:
        model = Advert
        fields = (
            'id', 'title', 'category', 'price', 'location',
            'date_refreshed', 'thumbnail', 'url'
        )
        extra_kwargs = {
            'url': {'view_name': 'advert:advert-detail'},
        }

    def get_thumbnail(self, obj):
        try:
            advert_image_link = AdvertImageLink.objects.get(
                advert__id=obj.id, slot=0
            )
        except AdvertImageLink.DoesNotExist:
            return None

        req = self.context.get('request')
        return req.build_absolute_uri(advert_image_link.image.thumbnail.url)


class AdvertRetrieveSerializer(serializers.ModelSerializer):
    """Serializer for single Advert instance"""
    images = serializers.SerializerMethodField()

    class Meta:
        model = Advert
        fields = (
            'id', 'title', 'category', 'price', 'location',
            'content', 'date_created', 'date_refreshed', 'images'
        )
        read_only_fields = ('id', 'date_created', 'date_refreshed')

    def get_images(self, obj):
        images = AdvertImage.objects.filter(
            advertimagelink__advert=obj
        ).order_by('advertimagelink__slot')

        image_list = [advert_image.image.url for advert_image in images]
        return image_list


class AdvertCreateUpdateSerializer(serializers.ModelSerializer):
    """Serializer for creating new Adverts"""
    images = serializers.PrimaryKeyRelatedField(
         many=True, required=False, write_only=True,
         queryset=AdvertImage.objects.all()
    )

    class Meta:
        model = Advert
        fields = (
            'id', 'title', 'category', 'price', 'location',
            'content', 'date_created', 'date_refreshed', 'images'
        )
        read_only_fields = ('id', 'date_created', 'date_refreshed')

    def create(self, validated_data):
        """Create new Advert and associate images with the Ad"""
        images = validated_data.pop('images', [])
        advert = super().create(validated_data)

        for index, image in enumerate(images):
            AdvertImageLink.objects.create(
                advert=advert,
                image=image,
                slot=index
            )

        return advert

    def update(self, instance, validated_data):
        """Update an existing Advert and reassociate images"""
        images = validated_data.pop('images', None)
        updated_instance = super().update(instance, validated_data)

        if images is None:
            return updated_instance

        existing_links = AdvertImageLink.objects.filter(
            advert=updated_instance
        )

        for link in existing_links:
            link.delete()

        for index, image in enumerate(images):
            AdvertImageLink.objects.create(
                advert=updated_instance,
                image=image,
                slot=index
            )

        return updated_instance
