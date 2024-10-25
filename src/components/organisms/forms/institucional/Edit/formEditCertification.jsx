import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

const FormEditCertification = ({ certificationId, initialData, onUpdate, onCancel }) => {
  const [formData, setFormData] = useState({
    name: initialData?.name || "",
    issuingOrganization: initialData?.issuingOrganization || "",
    issueDate: initialData?.issueDate || "",
    expirationDate: initialData?.expirationDate || "",
    credentialUrl: initialData?.credentialUrl || "",
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
    setError(null); // Limpiar errores anteriores

    try {
      const response = await fetch(`http://178.128.147.224:8080/api/certification/${certificationId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData), // Enviar el objeto formateado
      });

      if (!response.ok) {
        throw new Error("Error al actualizar la certificación.");
      }

      const updatedCertification = await response.json();
      onUpdate(updatedCertification); // Callback para actualizar la lista de certificaciones
      onCancel(); // Cerrar el formulario
    } catch (error) {
      setError(error.message); // Guardar el mensaje de error
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
        label="Nombre"
        name="name"
        value={formData.name}
        onChange={handleChange}
        disabled={loading}
        required // Campo requerido
      />
      <TextField
        label="Organización Emisora"
        name="issuingOrganization"
        value={formData.issuingOrganization}
        onChange={handleChange}
        disabled={loading}
        required // Campo requerido
      />
      <TextField
        label="Fecha de Emisión"
        name="issueDate"
        type="date" // Tipo de campo de fecha
        value={formData.issueDate}
        onChange={handleChange}
        disabled={loading}
        InputLabelProps={{
          shrink: true, // Asegura que la etiqueta se mantenga arriba
        }}
        required // Campo requerido
      />
      <TextField
        label="Fecha de Expiración"
        name="expirationDate"
        type="date" // Tipo de campo de fecha
        value={formData.expirationDate}
        onChange={handleChange}
        disabled={loading}
        InputLabelProps={{
          shrink: true, // Asegura que la etiqueta se mantenga arriba
        }}
      />
      <TextField
        label="URL de Credencial"
        name="credentialUrl"
        value={formData.credentialUrl}
        onChange={handleChange}
        disabled={loading}
      />
      <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>
        <Button variant="outlined" type="button" onClick={onCancel} disabled={loading}>
          Cancelar
        </Button>
        <Button variant="contained" type="submit" disabled={loading}>
          {loading ? "Guardando..." : "Guardar"}
        </Button>
      </Box>
      {error && <p style={{ color: 'red' }}>{error}</p>} {/* Mostrar mensaje de error */}
    </Box>
  );
};

export default FormEditCertification;