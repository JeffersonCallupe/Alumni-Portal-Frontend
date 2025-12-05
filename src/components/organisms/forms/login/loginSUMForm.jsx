import React from "react";
import TextInput from "../../../atoms/inputs/TextInput";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import useForm from "../../../../hooks/useForm";

const LoginSumForm = ({ onSubmit, disabled, validate }) => {
  const { formData, errors, handleChange, handleSubmit } = useForm(
    { username: "", password: "" },
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
        name="username"
        value={formData.username}
        onChange={handleChange}
        error={!!errors.username}
        helperText={errors.username}
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

export default LoginSumForm;