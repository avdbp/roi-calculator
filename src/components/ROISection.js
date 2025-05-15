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
  const [autoCostPerConversation, setAutoCostPerConversation] = useState("");

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
    <Paper elevation={3} sx={{ p: 3, mt: 4 }}>
      <Typography variant="h6" gutterBottom>
        {title}
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Employees"
            type="number"
            value={employees}
            onChange={(e) => setEmployees(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Average Annual Cost per Employee ($)"
            type="number"
            value={annualCost}
            onChange={(e) => setAnnualCost(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Conversations per Day per Employee"
            type="number"
            value={conversations}
            onChange={(e) => setConversations(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Box>
            <Typography gutterBottom>% Shifted to Automation</Typography>
            <Slider
              value={percentShifted}
              onChange={(e, val) => setPercentShifted(val)}
              min={0}
              max={100}
              step={1}
              valueLabelDisplay="auto"
            />
          </Box>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Automated System Cost per Conversation ($)"
            type="number"
            value={autoCostPerConversation}
            onChange={(e) => setAutoCostPerConversation(e.target.value)}
          />
        </Grid>
      </Grid>

      <Box mt={4}>
        <Typography variant="subtitle1">Results</Typography>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Metric</TableCell>
              <TableCell>Value</TableCell>
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
              <TableCell>Cost Without Automation</TableCell>
              <TableCell>${currentCost.toFixed(2)}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Cost With Automation</TableCell>
              <TableCell>${autoCost.toFixed(2)}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Total Savings</TableCell>
              <TableCell>${savings.toFixed(2)}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>ROI</TableCell>
              <TableCell>{roi.toFixed(2)}%</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Box>

      {savings <= 0 && (
        <Box mt={2}>
          <Alert severity="warning">
            No savings are generated with these values. The automated system cost is higher than the current cost per conversation.
          </Alert>
        </Box>
      )}
    </Paper>
  );
};

export default ROISection;