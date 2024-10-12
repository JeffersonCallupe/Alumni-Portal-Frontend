import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextInput from "../../../atoms/inputs/TextInput";
import useForm from "../../../../hooks/useForm";
import { useUserContext } from "../../../../contexts/userContextInstitucional";

const FormNewExperience = ({ onSubmit, onCancel, loading }) => {
  const { userData } = useUserContext();
  const { formData, errors, handleChange, handleSubmit } = useForm(
    {
      company: "", // Empresa
      jobTitle: "", // Título del puesto
      startDate: "", // Fecha de inicio
      endDate: "", // Fecha de fin
      description: "", // Descripción del trabajo
    },
    onSubmit
  );

  // Definición de los campos del formulario
  const formFields = [
    { label: "Empresa", name: "company", value: formData.company },
    { label: "Título del puesto", name: "jobTitle", value: formData.jobTitle },
    { label: "Fecha de inicio", name: "startDate", value: formData.startDate, type: "date" },
    { label: "Fecha de fin", name: "endDate", value: formData.endDate, type: "date" },
    { label: "Descripción", name: "description", value: formData.description, multiline: true },
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
      {formFields.map(({ label, name, value, type, multiline }) => (
        <div key={name} className="flex flex-col sm:flex-row gap-2 sm:gap-4">
          <label className="text-l font-bold text-black sm:w-1/4 lg:w-1/6">
            {label}:
          </label>
          <TextInput
            name={name}
            value={value}
            onChange={handleChange}
            error={!!errors[name]} // Usar !! para convertir a booleano
            helperText={errors[name] || ""} // Evitar undefined
            disabled={loading}
            type={type || "text"}
            multiline={multiline || false}
            rows={multiline ? 4 : 1}
            variant="outlined" // Si deseas especificar el estilo del TextInput
          />
        </div>
      ))}
      <div className="flex justify-end gap-4 mt-4">
        <Button variant="outlined" type="button" onClick={onCancel} disabled={loading}>
          Cancelar
        </Button>
        <Button variant="contained" type="submit" disabled={loading}>
          Guardar Cambios
        </Button>
      </div>
    </Box>
  );
};

export default FormNewExperience;
