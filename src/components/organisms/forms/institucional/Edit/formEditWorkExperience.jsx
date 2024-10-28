import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField"; 
import useUpdateData from '../../../../../hooks/useEditInstitutional'; // Importa el hook

const FormWorkExperience = ({ workExperienceId, initialData, onUpdate, onCancel }) => {
  const [formData, setFormData] = useState({
    company: initialData?.company || "",
    jobTitle: initialData?.jobTitle || "",
    startDate: initialData?.startDate || "", 
    endDate: initialData?.endDate || "", 
    description: initialData?.description || "",
  });

  const { loading, error, updateData } = useUpdateData(`http://178.128.147.224:8080/api/work-experience/${workExperienceId}`);

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
      onUpdate(updatedExperience);
      onCancel();
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ display: "flex", flexDirection: "column", gap: 2, width: "100%" }}
    >
      <br></br>
      <TextField
        label="Empresa"
        name="company"
        value={formData.company}
        onChange={handleChange}
        disabled={loading}
      />
      <TextField
        label="Título del Puesto"
        name="jobTitle"
        value={formData.jobTitle}
        onChange={handleChange}
        disabled={loading}
      />
      <TextField
        label="Fecha de Inicio"
        name="startDate"
        type="date"
        value={formData.startDate}
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
        disabled={loading}
        InputLabelProps={{ shrink: true }}
      />
      <TextField
        label="Descripción"
        name="description"
        value={formData.description}
        onChange={handleChange}
        disabled={loading}
        multiline
        rows={4}
      />
      <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>
        <Button variant="outlined" type="button" onClick={onCancel} disabled={loading}>
          Cancelar
        </Button>
        <Button variant="contained" type="submit" disabled={loading}>
          {loading ? "Guardando..." : "Guardar"}
        </Button>
      </Box>
      {/* {error && <p className="text-red-500">{error}</p>} */}
    </Box>
  );
};

export default FormWorkExperience;

