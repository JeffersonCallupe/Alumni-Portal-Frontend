import { useState } from "react";

const useForm = (initialValues, onSubmit, validate) => {
    const [formData, setFormData] = useState(initialValues);
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const validationErrors = validate(formData);
        setErrors(validationErrors);
        if (Object.keys(validationErrors).length === 0) {
            onSubmit(formData);
        }
    };

    return {
        formData,
        errors,
        handleChange,
        handleSubmit,
        setFormData,
        setErrors,
    };
};

const validateLogin = (formData) => {
    const newErrors = {};
    if (!formData.usuario) {
        newErrors.usuario = 'El nombre de usuario es requerido';
    }
    if (!formData.clave) {
        newErrors.clave = 'La contraseña es requerida';
    }
    return newErrors;
};

const validateRegistro = (formData) => {
    const newErrors = {};
    if (!formData.password) {
        newErrors.password = "La contraseña es requerida";
    }
    if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = "Las contraseñas no coinciden";
    }
    return newErrors;
};

export default useForm;
export { validateLogin, validateRegistro };
