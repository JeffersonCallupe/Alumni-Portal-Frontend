import * as React from 'react';
import TextField from '@mui/material/TextField';

const Textarea = ({label, name, value, maxRows, onChange, disabled}) => {
  return (
    <TextField
          label={label}
          name={name}
          value={value}
          multiline
          rows={maxRows}
          onChange={onChange}
          fullWidth
          disabled={disabled}
    />
  );
}

export default Textarea;