import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextInput from "../../../atoms/inputs/TextInput";
import useForm from "../../../../hooks/useForm";

const FormNewProject = ({ onCancel, onSubmit, loading, error }) => {
    const { formData, errors, handleChange, handleSubmit } = useForm(
      {
        name: "",
        date: "",
        description: "",
      },
      async (formData) => {
        await onSubmit(formData);
        if (!error) {
          onCancel();
        }
      }
    );
  
    const formFields = [
      {
        label: "Nombre del Proyecto",
        name: "name",
        value: formData.name,
      },
      {
        label: "Fecha",
        name: "date",
        value: formData.date,
        type: "date",
      },
      {
        label: "Descripción",
        name: "description",
        value: formData.description,
        type: "textarea",
        rows: 4,
      },
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
        {formFields.map(({ label, name, value, type, rows }) => (
          <div key={name} className="flex flex-col sm:flex-row gap-2 sm:gap-4">
            {/* <label className="text-l font-bold text-black sm:w-1/4 lg:w-1/6">
                          {label}:
                      </label> */}
            <TextInput
              name={name}
              label={label}
              value={value}
              onChange={handleChange}
              error={errors[name]}
              helperText={errors[name]}
              required={true}
              disabled={loading}
              type={type === "textarea" ? "text" : type || "text"}
              multiline={type === "textarea"}
              rows={rows}
              fullWidth
              className="sm:w-3/4 lg:w-5/6"
            />
          </div>
        ))}
  
        <div className="flex justify-end gap-4 mt-4">
        <Button
            variant="outlined"
            type="button"
            onClick={onCancel}
            disabled={loading}
          >
            Cancelar
          </Button>
          <Button variant="contained" type="submit" disabled={loading}>
            {loading ? "Guardando..." : "Añadir"}
          </Button>
        </div>
        {error && <p className="text-red-500">{error}</p>}
      </Box>
    );
  };
  
  export default FormNewProject;