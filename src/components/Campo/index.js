import React from 'react';
import PropTypes from 'prop-types';
import { TextField } from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  estiloCampo: {
    padding: '0',
    margin: '0 6px',
    alignItems: 'center',
  },
});

export default function Campo({ id, label, onClick }) {
  let classes = useStyles();

  return (
    <TextField
      id={id}
      classes={{ root: classes.estiloCampo }}
      label={label}
      margin="normal"
      variant="outlined"
      onClick={e => e.stopPropagation()}
    />
  );
}

Campo.propsTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};
