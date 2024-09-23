import React from "react";
import TextInput from "../../atoms/inputs/TextInput";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import useForm from "../../../hooks/useForm";

const LoginForm = ({ onSubmit }) => {
  const { formData, errors, handleChange, handleSubmit } = useForm(
    { usuario: "", clave: "" },
    onSubmit
  );

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        width: "100%",
        maxWidth: "400px",
      }}
    >
      <TextInput
        label="Apellido Paterno"
        name="apePaterno"
        value={formData.apePaterno}
        onChange={handleChange}
        error={errors.apePaterno}
        helperText={errors.apePaterno}
        disabled={true}
      />
      <TextInput
        label="Apellido Materno"
        name="apeMaterno"
        value={formData.apeMaterno}
        onChange={handleChange}
        error={errors.apeMaterno}
        helperText={errors.apeMaterno}
        disabled={true}
      />
      <TextInput
        label="Nombres"
        name="nombres"
        value={formData.nomAlumno}
        onChange={handleChange}
        error={errors.nomAlumno}
        helperText={errors.nomAlumno}
        disabled={true}
      />


      <TextInput
        label="Facultad"
        name="desFacultad"
        value={formData.desFacultad}
        onChange={handleChange}
        error={errors.desFacultad}
        helperText={errors.desFacultad}
        disabled={true}
      />
      <TextInput
        label="Escuela"
        name="desEscuela"
        value={formData.desEscuela}
        onChange={handleChange}
        error={errors.desEscuela}
        helperText={errors.desEscuela}
        disabled={true}
      />
      <TextInput
        label="Plan de Estudios"
        name="codPlan"
        value={formData.codPlan}
        onChange={handleChange}
        error={errors.codPlan}
        helperText={errors.codPlan}
        disabled={true}
      />

      <TextInput
        label="Permanencia"
        name="desPermanencia"
        value={formData.desPermanencia}
        onChange={handleChange}
        error={errors.desPermanencia}
        helperText={errors.desPermanencia}
        disabled={true}
      />
      <TextInput
        label="DNI de Alumno"
        name="dniAlumno"
        value={formData.dniAlumno}
        onChange={handleChange}
        error={errors.dniAlumno}
        helperText={errors.dniAlumno}
        disabled={true}
      />
      <TextInput
        label="Correo Institucional"
        name="correoInstitucional"
        value={formData.correoInstitucional}
        onChange={handleChange}
        error={errors.correoInstitucional}
        helperText={errors.correoInstitucional}
        disabled={true}
      />

      <TextInput
        label="Contraseña"
        name="password"
        type="password"
        value={formData.password}
        onChange={handleChange}
        error={errorspassword}
        helperText={errors.password}
      />
      <TextInput
        label="Confirmar Contraseña"
        name="password"
        type="password"
        value={formData.password}
        onChange={handleChange}
        error={errorspassword}
        helperText={errors.password}
      />
      <Button type="submit" variant="contained" size="large" fullWidth>
        Ingresar
      </Button>
    </Box>
  );
};

export default LoginForm;
