import React from 'react';
import { TextField, MenuItem } from '@mui/material';

const SelectInput = ({
  name,
  value,
  onChange,
  error = false,
  helperText = '',
  disabled = false,
  options = [],
  label,
  required = false,
}) => {
  return (
    <TextField
      select
      name={name}
      value={value}
      onChange={onChange}
      error={error} // Mostrar estado de error en el campo
      helperText={helperText} // Mostrar mensaje de error o ayuda
      disabled={disabled}
      variant="outlined" // Estilo de borde
      fullWidth // Ocupa el ancho completo
      label={label} // Añadir label aquí
      required={required} // Hacer que el campo sea obligatorio
      sx={{
        backgroundColor: disabled ? '#f5f5f5' : '#fff', // Color de fondo
        '& .MuiOutlinedInput-root': {
          '& fieldset': {
            borderColor: error ? '#f44336' : '#ccc', // Color del borde en caso de error
          },
          '&:hover fieldset': {
            borderColor: error ? '#f44336' : '#3f51b5', // Color del borde al pasar el mouse
          },
          '&.Mui-focused fieldset': {
            borderColor: error ? '#f44336' : '#3f51b5', // Color del borde cuando está enfocado
          },
        },
      }}
    >
      {options.map((option) => (
        <MenuItem key={option.value} value={option.value}>
          {option.label}
        </MenuItem>
      ))}
    </TextField>
  );
};

export default SelectInput;