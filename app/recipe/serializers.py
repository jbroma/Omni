from rest_framework.serializers import ModelSerializer

from core.models import Tag, Ingredient


class TagSerializer(ModelSerializer):
    """Serializer for tag objects"""

    class Meta:
        model = Tag
        fields = ('id', 'name')


class IngredientSerializer(ModelSerializer):
    """Serializer for ingredient objects"""

    class Meta:
        model = Ingredient
        fields = ('id', 'name')
