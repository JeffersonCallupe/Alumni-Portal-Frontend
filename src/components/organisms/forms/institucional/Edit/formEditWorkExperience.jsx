import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import useUpdateData from '../../../../../hooks/useEditInstitutional';

const FormWorkExperience = ({ workExperienceId, initialData, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(true);
  const [formData, setFormData] = useState({
    company: initialData?.company || "",
    jobTitle: initialData?.jobTitle || "",
    startDate: initialData?.startDate || "",
    endDate: initialData?.endDate || "",
    description: initialData?.description || "",
  });

  const { loading, error, updateData } = useUpdateData(`${import.meta.env.VITE_API_URL}/api/work-experience/${workExperienceId}`);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedExperience = await updateData(formData);
    if (updatedExperience) {
      if (onUpdate) {
        onUpdate(updatedExperience);
      }
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    window.location.reload();
  };

  if (!isEditing) {
    return null; // O podrías mostrar un mensaje o redirigir
  }

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ display: "flex", flexDirection: "column", gap: 2, width: "100%" }}
    >
      <br />
      <TextField
        label="Empresa"
        name="company"
        value={formData.company}
        required // Campo requerido
        onChange={handleChange}
        disabled={loading}
      />
      <TextField
        label="Título del Puesto"
        name="jobTitle"
        value={formData.jobTitle}
        required // Campo requerido
        onChange={handleChange}
        disabled={loading}
      />
      <TextField
        label="Fecha de Inicio"
        name="startDate"
        type="date"
        value={formData.startDate}
        required // Campo requerido
        onChange={handleChange}
        disabled={loading}
        InputLabelProps={{ shrink: true }}
      />
      <TextField
        label="Fecha de Fin"
        name="endDate"
        type="date"
        value={formData.endDate}
        onChange={handleChange}
        required // Campo requerido
        disabled={loading}
        InputLabelProps={{ shrink: true }}
      />
      <TextField
        label="Descripción"
        name="description"
        value={formData.description}
        required // Campo requerido
        onChange={handleChange}
        disabled={loading}
        multiline
        rows={4}
      />
      <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>
        <Button variant="outlined" type="button" onClick={handleCancel} disabled={loading}>
          Cancelar
        </Button>
        <Button variant="contained" type="submit" disabled={loading}>
          {loading ? "Guardando..." : "Guardar"}
        </Button>
      </Box>
      {error && (
        <Box sx={{ color: 'error.main', mt: 2 }}>
          {error}
        </Box>
      )}
    </Box>
  );
};

export default FormWorkExperience;

