from django.urls import path
from . import views

urlpatterns = [
    path("rfps/", views.RFPListCreateView.as_view(), name="rfp-list-create"),
    path(
        "rfps/<int:pk>/",
        views.RFPRetrieveUpdateDestroyView.as_view(),
        name="rfp-detail",
    ),
]
