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
      margin="dense"
      fullWidth={fullWidth}
      disabled = {disabled}
      InputLabelProps={{
        shrink: true, // Hace que el label permanezca arriba
      }}
    />
  );
};

export default TextInput;
