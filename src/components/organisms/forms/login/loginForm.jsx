import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextInput from "../../../atoms/inputs/TextInput";
import useForm from "../../../../hooks/useForm";

const LoginForm = ({ onSubmit, disabled, validate}) => {
  const { formData, errors, handleChange, handleSubmit } = useForm(
    { email: "", password: "" },
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
        label="Correo electrónico"
        name="email"
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
      <Button type="submit" variant="contained" size="large" disabled={disabled} fullWidth>
        Ingresar
      </Button>
    </Box>
  );
};

export default LoginForm;