import LoginForm from "../../organisms/forms/loginForm";
import LoginSUMForm from "../../organisms/forms/loginSUMForm";
import Typography from "@mui/material/Typography";
import Footer from "../../atoms/footer/footer";
import imgFondo from "../../../assets/fondoRectorado.png";
import { useEffect } from "react";
import React from "react";
import "../../../App.css";

function LoginBase({
  imgLogo,
  backgroundImage,
  handleRedirect,
  description,
  loginRedirectUrl,
  loading,
  onSubmit,
  isSUM,
  isEmpresa,
  validate,
}) {
  useEffect(() => {
    if (handleRedirect.error) {
      console.log("Error: ", handleRedirect.error);
    } else if (handleRedirect.userData) {
      console.log("Login exitoso: ", handleRedirect.userData);
      if (loginRedirectUrl) {
        handleRedirect.navigate(loginRedirectUrl);
      }
    }
  }, [handleRedirect.userData, handleRedirect.error]);

  const handleLogin = (formData) => {
    onSubmit(formData);
  };

  return (
    <div className="relative md:h-screen flex flex-col">
      <div
        className="absolute inset-0 bg-cover bg-center filter blur-sm"
        style={{ backgroundImage: `url(${imgFondo})` }}
      ></div>
      <div className="relative h-screen flex flex-col justify-center items-center md:my-2 my-8">
        <div className="h-screen flex md:m-8 m-4 items-center lg:space-x-24 md:bg-white form-border-shadow">
          {/* Imagen de fondo */}
          <img
            src={backgroundImage}
            alt="Imagen de fondo"
            className="w-6/12 h-full object-cover hidden md:flex"
          />
          {/* Contenedor del formulario */}
          <div className="flex flex-col items-center justify-center form-responsive-width form-border-shadow bg-white">
            <Typography
              variant="h5"
              component="h1"
              align="center"
              gutterBottom
              paddingBottom="10px"
            >
              Portal Alumni UNMSM
            </Typography>

            {isSUM ? (
              <div className="mb-6 h-auto" style={{ backgroundColor: "#6F191C" }}>
                <center>
                  <img src={imgLogo} alt="Logo" className="h-24" />
                </center>
              </div>
            ) : (
              <img src={imgLogo} alt="Logo" className="h-24 mb-6" />
            )}

            {description && (
              <Typography variant="body2" component="p" align="center" gutterBottom>
                {description}
              </Typography>
            )}

            {!isSUM && (
              <LoginForm
                onSubmit={handleLogin}
                disabled={loading}
                validate={validate}
              />
            )}
            {isSUM && (
              <LoginSUMForm
                onSubmit={handleLogin}
                disabled={loading}
                validate={validate}
              />
            )}

            <div className="mt-4 space-y-2">
                {isSUM ? (
                  <div className="flex flex-col gap-2">
                    <a className="text-black hover:underline" href="/">Regresar al módulo de acceso principal</a>
                    <a className="text-black hover:underline" href="/loginEmpresa">Iniciar sesión como empresa</a>
                    </div>
                ) : isEmpresa ? (
                  <div className="flex flex-col gap-2">
                    <a className="text-black hover:underline" href="/">Iniciar con cuenta institucional</a>
                    <a className="text-black hover:underline" href="/crearCuentaEmpresa">Crear cuenta empresarial</a>
                    </div>
                ) : (
                  <div className="flex flex-col gap-2">
                    <a className="text-black hover:underline" href="/loginSUM">Crear cuenta institucional</a>
                    <a className="text-black hover:underline" href="/loginEmpresa">Iniciar sesión como empresa</a>
                    </div>
                )}
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default LoginBase;
