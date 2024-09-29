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
        const validationErrors = validate ? validate(formData) : {};
        setErrors(validationErrors);
        console.log(validationErrors)
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

export default useForm;
