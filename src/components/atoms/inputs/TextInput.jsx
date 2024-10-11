import React from 'react';
import TextField from '@mui/material/TextField';

const TextInput = ({ label, name, value, onChange, type = 'text', fullWidth = true, disabled = false }) => {
  return (
    <TextField
      label={label}
      name={name}
      value={value}
      onChange={onChange}
      type={type}
      variant="outlined"
      margin="normal"
      fullWidth={fullWidth}
      disabled = {disabled}
    />
  );
};

export default TextInput;
