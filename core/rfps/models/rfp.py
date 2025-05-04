from django.db import models

from rfps.models.issuing_org import IssuingOrg


class RFP(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)

    title = models.CharField(max_length=1024)
    description = models.TextField(null=True, blank=True)

    # When the RFP is due
    due_date = models.DateField(null=True, blank=True)

    issuing_org = models.ForeignKey(IssuingOrg, on_delete=models.CASCADE, null=True)

    def __str__(self):
        return self.title
