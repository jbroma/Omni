from django.utils.translation import ugettext_lazy as _

from rest_framework import serializers

from core.models import Conversation, Message, Advert


class MessageSerializer(serializers.ModelSerializer):
    """Serializer for retrieving messages"""

    class Meta:
        model = Message
        fields = (
            'sender', 'date', 'content'
        )


class CreateMessageSerializer(serializers.Serializer):
    """Serializer for creating new messages"""
    advert = serializers.PrimaryKeyRelatedField(
        required=False, queryset=Advert.objects.all()
    )
    conversation = serializers.PrimaryKeyRelatedField(
        required=False, queryset=Conversation.objects.all()
    )
    content = serializers.CharField(
        max_length=10000,
        allow_blank=False,
        trim_whitespace=True,
        required=True,
    )
    date = serializers.DateTimeField(read_only=True)

    def validate_advert(self, advert):
        """Check advert exists, and is not owned by user"""
        user = self.context.get('request').user

        if advert.user == user:
            raise serializers.ValidationError(
                _("User is both the sender and recipient"),
                code='message_user_loop'
            )

        return advert

    def validate_conversation(self, conversation):
        """Check conversation exists and user is part of it"""
        user = self.context.get('request').user

        if (conversation.user_1 != user) and (conversation.user_2 != user):
            raise serializers.ValidationError(
                _("User is not a part of the conversation"),
                code='message_forbidden_conversation'
            )

        return conversation

    def validate(self, attrs):
        """Validate that either advert or conversation is present"""
        advert = attrs.get('advert', None)
        conversation = attrs.get('conversation', None)

        if not advert and not conversation:
            raise serializers.ValidationError(
                _("Neither Conversation nor Advert was provided"),
                code='message_missing_data'
            )

        return attrs

    def create(self, validated_data):
        """Create new Message object and a new Conversation if neccesary"""
        conversation = validated_data.get('conversation', None)
        if not conversation:
            advert = validated_data.get('advert')
            conversation = Conversation.objects.create(
                user_1=advert.user,
                user_2=validated_data.get('sender'),
                advert=advert
            )

        return Message.objects.create(
            sender=validated_data.get('sender'),
            content=validated_data.get('content'),
            conversation=conversation
        )


class ConversationsSerializer(serializers.ModelSerializer):
    """Serializer for listing all conversations"""
    class Meta:
        model = Conversation
        fields = (
            'user_1', 'user_2', 'advert', 'title', 'last_updated'
        )


class SingleConversationSerializer(serializers.ModelSerializer):
    """Serializer for a single Conversation"""
    messages = MessageSerializer(many=True, read_only=True)

    class Meta:
        model = Conversation
        fields = (
            'user_1', 'user_2', 'advert', 'title', 'messages'
        )
