import React from 'react';
import { Typography, Box } from "@material-ui/core";

export default function TextoReferencia({ id, texto }) {
  return (
    <Typography
      id={id}
      component="div">
      <Box fontWeight="fontWeightBold">
        {texto}
      </Box>
    </Typography>
  );
}
