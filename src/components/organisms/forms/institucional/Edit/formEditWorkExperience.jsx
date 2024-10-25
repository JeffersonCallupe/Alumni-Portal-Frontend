import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField"; // Usamos TextField de MUI para los inputs

const FormWorkExperience = ({ workExperienceId, initialData, onUpdate, onCancel }) => {
  const [formData, setFormData] = useState({
    company: initialData?.company || "",
    jobTitle: initialData?.jobTitle || "",
    startDate: initialData?.startDate || "", // Campo para la fecha de inicio
    endDate: initialData?.endDate || "", // Campo para la fecha de fin
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
      // Asegúrate de que las fechas estén en formato ISO (yyyy-MM-dd)
      const dataToSend = {
        ...formData,
        startDate: formData.startDate, // Asegúrate de que esté en el formato adecuado
        endDate: formData.endDate, // Asegúrate de que esté en el formato adecuado
      };

      const response = await fetch(`http://178.128.147.224:8080/api/work-experience/${workExperienceId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSend), // Enviar el objeto formateado
      });

      if (!response.ok) {
        throw new Error("Error al actualizar la experiencia laboral.");
      }

      const updatedExperience = await response.json();
      onUpdate(updatedExperience); // Callback para actualizar la lista de experiencias
      onCancel(); // Cierra el formulario
    } catch (error) {
      
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
        type="date" // Tipo de campo de fecha
        value={formData.startDate}
        onChange={handleChange}
        disabled={loading}
        InputLabelProps={{
          shrink: true, // Asegura que la etiqueta se mantenga arriba
        }}
      />
      <TextField
        label="Fecha de Fin"
        name="endDate"
        type="date" // Tipo de campo de fecha
        value={formData.endDate}
        onChange={handleChange}
        disabled={loading}
        InputLabelProps={{
          shrink: true, // Asegura que la etiqueta se mantenga arriba
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
        <Button variant="outlined" type="button" onClick={onCancel} disabled={loading}>
          Cancelar
        </Button>
        <Button variant="contained" type="submit" disabled={loading}>
          {loading ? "Guardando..." : "Guardar"}
        </Button>
      </Box>
      {error && <p className="text-red-500">{error}</p>} {/* Mostrar mensaje de error */}
    </Box>
  );
};

export default FormWorkExperience;

