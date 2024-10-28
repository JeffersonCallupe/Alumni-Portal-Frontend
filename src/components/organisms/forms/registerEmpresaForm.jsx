import React, { useState } from "react";
import TextInput from "../../atoms/inputs/TextInput";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import useForm from "../../../hooks/useForm";


const RegisterEmpresaForm = ({ onSubmit, validate }) => {
    const [page, setPage] = useState(1);
  
    const extractRequiredData = (data) => {
      return {
        name: data.name || "",
        ruc: data.ruc || "",
        email: data.email || "",
        password: "",
        description: data.description || " ",
        sector: data.sector || " ",
        phone: data.phone || " ",
        website: data.website || " ",
        location: data.location || " ",
        confirmPassword: "",
      };
    };
  
    const initialFormData = extractRequiredData(
      JSON.parse(sessionStorage.getItem("user")) || {}
    );
    const { formData, errors, handleChange, handleSubmit } = useForm(
      initialFormData,
      onSubmit,
      validate ? () => validate(formData) : undefined
    );
  
    return (
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ display: "flex", flexDirection: "column" }}
      >
        {page === 1 && (
          <div>
            <TextInput
              label="Correo Electrónico"
              name="email"
              type="email"
              required={true}
              value={formData.email}
              onChange={handleChange}
              error={errors.email}
              helperText={errors.email}
            />
  
            <TextInput
              label="Contraseña"
              name="password"
              type="password"
              value={formData.password}
              required={true}
              onChange={handleChange}
              error={errors.password}
              helperText={errors.password}
            />
  
            <TextInput
              label="Confirmar Contraseña"
              name="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              required={true}
              onChange={handleChange}
              error={errors.confirmPassword}
              helperText={errors.confirmPassword}
            />
  
            <TextInput
              label="Nombre de la empresa"
              name="name"
              type="text"
              value={formData.name}
              required={true}
              onChange={handleChange}
              error={errors.name}
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
              required={true}
              value={formData.ruc}
              onChange={handleChange}
              error={errors.ruc}
              helperText={errors.ruc}
            />
  
            <TextInput
              label="Descripción"
              name="description"
              required={true}
              type="text"
              value={formData.description}
              onChange={handleChange}
              error={errors.description}
              helperText={errors.description}
            />
  
            <TextInput
              label="Sector"
              name="sector"
              type="text"
              value={formData.sector}
              required={true}
              onChange={handleChange}
              error={errors.sector}
              helperText={errors.sector}
            />
            <Button type="submit" variant="contained" size="large">
              Registrar
            </Button>
          </div>
        )}
      </Box>
    );
  };

export default RegisterEmpresaForm;