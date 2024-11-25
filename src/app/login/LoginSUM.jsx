import LoginBase from "../../components/templates/login/login"
import useLogin from "../../hooks/useLogin";
import imgFondo from "../../assets/loginInstitucionalFondo.jpeg";
import imgLogo from "../../assets/logoSUM.png";
import { useNavigate } from "react-router-dom";
import {validateLoginSUM } from "../../hooks/validateLogin";

function LoginSUM() {
  const apiUrl = 'https://sumvirtual.unmsm.edu.pe/sumapi/loguearse';
  const { data, loading, error, login } = useLogin(apiUrl);
  const navigate = useNavigate();
  const userData = data

  return (
    <LoginBase
      apiUrl={apiUrl}
      imgLogo={imgLogo}
      backgroundImage={imgFondo}
      handleRedirect={{ userData, error, navigate }}
      loginRedirectUrl={"/validacionSUM"}
      description={"Ingrese credenciales SUM para validar su cuenta"}
      loading={loading}
      onSubmit={login}
      isSUM={true}
      validate={validateLoginSUM}
    />
  );
}

export default LoginSUM;
