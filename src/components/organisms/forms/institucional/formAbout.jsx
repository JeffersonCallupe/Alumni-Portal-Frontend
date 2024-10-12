import React from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import useForm from "../../../../hooks/useForm";
import { useUserContext } from "../../../../contexts/userContextInstitucional";

const FormAbout = ({ onSubmit, onCancel, loading }) => {
  const { userData } = useUserContext();
  const { formData, handleChange, handleSubmit } = useForm(
    { about: userData.about || "" },
    onSubmit,
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
      }}
    >
      <textarea
        name="about"
        value={formData.about}
        onChange={handleChange}
        disabled={loading}
        className="p-4"
      />
      <div>
        <Button type="button" onClick={onCancel}>
          Cancelar
        </Button>
        <Button type="submit" disabled={loading}>
          Guardar
        </Button>
      </div>
    </Box>
  );
};

export default FormAbout;