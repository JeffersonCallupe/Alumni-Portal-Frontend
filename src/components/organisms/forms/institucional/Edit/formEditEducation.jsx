import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField"; 
import useUpdateData from '../../../../../hooks/useEditInstitutional'; // Importa el hook

const FormEditEducation = ({ educationId, initialData, onUpdate, onCancel }) => {
  const [formData, setFormData] = useState({
    institution: initialData?.institution || "",
    degree: initialData?.degree || "",
    fieldOfStudy: initialData?.fieldOfStudy || "",
    startDate: initialData?.startDate || "", 
    endDate: initialData?.endDate || "", 
    description: initialData?.description || "",
  });

  const { loading, error, updateData } = useUpdateData(`${import.meta.env.VITE_API_URL}/api/education/${educationId}`);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedEducation = await updateData(formData);
    if (updatedEducation) {
      onUpdate(updatedEducation);
      onCancel();
    }
  };

  const handleCancel = () => {
    window.location.reload();
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ display: "flex", flexDirection: "column", gap: 2, width: "100%" }}
    >
      <br></br>
      <TextField
        label="Institución"
        name="institution"
        value={formData.institution}
        onChange={handleChange}
        disabled={loading}
        required // Campo requerido
      />
      <TextField
        label="Grado"
        name="degree"
        value={formData.degree}
        onChange={handleChange}
        disabled={loading}
        required // Campo requerido
      />
      <TextField
        label="Campo de Estudio"
        name="fieldOfStudy"
        value={formData.fieldOfStudy}
        onChange={handleChange}
        disabled={loading}
        required // Campo requerido
      />
      <TextField
        label="Fecha de Inicio"
        name="startDate"
        type="date"
        value={formData.startDate}
        onChange={handleChange}
        disabled={loading}
        required // Campo requerido
        InputLabelProps={{ shrink: true }}
      />
      <TextField
        label="Fecha de Fin"
        name="endDate"
        type="date"
        value={formData.endDate}
        onChange={handleChange}
        disabled={loading}
        required // Campo requerido
        InputLabelProps={{ shrink: true }}
      />
      <TextField
        label="Descripción"
        name="description"
        value={formData.description}
        onChange={handleChange}
        disabled={loading}
        multiline
        required // Campo requerido
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
      {/* {error && <p className="text-red-500">{error}</p>} */}
    </Box>
  );
};

export default FormEditEducation;


