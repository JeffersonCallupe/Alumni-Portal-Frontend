import Button from "@mui/material/Button";
import React from "react";
import Box from "@mui/material/Box";
import TextInput from "../../../atoms/inputs/TextInput";
import useForm from "../../../../hooks/useForm";
import { useUserContext } from "../../../../contexts/userContext";

const FormHeader = ({ onSubmit, onCancel, loading }) => {
  const { userData } = useUserContext();
  const { formData, errors, handleChange, handleSubmit } = useForm(
    {
      name: userData.name || "",
      paternalSurname: userData.paternalSurname || "",
      maternalSurname: userData.maternalSurname || "",
      headline: userData.headline || "",
      email: userData.email || "",
      contactNumber: userData.contactNumber || "",
    },
    async (formData) => {
      try {
          await onSubmit(formData);
          onCancel(); // Cerrar el formulario si no hay errores
      } catch (error) {
          console.error("Error al enviar el formulario:", error);
      }
  }
  );

  const formFields = [
    { label: "Nombres", name: "name", value: formData.name },
    { label: "Apellido Paterno", name: "paternalSurname", value: formData.paternalSurname },
    { label: "Apellido Materno", name: "maternalSurname", value: formData.maternalSurname },
    { label: "Headline", name: "headline", value: formData.headline },
    // { label: "Correo Electrónico", name: "email", value: formData.email },
    { label: "Número de Contacto", name: "contactNumber", value: formData.contactNumber },
  ];

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
      {formFields.map(({ label, name, value }) => (
        <div key={name} className="flex flex-col sm:flex-row gap-2 sm:gap-4">
          <TextInput
            label={label}
            name={name}
            value={value}
            required={true}
            onChange={handleChange}
            error={errors[name]}
            helperText={errors[name]}
            disabled={loading}
          />
        </div>
      ))}
      <div className="flex justify-end gap-4 mt-4">
        <Button variant="outlined" type="button" onClick={onCancel} disabled={loading}>
          Cancelar
        </Button>
        <Button variant="contained" type="submit" disabled={loading}>
          {loading ? "Guardando..." : "Guardar"}
        </Button>
      </div>
    </Box>
  );
};

export default FormHeader;
