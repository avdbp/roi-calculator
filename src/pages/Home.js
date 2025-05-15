import React, { useState } from "react";
import {
  Container,
  Typography,
  Box,
  Button,
  FormControlLabel,
  Switch,
  Paper,
  Grid,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

import CustomerSupport from "../components/CustomerSupport";
import SalesCoaching from "../components/SalesCoaching";
import SalesDevelopment from "../components/SalesDevelopment";

const Home = () => {
  const [supportData, setSupportData] = useState(null);
  const [coachingData, setCoachingData] = useState(null);
  const [devData, setDevData] = useState(null);
  const [resetKey, setResetKey] = useState(0);

  const [showSupport, setShowSupport] = useState(true);
  const [showCoaching, setShowCoaching] = useState(true);
  const [showDevelopment, setShowDevelopment] = useState(true);

  const grandTotal =
    (supportData?.savings || 0) +
    (coachingData?.savings || 0) +
    (devData?.savings || 0);

  const handleReset = () => {
    setSupportData(null);
    setCoachingData(null);
    setDevData(null);
    setResetKey((prev) => prev + 1);
  };

  const handleDownload = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("ROI Report", 14, 22);
    doc.setFontSize(12);
    doc.text(`Generated on: ${new Date().toLocaleString()}`, 14, 30);

    const sections = [supportData, coachingData, devData].filter(Boolean);
    let currentY = 40;

    sections.forEach((data) => {
      doc.setFontSize(14);
      doc.text(data.section, 14, currentY);

      autoTable(doc, {
        startY: currentY + 5,
        head: [["Metric", "Value"]],
        body: [
          ["Employees", data.employees],
          ["Annual Cost per Employee", `$${data.annualCost.toFixed(2)}`],
          ["Conversations per Day", data.conversationsPerDay],
          ["% Shifted to Automation", `${data.percentShifted}%`],
          ["Automated Cost per Conversation", `$${data.autoCostPerConversation.toFixed(2)}`],
          ["Total Conversations", data.totalConversations.toLocaleString()],
          ["Shifted Conversations", data.shiftedConversations.toLocaleString()],
          ["Cost Without Automation", `$${data.currentCost.toFixed(2)}`],
          ["Cost With Automation", `$${data.autoCost.toFixed(2)}`],
          ["Total Savings", `$${data.savings.toFixed(2)}`],
          ["ROI", `${data.roi.toFixed(2)}%`],
        ],
      });

      currentY = doc.lastAutoTable.finalY + 15;

      if (currentY > 250) {
        doc.addPage();
        currentY = 20;
      }
    });

    doc.addPage();
    autoTable(doc, {
      startY: 20,
      head: [["Section", "Savings"]],
      body: sections.map((s) => [s.section, `$${s.savings.toFixed(2)}`]),
    });

    doc.text(`Grand Total Savings: $${grandTotal.toFixed(2)}`, 14, doc.lastAutoTable.finalY + 10);
    doc.save("roi_report_detailed.pdf");
  };

  return (
    <Container maxWidth={false} sx={{ py: 4 }}>
      <Paper
        elevation={3}
        sx={{
          p: 4,
          mb: 4,
          mx: "auto",
          maxWidth: "1100px",
        }}
      >
        <Typography variant="h6" gutterBottom>
          Select Sections
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4}>
            <FormControlLabel
              control={
                <Switch
                  checked={showSupport}
                  onChange={(e) => setShowSupport(e.target.checked)}
                />
              }
              label="Customer Support"
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <FormControlLabel
              control={
                <Switch
                  checked={showCoaching}
                  onChange={(e) => setShowCoaching(e.target.checked)}
                />
              }
              label="Sales Coaching"
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <FormControlLabel
              control={
                <Switch
                  checked={showDevelopment}
                  onChange={(e) => setShowDevelopment(e.target.checked)}
                />
              }
              label="Sales Development"
            />
          </Grid>
        </Grid>
      </Paper>

      <Box sx={{ mx: "auto", maxWidth: "1100px" }}>
        {showSupport && (
          <Accordion defaultExpanded>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="h6">Customer Support</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <CustomerSupport
                key={`support-${resetKey}`}
                onTotalChange={setSupportData}
              />
            </AccordionDetails>
          </Accordion>
        )}

        {showCoaching && (
          <Accordion defaultExpanded>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="h6">Sales Coaching</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <SalesCoaching
                key={`coaching-${resetKey}`}
                onTotalChange={setCoachingData}
              />
            </AccordionDetails>
          </Accordion>
        )}

        {showDevelopment && (
          <Accordion defaultExpanded>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="h6">Sales Development</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <SalesDevelopment
                key={`development-${resetKey}`}
                onTotalChange={setDevData}
              />
            </AccordionDetails>
          </Accordion>
        )}

        <Box mt={4} textAlign="center">
          <Typography variant="h6">
            Total Estimated Savings: ${grandTotal.toFixed(2)}
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={handleDownload}
            sx={{ mt: 2, mr: 2 }}
          >
            Download Detailed Report
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            onClick={handleReset}
            sx={{ mt: 2 }}
          >
            Reset Calculator
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Home;
