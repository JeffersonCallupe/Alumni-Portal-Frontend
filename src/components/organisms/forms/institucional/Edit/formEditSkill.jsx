import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import SelectInput from "../../../../atoms/inputs/SelectInput";
import useUpdateData from "../../../../../hooks/useUpdateData"; // Asegúrate de que la ruta sea correcta
import { useAlert } from "../../../../../contexts/alertContext";

const FormEditSkill = ({ skillId, initialData, onUpdate, onCancel }) => {
  const { showAlert } = useAlert();
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
      const updatedSkill = await updateData(formData); 
      if (updatedSkill) { 
        onUpdate(updatedSkill); 
      }
      showAlert("La información se actualizó con éxito", "success");
      onCancel(); 
    } catch (error) {
      showAlert("Error al guardar los cambios", "error");
    }
  };


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
        <Button variant="outlined" onClick={onCancel} disabled={loading}>
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