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
    onSubmit
  );

  const formFields = [
    { label: "Nombre", name: "name", value: formData.name },
    { label: "Sector", name: "sector", value: formData.sector },
    { label: "Locación", name: "location", value: formData.location },
    { label: "RUC", name: "ruc", value: formData.ruc },
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

export default FormHeader;
