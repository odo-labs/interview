from rest_framework import serializers

from rfps.models.issuing_org import IssuingOrg
from rfps.models.rfp import RFP


class IssuingOrgSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(required=True)
    state_location = serializers.CharField(required=True)
    kind = serializers.CharField(required=True)

    class Meta:
        model = IssuingOrg
        fields = ["id", "name", "state_location", "kind"]


class RFPSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(required=True)
    created_at = serializers.DateTimeField(required=True)
    due_date = serializers.DateField(required=True)
    description = serializers.CharField(required=True)
    issuing_org = IssuingOrgSerializer(required=True)

    class Meta:
        model = RFP
        fields = ["id", "title", "description", "created_at", "due_date", "issuing_org"]
