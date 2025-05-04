import csv
from datetime import datetime
from django.core.management.base import BaseCommand
from django.db import transaction

from rfps.models import RFP, IssuingOrg, IssuingOrgKind


class Command(BaseCommand):
    help = "Import RFPs and IssuingOrgs from a CSV file"

    def add_arguments(self, parser):
        parser.add_argument("csv_file", type=str, help="Path to the CSV file to import")

    def handle(self, *args, **options):
        csv_file = options["csv_file"]

        # Check for existing RFPs
        existing_rfps = RFP.objects.count()
        if existing_rfps > 0:
            self.stdout.write(
                self.style.WARNING(
                    f"Warning: There are {existing_rfps} existing RFPs in the database."
                )
            )
            if (
                input("Do you want to delete all existing RFPs? (yes/no): ").lower()
                != "yes"
            ):
                self.stdout.write(self.style.ERROR("Import cancelled."))
                return

            # Delete existing RFPs and IssuingOrgs
            with transaction.atomic():
                RFP.objects.all().delete()
                IssuingOrg.objects.all().delete()
            self.stdout.write(
                self.style.SUCCESS("Deleted existing RFPs and IssuingOrgs.")
            )

        with open(csv_file, "r") as f:
            reader = csv.DictReader(f)

            # Use a transaction to ensure all-or-nothing import
            with transaction.atomic():
                for row in reader:
                    # Parse the created date
                    created_at = datetime.strptime(
                        row["created"], "%Y-%m-%d %H:%M:%S.%f %z"
                    )

                    # Get or create the issuing organization
                    org_name = row["org_name"]
                    state_location = row["state_location"]
                    kind = row["kind"]
                    description = row["description"]

                    # Create or get the issuing organization
                    issuing_org, created = IssuingOrg.objects.get_or_create(
                        name=org_name,
                        defaults={
                            "state_location": state_location,
                            "kind": (
                                kind
                                if kind in IssuingOrgKind.values
                                else IssuingOrgKind.OTHER
                            ),
                        },
                    )

                    # Create the RFP
                    RFP.objects.create(
                        created_at=created_at,
                        title=row["title"],
                        description=description,
                        due_date=(
                            datetime.strptime(row["due_date"], "%Y-%m-%d").date()
                            if row["due_date"]
                            else None
                        ),
                        issuing_org=issuing_org,
                    )

                    if created:
                        self.stdout.write(
                            f"Created new issuing organization: {org_name}"
                        )

                self.stdout.write(
                    self.style.SUCCESS("Successfully imported RFPs and IssuingOrgs")
                )
