import LoginForm from '../../components/organisms/forms/loginForm';
import Typography from '@mui/material/Typography';
import Footer from '../../components/atoms/footer/footer';
import useLogin from '../../hooks/useLogin';
import imgFondo from '../../assets/loginInstitucionalFondo.jpeg';
import imgLogo from '../../assets/logoSUM.png';
import { useEffect } from "react";
import { useNavigate } from 'react-router-dom';

function LoginInstitucional() {
    const apiUrl = 'https://sumvirtual.unmsm.edu.pe/sumapi/loguearse';
    const { data, loading, error, login } = useLogin(apiUrl);
    const navigate = useNavigate();

    useEffect(() => {
        if (error) {
            console.log("Error: ", error);
        }else if (data) {
            console.log("Login exitoso: ", data);
            navigate('/validacionSUM');
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
                    <div className="bg-red-950 w-full flex flex-col items-center">
                        <img src={imgLogo} alt="Logo" className="h-24 mb-6" />
                    </div>
                    <Typography variant="p" component="p" align="center" gutterBottom>
                        Ingrese credenciales SUM para validar su cuenta
                    </Typography>
                    <LoginForm onSubmit={handleLogin} disabled={loading} />
                    <div className="mt-4 space-y-4">
                        <Typography variant="body2" component="p" align="center" gutterBottom>
                            <a href="/" className="text-black hover:underline">Regresar al módulo de acceso principal</a>
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
