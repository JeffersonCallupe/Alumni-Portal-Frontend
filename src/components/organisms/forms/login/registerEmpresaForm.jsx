import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import TextInput from "../../../atoms/inputs/textInput";
import useForm from "../../../../hooks/useForm";

const RegisterEmpresaForm = ({ onSubmit, disabled, validate }) => {
    const [page, setPage] = useState(1);
    const { formData, errors, handleChange, handleValidation, handleSubmit } = useForm(
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

    const sectorOptions = [
      "Agricultura",
      "Banca",
      "Construcción",
      "Educación",
      "Energía",
      "Finanzas",
      "Manufactura",
      "Retail",
      "Salud",
      "Tecnología",
      "Telecomunicaciones",
      "Transporte",
      "Turismo",
      "Otro",
    ]

    const handleNextPage = () => {
      const fieldsToValidate = ["email", "password", "confirmPassword", "name"];
      if (handleValidation(fieldsToValidate)) {
          setPage(2);
      }
  };  
  
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
              onClick={handleNextPage}
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
            <FormControl fullWidth sx={{marginBottom: 2}}>
              <InputLabel>Sector</InputLabel>
              <Select
                name="sector"
                value={formData.sector}
                onChange={handleChange}
                error={!!errors.sector}
                label="sector"
              >
                {sectorOptions.map((sector) => (
                  <MenuItem key={sector} value={sector}>
                    {sector}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <div className="flex flex-col md:flex-row gap-4 justify-around">
              <Button type="button" variant="contained" disabled={disabled} size="large" onClick={() => setPage(1)}>
                Regresar
              </Button>
              <Button type="submit" variant="contained" disabled={disabled} size="large">
                Registrar
              </Button>
            </div>
          </div>
        )}
      </Box>
    );
  };

export default RegisterEmpresaForm;