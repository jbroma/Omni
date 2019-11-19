import re

from django.core.exceptions import ValidationError
from django.utils.translation import ugettext_lazy as _


class TokenCountValidator:
    """Base class for validating various tokens"""

    def __init__(self, **kwargs):
        self.token_count = kwargs.get('token_count', 1)
        self.regex = kwargs.get('regex', re.compile(r'.'))
        self.name = kwargs.get('name', 'tokens')
        self.code = kwargs.get('code', 'password_char')

    def validate(self, password, user=None):
        """Check password contains specified ammount of tokens"""
        if len(self.regex.findall(password)) < self.token_count:
            raise ValidationError(
                _("This password must contain at least "
                  "%(token_count)d %(name)s"),
                code=self.code,
                params={
                    'token_count': self.token_count,
                    'name': self.name
                    }
            )

    def get_help_text(self):
        return _(
            "Your password must contain at least "
            "%(token_count)d %(name)s" % {
                'token_count': self.token_count,
                'name': self.name
            }
        )


class SpecialCharacterValidator(TokenCountValidator):
    """Validate that password contains specified ammount of special chars"""

    def __init__(self, count):
        super().__init__(
            token_count=count,
            regex=re.compile(r'[#?!@$%^&*-]'),
            name="special characters",
            code="password_special_characters"
        )


class NumberValidator(TokenCountValidator):
    """Validate that password contains specified ammount of numbers"""

    def __init__(self, count):
        super().__init__(
            token_count=count,
            regex=re.compile(r'\d'),
            name="numbers",
            code="password_numbers"
        )


class LowercaseValidator(TokenCountValidator):
    """Validate that password contains specified ammount of lowercase chars"""

    def __init__(self, count):
        super().__init__(
            token_count=count,
            regex=re.compile(r'[a-z]'),
            name="lowercase characters",
            code="password_lowercase"
        )


class UppercaseValidator(TokenCountValidator):
    """Validate that password contains specified ammount of uppercase chars"""

    def __init__(self, count):
        super().__init__(
            token_count=count,
            regex=re.compile(r'[A-Z]'),
            name="uppercase characters",
            code="password_uppercase"
        )
