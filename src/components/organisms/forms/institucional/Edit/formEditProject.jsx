import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import useUpdateData from "../../../../../hooks/useEditInstitutional"; // Asegúrate de que la ruta sea correcta

const FormEditProject = ({ projectId, initialData, onUpdate, onCancel }) => {
  const [formData, setFormData] = useState({
    name: initialData?.name || "",
    date: initialData?.date || "",
    description: initialData?.description || "",
  });

  // Usar el hook para manejar la actualización de datos
  const { loading, error, updateData } = useUpdateData(`http://178.128.147.224:8080/api/project/${projectId}`);

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
      const updatedProject = await updateData(formData); // Utilizar el hook para actualizar
      if (updatedProject) { // Verificar que la actualización fue exitosa
        onUpdate(updatedProject); // Callback para actualizar el proyecto
        onCancel(); // Cerrar el formulario
      }
    } catch (error) {
      console.error(error); // Manejar errores (ya están capturados en el hook)
    }
  };

  const handleCancel = () => {
    window.location.reload();
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
        <Button variant="outlined" onClick={handleCancel} disabled={loading}>
          Cancelar
        </Button>
        <Button variant="contained" type="submit" disabled={loading}>
          {loading ? "Guardando..." : "Guardar"}
        </Button>
      </Box>
      {/* {error && <p style={{ color: "red" }}>{error}</p>} Mostrar mensaje de error */}
    </Box>
  );
};

export default FormEditProject;
