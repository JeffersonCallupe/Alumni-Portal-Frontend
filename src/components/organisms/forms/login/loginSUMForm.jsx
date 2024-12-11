import React from "react";
import TextInput from "../../../atoms/inputs/TextInput";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import useForm from "../../../../hooks/useForm";

const LoginForm = ({ onSubmit, disabled, validate}) => {
  const { formData, errors, handleChange, handleSubmit } = useForm(
    { usuario: "", clave: "" },
    onSubmit,
    validate ? () => validate(formData) : undefined
  );

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        width: "100%",
      }}
    >
      <TextInput
        label="Nombre de usuario"
        name="usuario"
        value={formData.usuario}
        onChange={handleChange}
        error={!!errors.usuario}
        helperText={errors.usuario}
      />
      <TextInput
        label="Contraseña"
        name="clave"
        type="password"
        value={formData.clave}
        onChange={handleChange}
        error={!!errors.clave}
        helperText={errors.clave}
      />
      <Button type="submit" variant="contained" size="large" disabled={disabled} fullWidth>
        Ingresar
      </Button>
    </Box>
  );
};

export default LoginForm;