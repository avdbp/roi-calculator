import React, { useState, useEffect } from 'react';
import {
  Grid,
  Typography,
  TextField,
  Slider,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Box,
  Paper,
  TableHead,
} from "@mui/material";

const SalesDevelopment = ({ onTotalChange }) => {
  const [employees, setEmployees] = useState(30);
  const [annualSDRCost, setAnnualSDRCost] = useState(50000);
  const [outreachPerDay, setOutreachPerDay] = useState(30);
  const [percentShifted, setPercentShifted] = useState(50);

  const daysPerYear = 260;
  const agentforceCostPerOutreach = 1.8;

  const totalOutreaches = employees * outreachPerDay * daysPerYear;
  const shiftedOutreaches = totalOutreaches * (percentShifted / 100);

  const costPerOutreach = annualSDRCost / (outreachPerDay * daysPerYear);
  const savingsPerOutreach = costPerOutreach - agentforceCostPerOutreach;

  const rawTotal = shiftedOutreaches * savingsPerOutreach;
  const showWarning = rawTotal < 0;
  const total = showWarning ? 0 : rawTotal;

  const year1 = total * 0.224;
  const year2 = total * 0.32;
  const year3 = total * 0.456;

  useEffect(() => {
    if (onTotalChange) onTotalChange(total);
  }, [total, onTotalChange]);

  return (
    <Box component={Paper} elevation={3} p={4} mt={4}>
      <Typography variant="h6" gutterBottom>
        📞 Sales Development
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <TextField
            label="Number of SDRs"
            type="number"
            value={employees}
            onChange={(e) => setEmployees(Number(e.target.value))}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            label="Average annual cost per SDR"
            type="number"
            value={annualSDRCost}
            onChange={(e) => setAnnualSDRCost(Number(e.target.value))}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            label="Outreach per day per SDR"
            type="number"
            value={outreachPerDay}
            onChange={(e) => setOutreachPerDay(Number(e.target.value))}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography gutterBottom>
            % of outreach shifted to Agentforce (over 3 years)
          </Typography>
          <Slider
            value={percentShifted}
            onChange={(e, val) => setPercentShifted(val)}
            valueLabelDisplay="auto"
            min={0}
            max={100}
          />
        </Grid>
      </Grid>

      {showWarning && (
        <Box mt={3}>
          <Typography variant="body1" color="error">
            ⚠️ No se genera ahorro con estos valores. El costo actual por outreach es menor al de Agentforce.
          </Typography>
        </Box>
      )}

      <Box mt={4}>
        <Typography variant="subtitle1" gutterBottom>
          Estimated ROI (Based on actual cost savings):
        </Typography>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              <TableCell>Year 1</TableCell>
              <TableCell>Year 2</TableCell>
              <TableCell>Year 3</TableCell>
              <TableCell>Total</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell><strong>Your Savings</strong></TableCell>
              <TableCell>${year1.toLocaleString(undefined, { maximumFractionDigits: 2 })}</TableCell>
              <TableCell>${year2.toLocaleString(undefined, { maximumFractionDigits: 2 })}</TableCell>
              <TableCell>${year3.toLocaleString(undefined, { maximumFractionDigits: 2 })}</TableCell>
              <TableCell><strong>${total.toLocaleString(undefined, { maximumFractionDigits: 2 })}</strong></TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Box>
    </Box>
  );
};

export default SalesDevelopment;