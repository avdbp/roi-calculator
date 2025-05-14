import React, { useState } from "react";
import {
  Container,
  Typography,
  Box,
  Button,
  Grid,
  Paper,
  Switch,
  FormControlLabel,
} from "@mui/material";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

import CustomerSupport from "../components/CustomerSupport";
import SalesCoaching from "../components/SalesCoaching";
import SalesDevelopment from "../components/SalesDevelopment";

const Home = () => {
  const [supportTotal, setSupportTotal] = useState(0);
  const [coachingTotal, setCoachingTotal] = useState(0);
  const [devTotal, setDevTotal] = useState(0);

  const [showSupport, setShowSupport] = useState(true);
  const [showCoaching, setShowCoaching] = useState(true);
  const [showDevelopment, setShowDevelopment] = useState(true);

  const grandTotal =
    (showSupport ? supportTotal : 0) +
    (showCoaching ? coachingTotal : 0) +
    (showDevelopment ? devTotal : 0);

  const handleDownload = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("ROI Report - Agentforce", 14, 22);
    doc.setFontSize(12);
    doc.text(`Generated on: ${new Date().toLocaleString()}`, 14, 30);

    const rows = [];

    if (showSupport) {
      rows.push(["Customer Support", `$${supportTotal.toLocaleString(undefined, { maximumFractionDigits: 2 })}`]);
    }
    if (showCoaching) {
      rows.push(["Sales Coaching", `$${coachingTotal.toLocaleString(undefined, { maximumFractionDigits: 2 })}`]);
    }
    if (showDevelopment) {
      rows.push(["Sales Development", `$${devTotal.toLocaleString(undefined, { maximumFractionDigits: 2 })}`]);
    }

    rows.push(["Total Savings (3 years)", `$${grandTotal.toLocaleString(undefined, { maximumFractionDigits: 2 })}`]);

    autoTable(doc, {
      startY: 40,
      head: [["Section", "Savings"]],
      body: rows,
    });

    doc.save("ROI_Report.pdf");
  };

  return (
    <Container maxWidth="lg" style={{ marginTop: "40px", marginBottom: "40px" }}>
      <Paper elevation={3} style={{ padding: "30px", marginBottom: "40px" }}>
        <Typography variant="h4" align="center" gutterBottom>
          ROI Calculator
        </Typography>

        <Box mt={4} textAlign="center">
          <Typography variant="h5">3-year total net savings</Typography>
          <Typography variant="h3" color="primary" gutterBottom>
            ${grandTotal.toLocaleString(undefined, { maximumFractionDigits: 2 })}
          </Typography>

          <Grid container spacing={2} justifyContent="center">
            <Grid item>
              <Button variant="contained" color="primary" onClick={handleDownload}>
                Download Report
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Paper>

      <Box mb={3}>
        <FormControlLabel
          control={<Switch checked={showSupport} onChange={() => setShowSupport(!showSupport)} />}
          label="Customer Support"
        />
        <FormControlLabel
          control={<Switch checked={showCoaching} onChange={() => setShowCoaching(!showCoaching)} />}
          label="Sales Coaching"
        />
        <FormControlLabel
          control={<Switch checked={showDevelopment} onChange={() => setShowDevelopment(!showDevelopment)} />}
          label="Sales Development"
        />
      </Box>

      {showSupport && <CustomerSupport onTotalChange={setSupportTotal} />}
      {showCoaching && <SalesCoaching onTotalChange={setCoachingTotal} />}
      {showDevelopment && <SalesDevelopment onTotalChange={setDevTotal} />}
    </Container>
  );
};

export default Home;