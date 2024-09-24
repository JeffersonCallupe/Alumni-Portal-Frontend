import LoginForm from '../../components/organisms/forms/loginForm';
import Typography from '@mui/material/Typography';
import Footer from '../../components/atoms/footer/footer';
import imgLogo from '../../assets/logoUNMSM.png';
import RegisterInstitucionalForm from '../../components/organisms/forms/registerInstitucionalForm';
import useLogin from '../../hooks/useLogin';
import { useEffect } from "react";
import { useNavigate } from 'react-router-dom';

function ValidacionSUM() {
    const apiUrl = 'https://localhost:3000/api/auth/register';
    const { data, loading, error, login } = useLogin(apiUrl);
    const navigate = useNavigate();

    useEffect(() => {
        if (error) {
            console.log("Error: ", error);
        }else if (data) {
            console.log("Login exitoso: ", data);
            navigate('/home');
        }
    }, [data, error]);

    const handleLogin = (formData) => {
        login(formData);
    };

    return (
        <div className="h-screen w-full flex flex-col">
            <div className="h-screen flex m-12 p-12 justify-center items-center space-x-8 bg-white border border-gray-300 shadow-lg rounded-md">
                {/* Contenedor del formulario */}
                <div className="flex flex-col items-center justify-center bg-white border border-gray-300 shadow-lg p-8 w-7/12 h-auto rounded-md">
                    <img src={imgLogo} alt="Logo" className="h-32 mb-6" />
                    <Typography variant="body2" component="p" align="center" gutterBottom>
                        Verificar Información Académica
                    </Typography>
                    <div className="mt-4 space-y-4">
                        <RegisterInstitucionalForm onSubmit={handleLogin} disabled={loading} />
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default ValidacionSUM;