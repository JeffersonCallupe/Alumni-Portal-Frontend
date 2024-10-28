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

  const { loading, error, updateData } = useUpdateData(`http://178.128.147.224:8080/api/education/${educationId}`);

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
      />
      <TextField
        label="Grado"
        name="degree"
        value={formData.degree}
        onChange={handleChange}
        disabled={loading}
      />
      <TextField
        label="Campo de Estudio"
        name="fieldOfStudy"
        value={formData.fieldOfStudy}
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

export default FormEditEducation;


