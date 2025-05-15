import ROISection from "./ROISection";

const SalesCoaching = ({ onTotalChange }) => {
  return (
    <ROISection
      key="roi-sales-coaching"
      title="Sales Coaching"
      onTotalChange={onTotalChange}
    />
  );
};

export default SalesCoaching;
