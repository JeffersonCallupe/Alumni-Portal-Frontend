import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import useUpdateData from "../../../../../hooks/useUpdateData"; // Asegúrate de que la ruta sea correcta
import { useAlert } from "../../../../../contexts/alertContext";

const FormEditProject = ({ projectId, initialData, onUpdate, onCancel }) => {
  const { showAlert } = useAlert();
  const [formData, setFormData] = useState({
    name: initialData?.name || "",
    date: initialData?.date || "",
    description: initialData?.description || "",
  });


  const { loading, error, updateData } = useUpdateData(`${import.meta.env.VITE_API_URL}/api/project/${projectId}`);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedProject = await updateData(formData);
      if (updatedProject) { 
        onUpdate(updatedProject); 
      }
      console.log('alerta')
      showAlert("La información se actualizó con éxito", "success");
      onCancel(); 
    } catch (error) {
      showAlert("Error al guardar los cambios", "error");
    }
  };


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
      <br />
      <TextField
        label="Nombre del Proyecto"
        name="name"
        value={formData.name}
        onChange={handleChange}
        disabled={loading}
        required // Campo requerido
      />
      <TextField
        label="Fecha"
        name="date"
        type="date"
        value={formData.date}
        onChange={handleChange}
        disabled={loading}
        InputLabelProps={{
          shrink: true,
        }}
        required // Campo requerido
      />
      <TextField
        label="Descripción"
        name="description"
        value={formData.description}
        onChange={handleChange}
        disabled={loading}
        multiline
        rows={4}
        required // Campo requerido
      />
      <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>
        <Button variant="outlined" onClick={onCancel} disabled={loading}>
          Cancelar
        </Button>
        <Button variant="contained" type="submit" disabled={loading}>
          {loading ? "Guardando..." : "Guardar"}
        </Button>
      </Box>
      {error && <p style={{ color: "red" }}>{error}</p>} Mostrar mensaje de error
    </Box>
  );
};

export default FormEditProject;
