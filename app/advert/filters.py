import django_filters as df

from django.db.models import Q


class AdvertFilterSet(df.FilterSet):
    """Filters for Advert object"""
    user = df.NumberFilter(field_name='user__id')

    title = df.CharFilter(field_name='title', lookup_expr='icontains')

    category = df.NumberFilter(
        field_name='category__id', method='category_filter'
    )

    price__gte = df.NumberFilter(field_name='price', lookup_expr='gte')
    price__lte = df.NumberFilter(field_name='price', lookup_expr='lte')

    location = df.CharFilter(
        field_name='location__name', lookup_expr='icontains'
    )

    ordering = df.OrderingFilter(
        fields=(
            ('price', 'price'),
            ('date_refreshed', 'date')
        )
    )

    def category_filter(self, queryset, name, value):
        """Category filter to include child categories in results"""
        criteria = \
            Q(category__id=value) | \
            Q(category__parent__id=value) | \
            Q(category__parent__parent__id=value) | \
            Q(category__parent__parent__parent__id=value)

        # query = queryset.filter(criteria).query
        return queryset.filter(criteria)
