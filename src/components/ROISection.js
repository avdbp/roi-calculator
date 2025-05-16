
import React, { useState, useEffect } from "react";
import {
  Grid,
  Typography,
  TextField,
  Slider,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  Box,
  Alert,
} from "@mui/material";

const ROISection = ({ title, onTotalChange, defaultValues = {} }) => {
  const [employees, setEmployees] = useState("");
  const [annualCost, setAnnualCost] = useState("");
  const [conversations, setConversations] = useState("");
  const [percentShifted, setPercentShifted] = useState(0);
  const [autoCostPerConversation, setAutoCostPerConversation] = useState("1");

  const daysPerYear = 260;
  const emp = parseFloat(employees) || 0;
  const conv = parseFloat(conversations) || 0;
  const annCost = parseFloat(annualCost) || 0;
  const autoCostConv = parseFloat(autoCostPerConversation) || 0;

  const totalConversations = emp * conv * daysPerYear;
  const shiftedConversations = totalConversations * (percentShifted / 100);
  const costPerConversation = conv > 0 ? annCost / (conv * daysPerYear) : 0;

  const currentCost = shiftedConversations * costPerConversation;
  const autoCost = shiftedConversations * autoCostConv;
  const savings = currentCost - autoCost;
  const roi = autoCost > 0 ? (savings / autoCost) * 100 : 0;

  useEffect(() => {
    onTotalChange({
      section: title,
      savings: savings > 0 ? savings : 0,
      employees: emp,
      annualCost: annCost,
      conversationsPerDay: conv,
      percentShifted,
      autoCostPerConversation: autoCostConv,
      totalConversations,
      shiftedConversations,
      currentCost,
      autoCost,
      roi,
    });
  }, [
    employees,
    annualCost,
    conversations,
    percentShifted,
    autoCostPerConversation,
    savings,
    currentCost,
    autoCost,
    shiftedConversations,
    totalConversations,
    roi,
    onTotalChange
  ]);

  return (
    <Paper elevation={3} sx={{ p: { xs: 2, md: 4 }, mt: 4 }}>
      <Typography variant="h6" gutterBottom>
        {title}
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Employees"
            InputLabelProps={{ shrink: true }}
            type="number"
            value={employees}
            onChange={(e) => setEmployees(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Annual cost per employee"
            InputLabelProps={{ shrink: true }}
            type="number"
            value={annualCost}
            onChange={(e) => setAnnualCost(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Conversations per day"
            InputLabelProps={{ shrink: true }}
            type="number"
            value={conversations}
            onChange={(e) => setConversations(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Slider
            value={percentShifted}
            onChange={(e, newValue) => setPercentShifted(newValue)}
            valueLabelDisplay="auto"
            min={0}
            max={100}
          />
          <Typography variant="body2">
            Percentage of conversations shifted: {percentShifted}%
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Automated cost per conversation"
            helperText={parseFloat(autoCostPerConversation || "0") <= 0 ? "Please enter a value greater than 0 to calculate ROI." : "Estimated cost per automated conversation (e.g. chatbots, AI, forms)"}
            InputLabelProps={{ shrink: true }}
            type="number"
            value={autoCostPerConversation}
            onChange={(e) => setAutoCostPerConversation(e.target.value)}
          />
        </Grid>
      </Grid>

      <Box mt={4} sx={{ overflowX: "auto" }}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell colSpan={2}>
                <strong>ROI Summary</strong>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>Total Conversations</TableCell>
              <TableCell>{totalConversations.toLocaleString()}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Shifted Conversations</TableCell>
              <TableCell>{shiftedConversations.toLocaleString()}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Current Cost</TableCell>
              <TableCell>${currentCost.toLocaleString(undefined, { maximumFractionDigits: 2 })}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Automated Cost</TableCell>
              <TableCell>${autoCost.toLocaleString(undefined, { maximumFractionDigits: 2 })}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Savings</TableCell>
              <TableCell>${savings.toLocaleString(undefined, { maximumFractionDigits: 2 })}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>ROI</TableCell>
              <TableCell>{roi.toFixed(2)}%</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Box>

      {savings < 0 && (
        <Alert severity="warning" sx={{ mt: 2 }}>
          ⚠️ No savings generated with these values. The current cost per conversation is lower than the automated one.
        </Alert>
      )}
    </Paper>
  );
};

export default ROISection;
