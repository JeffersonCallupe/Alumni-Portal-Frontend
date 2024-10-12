import React from 'react';
import { TextField, MenuItem } from '@mui/material';

const SelectInput = ({ name, value, onChange, error, helperText, disabled, options }) => {
    return (
        <TextField
            select
            name={name}
            value={value}
            onChange={onChange}
            error={Boolean(error)}
            helperText={helperText}
            disabled={disabled}
            variant="outlined" // Estilo de borde
            fullWidth // Ocupa el ancho completo
            sx={{
                backgroundColor: disabled ? '#f5f5f5' : '#fff', // Color de fondo
                '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                        borderColor: error ? 'red' : '#ccc', // Color del borde en caso de error
                    },
                    '&:hover fieldset': {
                        borderColor: error ? 'red' : '#3f51b5', // Color del borde al pasar el mouse
                    },
                    '&.Mui-focused fieldset': {
                        borderColor: '#3f51b5', // Color del borde cuando está enfocado
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