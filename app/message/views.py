from django.db.models import Q

from rest_framework import generics, viewsets
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated

from core.models import Conversation
from message.serializers import CreateMessageSerializer, \
    ConversationsSerializer, SingleConversationSerializer


class CreateMessageView(generics.CreateAPIView):
    """Manage creating new messages"""
    serializer_class = CreateMessageSerializer
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)

    def perform_create(self, serializer):
        """Make current user the sender"""
        return serializer.save(sender=self.request.user)


class ConversationViewset(viewsets.ReadOnlyModelViewSet):
    """Manage listing and retireving conversations"""
    serializer_class = ConversationsSerializer
    queryset = Conversation.objects.all()
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)

    def get_serializer_class(self):
        """Return appropiate serializer based on type of request"""
        if self.action == 'retrieve':
            return SingleConversationSerializer

        return self.serializer_class

    def get_queryset(self):
        """Return queryset where request user is included"""
        return self.queryset.filter(
            Q(user_1=self.request.user) |
            Q(user_2=self.request.user)
        ).order_by('-last_updated')
