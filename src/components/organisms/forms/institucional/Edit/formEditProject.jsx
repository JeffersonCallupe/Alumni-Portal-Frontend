import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

const FormEditProject = ({ projectId, initialData, onUpdate, onCancel }) => {
  const [formData, setFormData] = useState({
    name: initialData?.name || "",
    date: initialData?.date || "",
    description: initialData?.description || "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(`http://178.128.147.224:8080/api/project/${projectId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Error al actualizar el proyecto.");
      }

      const updatedProject = await response.json();
      onUpdate(updatedProject);
      onCancel();
    } catch (error) {
      setError("No se pudo actualizar el proyecto.");
    } finally {
      setLoading(false);
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
      <TextField
        label="Nombre del Proyecto"
        name="name"
        value={formData.name}
        onChange={handleChange}
        disabled={loading}
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
        <Button variant="outlined" onClick={onCancel} disabled={loading}>
          Cancelar
        </Button>
        <Button variant="contained" type="submit" disabled={loading}>
          {loading ? "Guardando..." : "Guardar"}
        </Button>
      </Box>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </Box>
  );
};

export default FormEditProject;
