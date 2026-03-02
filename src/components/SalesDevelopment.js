import ROISection from "./ROISection";

const SalesDevelopment = ({ onTotalChange }) => {
  return (
    <ROISection
      key="roi-sales-development"
      title="Sales Development"
      onTotalChange={onTotalChange}
      defaultValues={{
        employees: "8",
        annualCost: "55000",
        conversations: "25",
        percentShifted: 20,
        autoCostPerConversation: "0.60",
      }}
    />
  );
};

export default SalesDevelopment;
