import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextInput from "../../../atoms/inputs/TextInput";
import useForm from "../../../../hooks/useForm";
import { useUserContext } from "../../../../contexts/userContextInstitucional";

const FormWorkExperience = ({ onSubmit, onCancel, loading, workExperience }) => {
  const { userData } = useUserContext();
  
  // Iniciamos los valores del formulario con la experiencia laboral existente o valores vacíos
  const { formData, errors, handleChange, handleSubmit } = useForm(
    {
      jobTitle: workExperience?.jobTitle || "",
      company: workExperience?.company || "",
      startDate: workExperience?.startDate || "",
      endDate: workExperience?.endDate || "",
      description: workExperience?.description || "",
    },
    onSubmit
  );

  // Definimos los campos específicos para la experiencia laboral
  const formFields = [
    { label: "Título del Puesto", name: "jobTitle", value: formData.jobTitle },
    { label: "Empresa", name: "company", value: formData.company },
    { label: "Fecha de Inicio", name: "startDate", value: formData.startDate },
    { label: "Fecha de Fin", name: "endDate", value: formData.endDate },
    { label: "Descripción", name: "description", value: formData.description },
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
          <label className="text-l font-bold text-black sm:w-1/4 lg:w-1/6">
            {label}:
          </label>
          <TextInput
            name={name}
            value={value}
            onChange={handleChange}
            error={errors[name]}
            helperText={errors[name]}
            disabled={loading}
          />
        </div>
      ))}
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

export default FormWorkExperience;
