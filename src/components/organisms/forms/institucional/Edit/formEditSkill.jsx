import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import SelectInput from "../../../../atoms/inputs/SelectInput";

const FormEditSkill = ({ skillId, initialData, onUpdate, onCancel }) => {
  const [formData, setFormData] = useState({
    name: initialData?.name || "",
    level: initialData?.level || "",
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
      const response = await fetch(`http://178.128.147.224:8080/api/skill/${skillId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Error al actualizar la habilidad");
      }

      const updatedSkill = await response.json();
      onUpdate(updatedSkill); // Callback para actualizar la lista de habilidades
      onCancel(); // Cierra el formulario
    } catch (error) {
      setError("");
    } finally {
      setLoading(false);
    }
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
      <TextField
        label="Nombre de la Habilidad"
        name="name"
        value={formData.name}
        onChange={handleChange}
        disabled={loading}
      />
      <SelectInput
        name="level"
        value={formData.level}
        onChange={handleChange}
        disabled={loading}
        options={levelOptions}
        error={Boolean(error)}
        helperText={error}
      />
      <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>
        <Button variant="outlined" onClick={onCancel} disabled={loading}>
          Cancelar
        </Button>
        <Button variant="contained" type="submit" disabled={loading}>
          {loading ? "Guardando..." : "Guardar"}
        </Button>
      </Box>
      {error && <p className="text-red-500">{error}</p>}
    </Box>
  );
};

export default FormEditSkill;

