import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import SelectInput from "../../../../atoms/inputs/SelectInput";
import useUpdateData from "../../../../../hooks/useEditInstitutional"; // Asegúrate de que la ruta sea correcta

const FormEditSkill = ({ skillId, initialData, onUpdate, onCancel }) => {
  const [formData, setFormData] = useState({
    name: initialData?.name || "",
    level: initialData?.level || "",
  });

  // Usar el hook para manejar la actualización de datos
  const { loading, error, updateData } = useUpdateData(`${import.meta.env.VITE_API_URL}/api/skill/${skillId}`);

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
      const updatedSkill = await updateData(formData); // Utilizar el hook para actualizar
      if (updatedSkill) { // Verificar que la actualización fue exitosa
        onUpdate(updatedSkill); // Callback para actualizar la lista de habilidades
        onCancel(); // Cerrar el formulario
      }
    } catch (error) {
      console.error(error); // Manejar errores (ya están capturados en el hook)
    }
  };
  const handleCancel = () => {
    window.location.reload();
  };
  // Opciones para el nivel de habilidad
  const levelOptions = [
    { value: "", label: "Selecciona un nivel" },
    { value: "Beginner", label: "Beginner" },
    { value: "Intermediate", label: "Intermediate" },
    { value: "Advanced", label: "Advanced" },
  ];

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
        label="Nombre de la Habilidad"
        name="name"
        value={formData.name}
        onChange={handleChange}
        disabled={loading}
        required // Campo requerido
      />
      <SelectInput
        name="level"
        value={formData.level}
        onChange={handleChange}
        disabled={loading}
        options={levelOptions}
        error={Boolean(error)}
        required={true}
      />
      <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>
        <Button variant="outlined" onClick={handleCancel} disabled={loading}>
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

export default FormEditSkill;


