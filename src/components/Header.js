
import React from "react";
import { Box, Typography } from "@mui/material";

const Header = () => {
  return (
    <Box textAlign="center" mt={6} mb={4}>
      <Typography variant="h4" gutterBottom>
        ROI Calculator
      </Typography>
      <Typography variant="subtitle1">
        Estimate your savings through automation in Customer Support, Sales Coaching and Sales Development.
      </Typography>
    </Box>
  );
};

export default Header;
