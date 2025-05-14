import React, { useState, useEffect } from 'react';
import { Grid, Typography, TextField, Slider, Table, TableBody, TableCell, TableRow, Box, Paper, TableHead } from "@mui/material";

const SalesCoaching = ({ onTotalChange, defaultValues = {} }) => {
  const [employees, setEmployees] = useState(defaultValues.employees || 0);
  const [annualCoachCost, setAnnualCoachCost] = useState(defaultValues.annualCoachCost || 0);
  const [sessionsPerRepPerMonth, setSessionsPerRepPerMonth] = useState(defaultValues.sessionsPerRepPerMonth || 0);
  const [percentShifted, setPercentShifted] = useState(defaultValues.percentShifted || 0);
  const [autoCostPerSession, setAutoCostPerSession] = useState(defaultValues.autoCostPerSession || 0);

  const monthsPerYear = 12;
  const totalSessions = employees * sessionsPerRepPerMonth * monthsPerYear;
  const shiftedSessions = totalSessions * (percentShifted / 100);
  const costPerSession = sessionsPerRepPerMonth > 0 ? annualCoachCost / (sessionsPerRepPerMonth * monthsPerYear * employees) : 0;
  const savingsPerSession = costPerSession - autoCostPerSession;
  const rawTotal = shiftedSessions * savingsPerSession;
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
      <Typography variant="h6" gutterBottom>🎯 Sales Coaching</Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <TextField label="Number of sales reps" type="number" value={employees} onChange={(e) => setEmployees(Number(e.target.value))} fullWidth />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField label="Annual cost of a sales coach" type="number" value={annualCoachCost} onChange={(e) => setAnnualCoachCost(Number(e.target.value))} fullWidth />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField label="Sessions per rep per month" type="number" value={sessionsPerRepPerMonth} onChange={(e) => setSessionsPerRepPerMonth(Number(e.target.value))} fullWidth />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField label="Average cost per automated session" type="number" value={autoCostPerSession} onChange={(e) => setAutoCostPerSession(Number(e.target.value))} fullWidth />
        </Grid>
        <Grid item xs={12}>
          <Typography gutterBottom>% of coaching sessions shifted to automated system (over 3 years)</Typography>
          <Slider value={percentShifted} onChange={(e, val) => setPercentShifted(val)} valueLabelDisplay="auto" min={0} max={100} />
        </Grid>
      </Grid>

      {showWarning && <Box mt={3}><Typography color="error">⚠️ No se genera ahorro con estos valores. El costo actual por sesión es menor al automatizado.</Typography></Box>}

      <Box mt={4}>
        <Typography variant="subtitle1" gutterBottom>Estimated ROI (Based on actual cost savings):</Typography>
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
              <TableCell>${year1.toFixed(2)}</TableCell>
              <TableCell>${year2.toFixed(2)}</TableCell>
              <TableCell>${year3.toFixed(2)}</TableCell>
              <TableCell><strong>${total.toFixed(2)}</strong></TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Box>
    </Box>
  );
};

export default SalesCoaching;
