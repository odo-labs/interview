from rest_framework import serializers
from .models import RFP


class RFPSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)

    class Meta:
        model = RFP
        fields = ["id", "title", "description", "created_at", "updated_at"]
