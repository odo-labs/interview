import pytest

from django.test import TestCase
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APIClient
from rfps.models.issuing_org import IssuingOrg
from rfps.models.rfp import RFP
from datetime import datetime, timedelta, date


@pytest.mark.django_db
class RFPViewTests(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.issuing_org = IssuingOrg.objects.create(
            name="Test Org", state_location="CA", kind="government"
        )
        self.rfp = RFP.objects.create(
            title="Test RFP",
            description="Test Description",
            due_date=date.today() + timedelta(days=30),
            issuing_org=self.issuing_org,
        )
        self.rfp_list_url = reverse("rfp-list-create")
        self.rfp_detail_url = reverse("rfp-detail", kwargs={"pk": self.rfp.pk})

    def test_list_rfps(self):
        """Test retrieving a list of RFPs"""
        response = self.client.get(self.rfp_list_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data["results"]), 1)
        self.assertEqual(response.data["results"][0]["title"], self.rfp.title)

    def test_create_rfp(self):
        """Test creating a new RFP"""
        data = {
            "title": "New RFP",
            "description": "New Description",
            "due_date": (date.today() + timedelta(days=60)).isoformat(),
            "issuing_org": self.issuing_org.pk,
        }
        response = self.client.post(self.rfp_list_url, data, format="json")
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(RFP.objects.count(), 2)
        self.assertEqual(RFP.objects.get(id=response.data["id"]).title, "New RFP")

    def test_retrieve_rfp(self):
        """Test retrieving a single RFP"""
        response = self.client.get(self.rfp_detail_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["title"], self.rfp.title)
        self.assertEqual(response.data["description"], self.rfp.description)

    def test_update_rfp(self):
        """Test updating an RFP"""
        data = {
            "title": "Updated RFP",
            "description": "Updated Description",
            "due_date": (date.today() + timedelta(days=90)).isoformat(),
            "issuing_org": self.issuing_org.pk,
        }
        response = self.client.put(self.rfp_detail_url, data, format="json")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.rfp.refresh_from_db()
        self.assertEqual(self.rfp.title, "Updated RFP")
        self.assertEqual(self.rfp.description, "Updated Description")

    def test_delete_rfp(self):
        """Test deleting an RFP"""
        response = self.client.delete(self.rfp_detail_url)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(RFP.objects.count(), 0)
