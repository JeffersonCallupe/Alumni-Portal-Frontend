import React, { useState, useEffect } from "react";
import { Box, Alert, CircularProgress } from "@mui/material";
import Button from "@mui/material/Button";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import TextInput from "../../../atoms/inputs/TextInput";
import PasswordStrengthIndicator from "../../../atoms/PasswordStrengthIndicator";
import useForm from "../../../../hooks/useForm";
import useUpdatePassword from "../../../../hooks/useUpdatePassword";
import { useUserContext } from "../../../../contexts/userContext";

const FormPassword = ({ userId, onCancel }) => {
  const { updatePassword, loading, error, success, resetState } = useUpdatePassword();
  const { userData } = useUserContext();
  const [localErrors, setLocalErrors] = useState({});

  // Validación personalizada
  const validateForm = (data) => {
    const errors = {};

    // Email
    if (!data.email) {
      errors.email = "El correo electrónico es requerido";
    } else if (!/\S+@\S+\.\S+/.test(data.email)) {
      errors.email = "Formato de correo inválido";
    }

    // Contraseña actual
    if (!data.password) {
      errors.password = "La contraseña actual es requerida";
    }

    // Nueva contraseña
    if (!data.newPassword) {
      errors.newPassword = "La nueva contraseña es requerida";
    } else {
      if (data.newPassword.length < 8) {
        errors.newPassword = "Debe tener al menos 8 caracteres";
      } else if (!/[A-Z]/.test(data.newPassword)) {
        errors.newPassword = "Debe contener al menos una mayúscula";
      } else if (!/[a-z]/.test(data.newPassword)) {
        errors.newPassword = "Debe contener al menos una minúscula";
      } else if (!/\d/.test(data.newPassword)) {
        errors.newPassword = "Debe contener al menos un número";
      } else if (data.newPassword === data.password) {
        errors.newPassword = "Debe ser diferente a la contraseña actual";
      }
    }

    // Confirmar contraseña
    if (!data.confirmPassword) {
      errors.confirmPassword = "Debe confirmar la nueva contraseña";
    } else if (data.newPassword !== data.confirmPassword) {
      errors.confirmPassword = "Las contraseñas no coinciden";
    }

    return errors;
  };

  const handleFormSubmit = async () => {
    const validationErrors = validateForm(formData);
    setLocalErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      const result = await updatePassword(
        userId,
        formData.email,
        formData.password,
        formData.newPassword
      );

      if (result) {
        // Limpiar formulario después del éxito
        setTimeout(() => {
          resetForm();
          resetState();
        }, 3000);
      }
    }
  };

  const { formData, errors, handleChange, handleSubmit, resetForm } = useForm(
    {
      email: userData?.email || "",
      password: "",
      newPassword: "",
      confirmPassword: "",
    },
    handleFormSubmit
  );

  // Limpiar errores locales cuando el usuario escribe
  useEffect(() => {
    if (Object.keys(localErrors).length > 0) {
      setLocalErrors({});
    }
  }, [formData]);

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2.5,
        width: "100%",
      }}
    >
      {/* Mensaje de éxito */}
      {success && (
        <Alert
          severity="success"
          icon={<CheckCircleIcon />}
          sx={{
            borderRadius: '8px',
            '& .MuiAlert-message': {
              fontSize: '0.875rem',
            },
          }}
        >
          ¡Contraseña actualizada exitosamente!
        </Alert>
      )}

      {/* Mensaje de error */}
      {error && (
        <Alert
          severity="error"
          sx={{
            borderRadius: '8px',
            '& .MuiAlert-message': {
              fontSize: '0.875rem',
            },
          }}
        >
          {error}
        </Alert>
      )}

      <div className="flex flex-col gap-3">
        <TextInput
          label="Correo Electrónico"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          error={!!localErrors.email}
          helperText={localErrors.email}
          disabled={loading}
          required
        />

        <TextInput
          label="Contraseña Actual"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          error={!!localErrors.password}
          helperText={localErrors.password}
          disabled={loading}
          required
        />

        <Box>
          <TextInput
            label="Nueva Contraseña"
            name="newPassword"
            type="password"
            value={formData.newPassword}
            onChange={handleChange}
            error={!!localErrors.newPassword}
            helperText={localErrors.newPassword}
            disabled={loading}
            required
          />
          <PasswordStrengthIndicator password={formData.newPassword} />
        </Box>

        <TextInput
          label="Confirmar Nueva Contraseña"
          name="confirmPassword"
          type="password"
          value={formData.confirmPassword}
          onChange={handleChange}
          error={!!localErrors.confirmPassword}
          helperText={localErrors.confirmPassword}
          disabled={loading}
          required
        />
      </div>

      <div className="flex justify-end gap-3 mt-2">
        <Button
          variant="outlined"
          type="button"
          onClick={onCancel}
          disabled={loading}
          sx={{
            textTransform: 'none',
            borderRadius: '8px',
            padding: '8px 20px',
            fontSize: '0.875rem',
          }}
        >
          Cancelar
        </Button>
        <Button
          variant="contained"
          type="submit"
          disabled={loading}
          sx={{
            textTransform: 'none',
            borderRadius: '8px',
            padding: '8px 20px',
            fontSize: '0.875rem',
            backgroundColor: '#6F191C',
            '&:hover': {
              backgroundColor: '#8F2428',
            },
          }}
        >
          {loading ? (
            <>
              <CircularProgress size={20} sx={{ color: 'white', mr: 1 }} />
              Guardando...
            </>
          ) : (
            'Guardar Cambios'
          )}
        </Button>
      </div>
    </Box>
  );
};

export default FormPassword;
