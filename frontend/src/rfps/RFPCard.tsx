import { RFP } from "api/Api";
import Button from "lib/Button";

interface RFPCardProps {
  rfp: RFP;
}

const SidebarValue = ({ label, value }: { label: string; value: string }) => {
  return (
    <div className="mb-lg w-full">
      <div className="font-semibold text-2xs text-gray-400">{label}</div>
      <div className="font-semibold text-md text-gray-800">{value}</div>
    </div>
  );
};

const RFPCard = ({ rfp }: RFPCardProps) => {
  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString();
  };

  return (
    <div
      className="flex bg-white rounded-lg shadow border border-gray-200 overflow-hidden"
      role="article"
      aria-labelledby={`rfp-title-${rfp.id}`}
    >
      {/* Sidebar */}
      <div className="p-lg flex flex-col items-start min-w-[160px] text-sm text-gray-600 border-r border-gray-200 bg-blue-100 text-right">
        <SidebarValue label="Posted" value={formatDate(rfp.created_at)} />
        <SidebarValue label="Proposal Due" value={formatDate(rfp.due_date)} />
        <SidebarValue label="Location" value={rfp.issuing_org.state_location} />
      </div>
      {/* Main content */}
      <div className="flex-1 p-lg flex flex-col justify-between">
        <div>
          <div
            id={`rfp-title-${rfp.id}`}
            className="text-lg font-semibold text-gray-900 mb-xs"
          >
            {rfp.title}
          </div>
          <div className="text-lg text-gray-400 mb-xs">
            {rfp.issuing_org.name}
          </div>
          <div className="text-gray-700 mb-md text-sm">{rfp.description}</div>
        </div>
        <div className="flex gap-md mt-xs ml-auto">
          <Button>View Details</Button>
        </div>
      </div>
    </div>
  );
};

export default RFPCard;
