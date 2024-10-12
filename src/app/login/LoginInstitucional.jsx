import LoginBase from "../../components/templates/login/login"
import useLogin from "../../hooks/useLogin";
import imgFondo from "../../assets/loginInstitucionalFondo.jpeg";
import imgLogo from "../../assets/logoUNMSM.png";
import { validateLoginSM } from "../../hooks/validateLogin";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../../contexts/userContext";

function LoginInstitucional() {
  const apiUrl = "http://178.128.147.224:8080/api/user/loginAcademic";
  const { loading, error, login } = useLogin(apiUrl);
  const { userData } = useUserContext();
  const navigate = useNavigate();

  return (
    <LoginBase
      apiUrl={apiUrl}
      imgLogo={imgLogo}
      backgroundImage={imgFondo}
      description={"Módulo de Ingreso Institucional"}
      handleRedirect={{ userData, error, navigate }}
      loginRedirectUrl={"/profileInstitucional"}
      loading={loading}
      onSubmit={login}
      validate={validateLoginSM}
    />
  );
}

export default LoginInstitucional;
