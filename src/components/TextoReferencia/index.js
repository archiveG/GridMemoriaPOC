import React from 'react';
import PropTypes from 'prop-types';
import { Typography, Box } from "@material-ui/core";

export default function TextoReferencia({ id, texto }) {
  return (
    <Typography
      id={id}
      color="secondary"
      component="div">
      <Box fontWeight="fontWeightBold">
        {texto}
      </Box>
    </Typography>
  );
}

TextoReferencia.propsTypes = {
  id: PropTypes.string.isRequired,
  texto: PropTypes.string.isRequired,
};
