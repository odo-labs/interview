from .models import RFP
from .serializers import RFPSerializer
from rest_framework import generics


class RFPListCreateView(generics.ListCreateAPIView):
    queryset = RFP.objects.all()
    serializer_class = RFPSerializer


class RFPRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = RFP.objects.all()
    serializer_class = RFPSerializer
