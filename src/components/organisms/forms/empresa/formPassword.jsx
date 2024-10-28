import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextInput from "../../../atoms/inputs/TextInput";
import useForm from "../../../../hooks/useForm";
import useUpdatePassword from "../../../../hooks/useUpdatePassword"; // Importar el hook

const FormPassword = ({ userId, onCancel }) => {
  const { updatePassword, loading, error } = useUpdatePassword();

  // Definimos handleFormSubmit antes de usar useForm
  const handleFormSubmit = () => {
    updatePassword(userId, formData.email, formData.password, formData.newPassword);
  };

  const { formData, errors, handleChange, handleSubmit } = useForm(
    {
      email: "",
      password: "",
      newPassword: "",
    },
    handleFormSubmit
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
          label="Correo Electrónico"
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
        <div className="flex justify-end gap-4 mt-4">
        <Button variant="outlined" type="button" onClick={onCancel}>
          Cancelar
        </Button>
        <Button variant="contained" type="submit" disabled={loading}>
          Guardar
        </Button>
      </div>
        {/* {error && <p style={{ color: "red" }}>{error}</p>} */}
      </div>
    </Box>
  );
};

export default FormPassword;
