import React, { useState, useEffect } from "react";
import TextInput from "../../atoms/inputs/TextInput";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import useFormRegistro from "../../../hooks/useFormRegistroSUM";

const RegisterInstitucionalForm = ({ onSubmit }) => {
  const [page, setPage] = useState(1); // Controla la página del formulario

  // Inicialización del formulario con los datos del sessionStorage
  const extractRequiredData = (data) => {
    return {
      apePaterno: data.apePaterno || "",
      apeMaterno: data.apeMaterno || "",
      nomAlumno: data.nomAlumno || "",
      desFacultad: data.desFacultad || "",
      desEscuela: data.desEscuela || "",
      codPlan: data.codPlan || "",
      desPermanencia: data.desPermanencia || "",
      codAlumno: data.codAlumno || "",
      correoInstitucional: data.correoInstitucional || "",
      password: "",
      confirmPassword: "",
    };
  };

  const initialFormData = extractRequiredData(JSON.parse(sessionStorage.getItem("user")) || {});

  const { formData, errors, handleChange, handleSubmit } =
    useFormRegistro(initialFormData, onSubmit);

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ display: "flex", flexDirection: "column"}}
    >
      {/* Página 1: Datos del usuario (deshabilitados) */}
      {page === 1 && (
        <div className="p-8">
          <div className="flex flex-row items-center justify-center gap-4">
            <div className="space-between">
              <TextInput
                label="Apellido Paterno"
                name="apePaterno"
                value={formData.apePaterno}
                onChange={handleChange}
                error={errors.apePaterno}
                disabled={true}
              />
              <TextInput
                label="Apellido Materno"
                name="apeMaterno"
                value={formData.apeMaterno}
                onChange={handleChange}
                error={errors.apeMaterno}
                disabled={true}
              />
              <TextInput
                label="Nombres"
                name="nomAlumno"
                value={formData.nomAlumno}
                onChange={handleChange}
                error={errors.nomAlumno}
                disabled={true}
              />
            </div>
            <div className="space-between">
              <TextInput
                label="Facultad"
                name="desFacultad"
                value={formData.desFacultad}
                onChange={handleChange}
                error={errors.desFacultad}
                disabled={true}
              />
              <TextInput
                label="Escuela"
                name="desEscuela"
                value={formData.desEscuela}
                onChange={handleChange}
                error={errors.desEscuela}
                disabled={true}
              />
              <TextInput
                label="Plan de Estudios"
                name="codPlan"
                value={formData.codPlan}
                onChange={handleChange}
                error={errors.codPlan}
                disabled={true}
              />
            </div>
            <div className="space-between">
              <TextInput
                label="Permanencia"
                name="desPermanencia"
                value={formData.desPermanencia}
                onChange={handleChange}
                error={errors.desPermanencia}
                disabled={true}
              />
              <TextInput
                label="Código Alumno"
                name="codAlumno"
                value={formData.codAlumno}
                onChange={handleChange}
                error={errors.codAlumno}
                disabled={true}
              />
              <TextInput
                label="Correo Institucional"
                name="correoInstitucional"
                value={formData.correoInstitucional}
                onChange={handleChange}
                error={errors.correoInstitucional}
                disabled={true}
              />
            </div>
          </div>
          <Button
            variant="contained"
            size="large"
            onClick={() => setPage(2)}
          >
            Siguiente
          </Button>
        </div>
      )}

      {/* Página 2: Contraseña */}
      {page === 2 && (
        <div>
          <TextInput
            label="Contraseña"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            error={errors.password}
            helperText={errors.password}
          />
          <TextInput
            label="Confirmar Contraseña"
            name="confirmPassword"
            type="password"
            value={formData.confirmPassword}
            onChange={handleChange}
            error={errors.confirmPassword}
            helperText={errors.confirmPassword}
          />
          <Button type="submit" variant="contained" size="large">
            Enviar
          </Button>
        </div>
      )}
    </Box>
  );
};

export default RegisterInstitucionalForm;
