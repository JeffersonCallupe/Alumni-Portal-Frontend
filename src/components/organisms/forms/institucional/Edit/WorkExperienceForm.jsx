import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import useForm from '../../../../../hooks/useForm'; // Importa el hook personalizado
import useUpdateData from "../../../../../hooks/useUpdateData";
   // Asegúrate de que la ruta sea correcta

const WorkExperienceForm = ({ workExperienceId, initialData, onSubmit, onCancel, loading}) => {
  const { updateData} = useUpdateData(`${import.meta.env.VITE_API_URL}/api/work-experience/${workExperienceId}`);

  const { formData, handleChange, handleSubmit } = useForm(
    {
      company: initialData?.company || "",
      jobTitle: initialData?.jobTitle || "",
      startDate: initialData?.startDate || "",
      endDate: initialData?.endDate || "",
      description: initialData?.description || "",
    },
    async (formData) => {
      try {
        const updatedExperience = await updateData(formData);
        if (updatedExperience) {
           await onSubmit(updatedExperience);
        }
        onCancel(); // Cierra el formulario
        console.log('pasa por aqui')
      } catch (error) {
        console.error("Error al guardar la experiencia laboral:", error);
      }
    }
  );

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ display: "flex", flexDirection: "column", gap: 2, width: "100%" }}
    >
      <TextField
        label="Empresa"
        name="company"
        value={formData.company}
        required
        onChange={handleChange}
        disabled={loading}
      />
      <TextField
        label="Título del Puesto"
        name="jobTitle"
        value={formData.jobTitle}
        required
        onChange={handleChange}
        disabled={loading}
      />
      <TextField
        label="Fecha de Inicio"
        name="startDate"
        type="date"
        value={formData.startDate}
        required
        onChange={handleChange}
        disabled={loading}
        InputLabelProps={{ shrink: true }}
      />
      <TextField
        label="Fecha de Fin"
        name="endDate"
        type="date"
        value={formData.endDate}
        required
        onChange={handleChange}
        disabled={loading}
        InputLabelProps={{ shrink: true }}
      />
      <TextField
        label="Descripción"
        name="description"
        value={formData.description}
        required
        onChange={handleChange}
        disabled={loading}
        multiline
        rows={4}
      />
      <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>
        <Button variant="outlined" type="button" onClick={onCancel} >
          Cancelar
        </Button>
        <Button variant="contained" type="submit" disabled={loading}>
          {loading ? "Guardando..." : "Guardar"}
        </Button>
      </Box>
    </Box>
  );
};

export default WorkExperienceForm;
