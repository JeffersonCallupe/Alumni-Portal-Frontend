import React, { useState } from "react";
import TextInput from "../../../atoms/inputs/TextInput";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import useForm from "../../../../hooks/useForm";

const RegisterEmpresaForm = ({ onSubmit, disabled, validate }) => {
    const [page, setPage] = useState(1);
    const { formData, errors, handleChange, handleSubmit } = useForm(
      {
        name: "",
        ruc: "",
        email: "",
        password: "",
        description: "",
        sector: "",
        phone: "",
        website: "",
        location: "",
        confirmPassword: "",
    },
      onSubmit,
      validate ? () => validate(formData) : undefined
    );
  
    return (
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ 
          display: "flex", 
          flexDirection: "column" 
        }}
      >
        {page === 1 && (
          <div>
            <TextInput
              label="Correo Electrónico"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              error={!!errors.email}
              helperText={errors.email}
            />
  
            <TextInput
              label="Contraseña"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              error={!!errors.password}
              helperText={errors.password}
            />
  
            <TextInput
              label="Confirmar Contraseña"
              name="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={handleChange}
              error={!!errors.confirmPassword}
              helperText={errors.confirmPassword}
            />
  
            <TextInput
              label="Nombre de la empresa"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              error={!!errors.name}
              helperText={errors.name}
            />
            <Button
              variant="contained"
              size="large"
              onClick={() => setPage(2)}
            >
              Siguiente
            </Button>
          </div>
        )}
  
        {page === 2 && (
          <div>
            <TextInput
              label="RUC"
              name="ruc"
              type="number"
              value={formData.ruc}
              onChange={handleChange}
              error={!!errors.ruc}
              helperText={errors.ruc}
            />
  
            <TextInput
              label="Descripción"
              name="description"
              type="text"
              value={formData.description}
              onChange={handleChange}
              error={!!errors.description}
              helperText={errors.description}
            />
  
            <TextInput
              label="Sector"
              name="sector"
              type="text"
              value={formData.sector}
              onChange={handleChange}
              error={!!errors.sector}
              helperText={errors.sector}
            />
            <Button type="submit" variant="contained" disabled={disabled} size="large">
              Registrar
            </Button>
          </div>
        )}
      </Box>
    );
  };

export default RegisterEmpresaForm;