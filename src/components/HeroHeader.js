
import React from "react";
import { Box, Typography, Button, Paper } from "@mui/material";

const HeroHeader = ({ total, onDownload }) => {
  return (
    <Paper
      elevation={3}
      sx={{
        p: 4,
        mb: 4,
        textAlign: "center",
        maxWidth: "800px",
        mx: "auto",
      }}
    >
      <Typography variant="h4" gutterBottom>
        ROI Calculator
      </Typography>
      <Typography variant="h6" gutterBottom>
        3-year total net savings
      </Typography>
      <Typography
        variant="h3"
        color="text.highlight"
        gutterBottom
      >
        ${total.toLocaleString(undefined, {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}
      </Typography>
      <Button variant="contained" onClick={onDownload}>
        Download Report
      </Button>
    </Paper>
  );
};

export default HeroHeader;
