import LoginForm from '../../organisms/forms/loginForm';
import Typography from '@mui/material/Typography';
import Footer from '../../atoms/footer/footer';
import { useEffect } from "react";
import React from 'react';

function LoginBase({ imgLogo, backgroundImage, handleRedirect, description, loginRedirectUrl, loading, onSubmit, isSUM }) {
    useEffect(() => {
        if (handleRedirect.error) {
            console.log("Error: ", handleRedirect.error);
        } else if (handleRedirect.data) {
            console.log("Login exitoso: ", handleRedirect.data);
            if (loginRedirectUrl) {
                handleRedirect.navigate(loginRedirectUrl);
            }
        }
    }, [handleRedirect.data, handleRedirect.error]);

    const handleLogin = (formData) => {
        onSubmit(formData);
    };

    return (
        <div className="h-screen w-full flex flex-col">
            <div className="h-screen flex my-8 justify-center items-center space-x-8 bg-white border border-gray-300 shadow-lg">
                {/* Imagen de fondo */}
                <img src={backgroundImage} alt="Imagen de fondo" className="w-6/12 h-full object-cover" />
                
                {/* Contenedor del formulario */}
                <div className="flex flex-col items-center justify-center bg-white border border-gray-300 shadow-lg p-8 w-3/12 h-auto rounded-md">
                    {isSUM && (
                        <div className="mb-6 bg-red-950 h-auto">
                            <img src={imgLogo} alt="Logo" className="h-32" />
                        </div>
                    )}
                    {!isSUM && (
                        <img src={imgLogo} alt="Logo" className="h-32 mb-6" />
                    )}
                    {description && (
                        <Typography variant="body2" component="p" align="center" gutterBottom>
                            {description}
                        </Typography>
                    )}
                    <LoginForm onSubmit={handleLogin} disabled={loading} />
                    <div className="mt-4 space-y-4">
                        <Typography variant="body2" component="p" align="center" gutterBottom>
                            <a href={loginRedirectUrl || "/"} className="text-black hover:underline">Regresar al módulo de acceso principal</a>
                        </Typography>
                        <Typography variant="body2" component="p" align="center" gutterBottom>
                            <a href="/loginEmpresa" className="text-black hover:underline">Iniciar sesión como empresa</a>
                        </Typography>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default LoginBase;