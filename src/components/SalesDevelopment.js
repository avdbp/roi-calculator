import ROISection from "./ROISection";

const SalesDevelopment = ({ onTotalChange }) => {
  return (
    <ROISection
      key="roi-sales-development"
      title="Sales Development"
      onTotalChange={onTotalChange}
    />
  );
};

export default SalesDevelopment;
