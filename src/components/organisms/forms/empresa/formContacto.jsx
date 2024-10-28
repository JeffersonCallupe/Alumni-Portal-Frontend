import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextInput from "../../../atoms/inputs/TextInput";
import useForm from "../../../../hooks/useForm";
import { useUserContext } from "../../../../contexts/userContext";

const FormContacto = ({ onSubmit, onCancel, loading }) => {
  const { userData } = useUserContext();
  const { formData, errors, handleChange, handleSubmit } = useForm(
    {
      email: userData.email || "",
      phone: userData.phone || "",
      website: userData.website || "",
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
    { label: "Correo Electrónico", name: "email", value: formData.email },
    { label: "Teléfono", name: "phone", value: formData.phone },
    { label: "Sitio Web", name: "website", value: formData.website },
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
          {/* <label className="text-l font-bold text-black sm:w-1/4 lg:w-1/6">
            {label}:
          </label> */}
          <TextInput
            name={name}
            label={label}
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
        <Button variant="outlined" type="button" onClick={onCancel}>
          Cancelar
        </Button>
        <Button variant="contained" type="submit" disabled={loading}>
          Guardar
        </Button>
      </div>
    </Box>
  );
};

export default FormContacto;
