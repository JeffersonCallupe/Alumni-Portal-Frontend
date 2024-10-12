import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextInput from "../../../atoms/inputs/TextInput";
import useForm from "../../../../hooks/useForm";

const FormContacto = ({ onSubmit, onCancel, loading }) => {
  const { formData, errors, handleChange, handleSubmit } = useForm(
    {
      email: "",
      password: "",
      newPassword: "",
    },
    onSubmit
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
      <div className="flex flex-col sm:flex-row md:flex-col gap-2 sm:gap-4">
          <TextInput
            label={"Correo Electrónico"}
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            error={errors.email}
            helperText={errors.email}
            disabled={loading}
          />
        <TextInput
            label="Contraseña Actual"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            error={errors.password}
            helperText={errors.password}
            disabled={loading}
        />
        <TextInput
            label="Nueva Contraseña"
            name="newPassword"
            type="password"
            value={formData.newPassword}
            onChange={handleChange}
            error={errors.newPassword}
            helperText={errors.newPassword}
            disabled={loading}
        />
        </div>
      <div>
        <Button type="button" onClick={onCancel}>
          Cancelar
        </Button>
        <Button type="submit" disabled={loading}>
          Guardar Cambios
        </Button>
      </div>
    </Box>
  );
};

export default FormContacto;
