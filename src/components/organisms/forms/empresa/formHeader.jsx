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
      sector: userData.sector || "",
      location: userData.location || "",
      ruc: userData.ruc || "",
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
    { label: "Nombre de la empresa", name: "name", value: formData.name },
    { label: "Sector de la empresa", name: "sector", value: formData.sector },
    { label: "Locación de la empresa", name: "location", value: formData.location },
    { label: "RUC de la empresa", name: "ruc", value: formData.ruc },
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
