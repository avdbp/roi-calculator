import ROISection from "./ROISection";

const SalesCoaching = ({ onTotalChange }) => {
  return (
    <ROISection
      key="roi-sales-coaching"
      title="Sales Coaching"
      onTotalChange={onTotalChange}
      defaultValues={{
        employees: "5",
        annualCost: "65000",
        conversations: "15",
        percentShifted: 30,
        autoCostPerConversation: "0.75",
      }}
    />
  );
};

export default SalesCoaching;
