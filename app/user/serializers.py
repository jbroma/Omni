from django.core import exceptions
from django.contrib.auth import get_user_model, authenticate, \
    password_validation
from django.utils.translation import ugettext_lazy as _
from django.utils import timezone

from rest_framework import serializers

from phonenumber_field.serializerfields import PhoneNumberField

from core.utils import EmailNotUniqueError
from core.models import Location


def perform_validation(password):
    """Run the password against validators"""
    errors = []

    try:
        password_validation.validate_password(password)
    except exceptions.ValidationError as e:
        errors = e.error_list

    if errors:
        raise serializers.ValidationError(errors)


def passwords_match(attrs, field_1='password', field_2='confirm_password'):
    """Check that both password match"""
    password_1 = attrs.get(field_1, None)
    password_2 = attrs.get(field_2, None)

    if not password_2:
        raise serializers.ValidationError(
            _("Missing confirm password"),
            code=f'password_missing_{field_2}'
        )

    if password_1 != password_2:
        raise serializers.ValidationError(
            _("Passwords do not match."),
            code='password_difference'
        )


def check_email_in_use(email):
    qs = get_user_model().objects.filter(email=email)
    if(qs):
        raise serializers.ValidationError(
            _("This e-mail is already in use by another user"),
            code='email_in_use'
        )


class PublicUserSerializer(serializers.ModelSerializer):
    """Serializer for nesting public user data"""
    date_created = serializers.DateTimeField(
        default_timezone=timezone.get_current_timezone()
    )

    class Meta:
        model = get_user_model()
        fields = (
            'id', 'name', 'picture', 'date_created'
        )


class UserSerializer(serializers.ModelSerializer):
    """Serializer for the user objects"""
    location = serializers.PrimaryKeyRelatedField(
        required=False,
        queryset=Location.objects.all(),
        allow_null=True
    )
    picture = serializers.ImageField(
        max_length=None, use_url=True
    )
    phone = PhoneNumberField(required=False)

    class Meta:
        model = get_user_model()
        fields = (
            'id', 'email', 'name',
            'phone', 'location', 'picture',
            'date_created'
        )
        extra_kwargs = {
            'id': {'read_only': True},
            'email': {'read_only': True},
            'name': {'read_only': True},
            'date_created': {'read_only': True}
        }


class DeleteUserSerializer(serializers.Serializer):
    """Serializer for deleting user personal data"""
    password = serializers.CharField(
        required=True,
        style={'input_type': 'password'}
    )
    confirm_password = serializers.CharField(
        required=True,
        style={'input_type': 'password'}
    )

    def validate(self, attrs):
        """Validate that both passwords match before deletion"""
        passwords_match(attrs)

        user = self.context.get('request').user
        if not user.check_password(attrs['password']):
            raise serializers.ValidationError(
                "Your password is incorrect",
                code='password_incorrect'
            )

        return attrs


class RegisterUserSerializer(serializers.ModelSerializer):
    """Serializer for creating new users"""
    confirm_password = serializers.CharField(
        style={'input_type': 'password'},
        trim_whitespace=False,
        required=False
    )
    location = serializers.PrimaryKeyRelatedField(
        required=False,
        queryset=Location.objects.all()
    )
    phone = PhoneNumberField(required=False)

    class Meta:
        model = get_user_model()
        fields = (
            'email', 'password', 'confirm_password', 'name',
            'phone', 'location', 'picture'
        )
        extra_kwargs = {
            'password': {
                'write_only': True,
                'style': {'input_type': 'password'}
            },
            'confirm_password': {
                'write_only': True,
                'style': {'input_type': 'password'}
            }
        }

    def validate(self, attrs):
        """Validates the password"""
        passwords_match(attrs)
        perform_validation(attrs['password'])
        check_email_in_use(attrs['email'])
        attrs.pop('confirm_password')
        return attrs

    def create(self, validated_data):
        """Create a new user with encrypted password and return it"""
        try:
            user = get_user_model().objects.create_user(**validated_data)
        except EmailNotUniqueError as e:
            raise serializers.ValidationError(
                _(str(e)),
                code='email_not_unique'
            )

        return user


class AuthTokenSerializer(serializers.Serializer):
    """Serializer for the user authentication object"""
    email = serializers.CharField()
    password = serializers.CharField(
        style={'input_type': 'password'},
        trim_whitespace=False
    )

    def validate(self, attrs):
        """Validate and authenticate the user"""
        email = attrs.get('email')
        password = attrs.get('password')

        user = authenticate(
            request=self.context.get('request'),
            username=email,
            password=password
        )
        if not user:
            msg = _('Unable to authenticate with provided credentials')
            raise serializers.ValidationError(msg, code='authentication')

        attrs['user'] = user
        return attrs


class PasswordChangeSerializer(serializers.Serializer):
    """Serializer for changing user's password"""
    old_password = serializers.CharField(
        required=True, style={'input_type': 'password'}
    )
    new_password_1 = serializers.CharField(
        required=True, style={'input_type': 'password'}
    )
    new_password_2 = serializers.CharField(
        required=True, style={'input_type': 'password'}
    )

    def validate(self, attrs):
        """Check if new password meets general password requirements"""
        user = self.context.get('request').user
        if not user.check_password(attrs['old_password']):
            raise serializers.ValidationError(
                "Your old password is incorrect",
                code='password_old_incorrect'
            )

        passwords_match(attrs, 'new_password_1', 'new_password_2')
        perform_validation(attrs['new_password_1'])
        return attrs

    def update(self, instance, validated_data):
        """Update the user's password"""
        instance.set_password(validated_data['new_password_1'])
        instance.save()

        return instance
