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
  validate,
}) {
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
            {isSUM && (
              <div
                className="mb-6 h-auto "
                style={{ backgroundColor: "#6F191C" }}
              >
                <center>
                  <img src={imgLogo} alt="Logo" className="h-24" />
                </center>
              </div>
            )}

            {description && (
              <Typography
                variant="body2"
                component="p"
                align="center"
                gutterBottom
              >
                {description}
              </Typography>
            )}
            {!isSUM && (
              <>
                <img src={imgLogo} alt="Logo UNMSM" className="h-24 mb-6" />
                <LoginForm
                  onSubmit={handleLogin}
                  disabled={loading}
                  validate={validate}
                />
              </>
            )}
            {isSUM && (
              <LoginSUMForm
                onSubmit={handleLogin}
                disabled={loading}
                validate={validate}
              />
            )}
            <div className="mt-4 space-y-2">
              <Typography
                variant="body2"
                component="p"
                align="center"
                gutterBottom
              >
                <a
                  href={isSUM ? "/" : "/loginSUM"}
                  className="text-black hover:underline"
                >
                  {isSUM
                    ? "Regresar al módulo de acceso principal"
                    : "Crear cuenta institucional"}
                </a>
              </Typography>
              <Typography
                variant="body2"
                component="p"
                align="center"
                gutterBottom
              >
                <a href="/loginEmpresa" className="text-black hover:underline">
                  Iniciar sesión como empresa
                </a>
              </Typography>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default LoginBase;
