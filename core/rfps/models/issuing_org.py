from django.db import models


class IssuingOrgKind(models.TextChoices):
    OTHER = "other"

    # Government Entities
    STATE = "state"
    COUNTY = "county"
    CITY = "city"
    VILLAGE = "village"
    TOWN = "town"
    BOROUGH = "borough"
    TRIBAL_NATION = "tribal_nation"
    FEDERAL = "federal"

    # Education
    UNIVERSITY = "university"
    COLLEGE = "college"
    HIGH_SCHOOL = "high_school"
    MIDDLE_SCHOOL = "middle_school"
    ELEMENTARY_SCHOOL = "elementary_school"
    K12 = "k12"
    OTHER_SCHOOL = "other_school"

    # Health
    HOSPITAL = "hospital"
    OTHER_HEALTH = "other_health"

    # Department
    TRANSIT_AGENCY = "transit_agency"
    PUBLIC_WORKS = "public_works"
    OTHER_DEPARTMENT = "other_department"

    # Non-Profit
    NON_PROFIT = "non_profit"


class IssuingOrg(models.Model):
    name = models.TextField()
    state_location = models.CharField(max_length=2, null=True, blank=True)

    kind = models.TextField(null=True, choices=IssuingOrgKind.choices)
