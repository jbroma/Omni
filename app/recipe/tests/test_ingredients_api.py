from django.contrib.auth import get_user_model
from django.urls import reverse
from django.test import TestCase

from rest_framework import status
from rest_framework.test import APIClient

from core.models import Ingredient, Recipe

from recipe.serializers import IngredientSerializer


INGREDIENT_URL = reverse('recipe:ingredient-list')


class PublicIngredientApiTests(TestCase):
    """Test the publicly available ingredients API"""

    def setUp(self):
        self.client = APIClient()

    def test_login_required(self):
        """Test that login is required to access the ingredient API"""
        res = self.client.get(INGREDIENT_URL)

        self.assertEqual(res.status_code, status.HTTP_401_UNAUTHORIZED)


class PrivateIngredientApiTests(TestCase):
    """Test the ingredients API for the authorized users"""

    def setUp(self):
        self.client = APIClient()
        self.user = get_user_model().objects.create_user(
            email='test@company.com',
            password='test1234',
            name='Doug Kempinsky'
        )
        self.client.force_authenticate(self.user)

    def test_retrieve_ingredient_list(self):
        """Test that authenticated user can retrieve ingredient list"""
        Ingredient.objects.create(user=self.user, name='Cucumber')
        Ingredient.objects.create(user=self.user, name='Tomato')

        res = self.client.get(INGREDIENT_URL)
        ingredients = Ingredient.objects.all().order_by('-name')
        serializer = IngredientSerializer(ingredients, many=True)

        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(res.data, serializer.data)

    def test_ingredients_limited_to_user(self):
        """Test that user can only retrieve his own ingredients"""
        user2 = get_user_model().objects.create_user(
            email='user2@company.com',
            password='test7890'
        )
        ingredient = Ingredient.objects.create(user=self.user, name='Salt')
        Ingredient.objects.create(user=user2, name='Pepper')

        res = self.client.get(INGREDIENT_URL)

        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(len(res.data), 1)
        self.assertEqual(res.data[0]['name'], ingredient.name)

    def test_create_ingredient_succesful(self):
        """Test creation of a new ingredient"""
        payload = {
            'name': 'Vinegar'
        }
        res = self.client.post(INGREDIENT_URL, payload)

        new_ingredient_exists = Ingredient.objects.filter(
            user=self.user,
            name=payload['name']
        ).exists()

        self.assertEqual(res.status_code, status.HTTP_201_CREATED)
        self.assertTrue(new_ingredient_exists)

    def test_creating_invalid_ingredient_fails(self):
        """Test creation of a new ingredient with invalid payload fails"""
        payload = {
            'name': ''
        }
        res = self.client.post(INGREDIENT_URL, payload)

        self.assertEqual(res.status_code, status.HTTP_400_BAD_REQUEST)

    def test_retrieve_ingredients_assigned_to_recipes(self):
        """Test filtering ingredients by those assigned to recipes"""
        ingredient1 = Ingredient.objects.create(
            user=self.user, name='Apples'
        )
        ingredient2 = Ingredient.objects.create(
            user=self.user, name='Cabbage'
        )
        recipe1 = Recipe.objects.create(
            title='Fruity Porridge',
            time_minutes=5,
            price=1.50,
            user=self.user
        )
        recipe1.ingredients.add(ingredient1)
        res = self.client.get(INGREDIENT_URL, {'assigned_only': 1})

        serializer1 = IngredientSerializer(ingredient1)
        serializer2 = IngredientSerializer(ingredient2)

        self.assertIn(serializer1.data, res.data)
        self.assertNotIn(serializer2.data, res.data)

    def test_retrieve_ingredients_assigned_unique(self):
        """Test that filtering assigned ingredients returns unique matches"""
        ingredient1 = Ingredient.objects.create(user=self.user, name='Onion')
        Ingredient.objects.create(user=self.user, name='Beef')
        recipe1 = Recipe.objects.create(
            title='Gong-bao chicken',
            time_minutes=25,
            price=10.00,
            user=self.user
        )
        recipe2 = Recipe.objects.create(
            title='Chicken tikka',
            time_minutes=35,
            price=12.50,
            user=self.user
        )
        recipe1.ingredients.add(ingredient1)
        recipe2.ingredients.add(ingredient1)

        res = self.client.get(INGREDIENT_URL, {'assigned_only': 1})

        self.assertEqual(len(res.data), 1)
