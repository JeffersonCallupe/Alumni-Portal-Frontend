import React from 'react';
import TextField from '@mui/material/TextField';

const TextInput = ({
  label,
  name,
  value,
  onChange,
  type = 'text',
  fullWidth = true,
  disabled = false,
  required = false,
  error = false,
  helperText = '',
  multiline = false,
  rows = 1,
}) => {
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
      disabled={disabled}
      required={required} // Agregando el atributo requerido
      error={error} // Para mostrar el estado de error en el campo
      helperText={helperText} // Texto de ayuda o mensaje de error
      multiline={multiline} // Campo de texto multilínea
      rows={rows} // Número de filas para campos multilínea
      InputLabelProps={{
        shrink: true, // Hace que el label permanezca arriba
      }}
    />
  );
};

export default TextInput;
