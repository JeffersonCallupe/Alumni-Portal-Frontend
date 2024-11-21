import React, { useState } from "react";
import TextInput from "../../../atoms/inputs/TextInput";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import useForm from "../../../../hooks/useForm";

const RegisterInstitucionalForm = ({ onSubmit, validate }) => {
  const [page, setPage] = useState(1);

  // Inicialización del formulario con los datos del sessionStorage
  const extractRequiredData = (data) => {
    return {
      email: data.correoInstitucional || "",
      password: "",
      paternalSurname: data.apePaterno || "",
      maternalSurname: data.apeMaterno || "",
      name: data.nomAlumno || "",
      faculty: data.desFacultad || "",
      career: data.desEscuela || "",
      plan: data.codPlan || "",
      permanence: data.desPermanencia || "",
      studentCode: data.codAlumno || "",
      confirmPassword: "",
    };
  };

  const initialFormData = extractRequiredData(JSON.parse(sessionStorage.getItem("userSUM")) || {});
  const { formData, errors, handleChange, handleSubmit } = useForm(
    initialFormData, 
    onSubmit,
    validate ? () => validate(formData) : undefined
    );

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
                name="paternalSurname"
                value={formData.paternalSurname}
                onChange={handleChange}
                error={errors.paternalSurname}
                disabled={true}
              />
              <TextInput
                label="Apellido Materno"
                name="maternalSurname"
                value={formData.maternalSurname}
                onChange={handleChange}
                error={errors.maternalSurname}
                disabled={true}
              />
              <TextInput
                label="Nombres"
                name="name"
                value={formData.name}
                onChange={handleChange}
                error={errors.name}
                disabled={true}
              />
            </div>
            <div className="space-between">
              <TextInput
                label="Facultad"
                name="faculty"
                value={formData.faculty}
                onChange={handleChange}
                error={errors.faculty}
                disabled={true}
              />
              <TextInput
                label="Escuela"
                name="career"
                value={formData.career}
                onChange={handleChange}
                error={errors.career}
                disabled={true}
              />
              <TextInput
                label="Plan de Estudios"
                name="plan"
                value={formData.plan}
                onChange={handleChange}
                error={errors.plan}
                disabled={true}
              />
            </div>
            <div className="space-between">
              <TextInput
                label="Permanencia"
                name="permanence"
                value={formData.permanence}
                onChange={handleChange}
                error={errors.permanence}
                disabled={true}
              />
              <TextInput
                label="Código Alumno"
                name="studentCode"
                value={formData.studentCode}
                onChange={handleChange}
                error={errors.studentCode}
                disabled={true}
              />
              <TextInput
                label="Correo Institucional"
                name="email"
                value={formData.email}
                onChange={handleChange}
                error={errors.email}
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
