import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextInput from "../../../atoms/inputs/TextInput";
import useForm from "../../../../hooks/useForm";

const FormNewCertification = ({ onCancel, onSubmit, loading, error }) => {
    const { formData, errors, handleChange, handleSubmit } = useForm(
        {
            name: "",
            issuingOrganization: "",
            issueDate: "",
            expirationDate: "",
            credentialUrl: "",
        },
        async (formData) => {
            await onSubmit(formData);
            if (!error) {
                window.location.reload();
                onCancel();
            }
        }
    );

    const formFields = [
        { label: "Nombre de la Certificación", name: "name", value: formData.name },
        { label: "Organización Emisora", name: "issuingOrganization", value: formData.issuingOrganization },
        { label: "Fecha de Emisión", name: "issueDate", value: formData.issueDate, type: "date" },
        { label: "Fecha de Expiración", name: "expirationDate", value: formData.expirationDate, type: "date" },
        { label: "URL de la Credencial", name: "credentialUrl", value: formData.credentialUrl },
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
            {formFields.map(({ label, name, value, type }) => (
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
                        disabled={loading}
                        type={type || "text"}
                    />
                </div>
            ))}
            <div className="flex justify-end gap-4 mt-4">
                <Button variant="outlined" type="button" onClick={onCancel} disabled={loading}>
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

export default FormNewCertification;