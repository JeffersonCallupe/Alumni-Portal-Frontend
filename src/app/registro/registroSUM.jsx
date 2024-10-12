import Typography from "@mui/material/Typography";
import Footer from "../../components/atoms/footer/footer";
import imgLogo from "../../assets/logoUNMSM.png";
import imgFondo from "../../assets/fondoRectorado.png";
import RegisterInstitucionalForm from "../../components/organisms/forms/registerInstitucionalForm";
import useLogin from "../../hooks/useLogin";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { validateRegistroSM } from "../../hooks/validateLogin";

function RegistroSUM() {
  const apiUrl = "http://178.128.147.224:8080/api/user/registerAcademic";
  const { data, loading, error, login } = useLogin(apiUrl);
  const navigate = useNavigate();
  console.log(error);

  useEffect(() => {
    if (error) {
      console.log("Error: ", error);
    } else if (data) {
      console.log("Login exitoso: ", data);
      navigate("/");
    }
  }, [data, error]);

  const handleLogin = (formData) => {
    const dataToSubmit = { ...formData };
            if(dataToSubmit.confirmPassword) {
                delete dataToSubmit.confirmPassword;
            }
    login(dataToSubmit);
  };

  return (
    <div className="relative h-screen flex flex-col">
      <div className="relative h-screen w-full flex flex-col justify-center items-center">
        <div
          className="absolute inset-0 bg-cover bg-center filter blur-sm"
          style={{ backgroundImage: `url(${imgFondo})` }}
        ></div>
        {/* Contenedor del formulario */}
        <div className="relative flex flex-col items-center justify-center bg-white border border-gray-300 shadow-lg p-8 w-7/12 h-auto rounded-md">
          <img src={imgLogo} alt="Logo" className="h-32 mb-6" />
          <Typography variant="body2" component="p" align="center" gutterBottom>
            Verificar Información Académica
          </Typography>
          <div className="mt-4 space-y-4">
            <RegisterInstitucionalForm
              onSubmit={handleLogin}
              disabled={loading}
              validate={validateRegistroSM}
            />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default RegistroSUM;
