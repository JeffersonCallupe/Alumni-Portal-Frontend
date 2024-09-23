import { useState } from "react";

const useForm = (initialValues, onSubmit) => {
    const [formData, setFormData] = useState(initialValues);
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const validate = () => {
        const newErrors = {};
        if (!formData.usuario) {
          newErrors.usuario = 'El nombre de usuario es requerido';
        }
        if (!formData.clave) {
          newErrors.clave = 'La contraseña es requerida';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
      };

    const handleSubmit = (e) => {
        e.preventDefault();
        if(validate()){
            onSubmit(formData);
        }
    };

    return {
        formData,
        errors,
        handleChange,
        handleSubmit,
    };
};

export default useForm;