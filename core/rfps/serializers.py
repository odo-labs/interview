from rest_framework import serializers

from rfps.models.issuing_org import IssuingOrg
from rfps.models.rfp import RFP


class IssuingOrgSerializer(serializers.ModelSerializer):
    class Meta:
        model = IssuingOrg
        fields = ["id", "name", "state_location", "kind"]


class RFPSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)
    issuing_org = IssuingOrgSerializer(read_only=True)

    class Meta:
        model = RFP
        fields = ["id", "title", "description", "created_at", "due_date", "issuing_org"]
