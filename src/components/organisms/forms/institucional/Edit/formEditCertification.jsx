import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import useUpdateData from "../../../../../hooks/useEditInstitutional"; // Asegúrate de que la ruta sea correcta

const FormEditCertification = ({ certificationId, initialData, onUpdate, onCancel }) => {
  const [formData, setFormData] = useState({
    name: initialData?.name || "",
    issuingOrganization: initialData?.issuingOrganization || "",
    issueDate: initialData?.issueDate || "",
    expirationDate: initialData?.expirationDate || "",
    credentialUrl: initialData?.credentialUrl || "",
  });
  
  // Usar el hook para manejar la actualización de datos
  const { loading, error, updateData } = useUpdateData(`${import.meta.env.VITE_API_URL}/api/certification/${certificationId}`);

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
      const updatedCertification = await updateData(formData); // Utilizar el hook para actualizar
      if (updatedCertification) { // Verificar que la actualización fue exitosa
        onUpdate(updatedCertification); // Callback para actualizar la lista de certificaciones
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
        <Button variant="outlined" type="button" onClick={handleCancel} disabled={loading}>
          Cancelar
        </Button>
        <Button variant="contained" type="submit" disabled={loading}>
          {loading ? "Guardando..." : "Guardar"}
        </Button>
      </Box>
      {/* {error && <p style={{ color: 'red' }}>{error}</p>} Mostrar mensaje de error */}
    </Box>
  );
};

export default FormEditCertification;
