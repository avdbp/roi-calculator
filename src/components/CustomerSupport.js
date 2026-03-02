import ROISection from "./ROISection";

const CustomerSupport = ({ onTotalChange }) => {
  return (
    <ROISection
      key="roi-customer-support"
      title="Customer Support"
      onTotalChange={onTotalChange}
      defaultValues={{
        employees: "10",
        annualCost: "45000",
        conversations: "30",
        percentShifted: 25,
        autoCostPerConversation: "0.50",
      }}
    />
  );
};

export default CustomerSupport;
