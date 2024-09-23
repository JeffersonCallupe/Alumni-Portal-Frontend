import LoginForm from '../../components/organisms/forms/loginForm';
import Typography from '@mui/material/Typography';
import Footer from '../../components/atoms/footer/footer';
import imgFondo from '../../assets/loginInstitucionalFondo.jpeg';
import imgLogo from '../../assets/logoUNMSM.png';
import useLogin from '../../hooks/useLogin';
import { useEffect } from "react";

function LoginInstitucional() {
    const apiUrl = 'https://localhost:3000/login';
    const { data, loading, error, login } = useLogin(apiUrl);

    useEffect(() => {
        if (error) {
            console.log("Error: ", error);
        }else if (data) {
            console.log("Login exitoso: ", data);
        }
    }, [data, error]);

    const handleLogin = (formData) => {
        login(formData);
    };

    return (
        <div className="h-screen w-full flex flex-col">
            <div className="h-screen flex my-8 justify-center items-center space-x-8 bg-white border border-gray-300 shadow-lg">
                {/* Imagen de fondo */}
                <img src={imgFondo} alt="Imagen de fondo" className="w-6/12 h-full object-cover" />
                
                {/* Contenedor del formulario */}
                <div className="flex flex-col items-center justify-center bg-white border border-gray-300 shadow-lg p-8 w-3/12 h-auto rounded-md">
                    <img src={imgLogo} alt="Logo" className="h-32 mb-6" />
                    <LoginForm onSubmit={handleLogin} disabled={loading} />
                    <div className="mt-4 space-y-4">
                        <Typography variant="body2" component="p" align="center" gutterBottom>
                            <a href="/loginSUM" className="text-black hover:underline">Crear cuenta académica</a>
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

export default LoginInstitucional;