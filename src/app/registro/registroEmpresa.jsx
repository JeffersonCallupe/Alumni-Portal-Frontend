import Typography from "@mui/material/Typography";
import Footer from "../../components/atoms/footer/footer";
import imgLogo from "../../assets/logoUNMSM.png";
import imgFondo from "../../assets/fondoRectorado.png";
import RegisterEmpresaForm from "../../components/organisms/forms/login/registerEmpresaForm";
import useLoginEmpresa from "../../hooks/useLoginEmpresa";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { validateRegistroEmpresa } from "../../hooks/validateLogin"; 
import Alert from "../../components/atoms/alert/alert";
import { useAlert } from "../../contexts/alertContext";

function RegistroEmpresa() {
    const apiUrl = `${import.meta.env.VITE_API_URL}/api/company/registerCompany`;
    const { data, loading, error, loginEmpresa } = useLoginEmpresa(apiUrl);
    const navigate = useNavigate();
    const { showAlert } = useAlert();

    useEffect(() => {
        if (error) {
            showAlert("Error al registrar usuario", "error");
        } else if (data) {
            showAlert("¡Registro exitoso!", "success");
            setTimeout(() => {
                navigate("/loginEmpresa"); 
            }, 2000);
        }
    }, [data, error, navigate]);

    const handleLogin = (formData) => {
        const dataToSubmit = { ...formData };
        if (dataToSubmit.confirmPassword) {
            delete dataToSubmit.confirmPassword;
        }
        loginEmpresa(dataToSubmit);
    };

    return (
        <div className="relative h-screen flex flex-col">
            <Alert/>
            <div className="relative h-screen w-full flex flex-col justify-center items-center">
                <div
                    className="absolute inset-0 bg-cover bg-center filter blur-sm"
                    style={{ backgroundImage: `url(${imgFondo})` }}
                ></div>

                {/* Contenedor del formulario */}
                <div className="relative flex flex-col items-center justify-center bg-white border border-gray-300 shadow-lg p-8 w-7/12 h-auto rounded-md">
                    <img src={imgLogo} alt="Logo" className="h-32 mb-6" />
                    <Typography variant="body2" component="p" align="center" gutterBottom>
                        Módulo de Registro de Empresas
                    </Typography>
                    <div className="mt-4 space-y-4">
                        <RegisterEmpresaForm
                            onSubmit={handleLogin}
                            disabled={loading}
                            validate={validateRegistroEmpresa}
                        />
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default RegistroEmpresa;
