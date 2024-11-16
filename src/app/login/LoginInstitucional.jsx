import LoginBase from "../../components/templates/login/login"
import useLogin from "../../hooks/useLogin";
import imgFondo from "../../assets/loginInstitucionalFondo.jpeg";
import imgLogo from "../../assets/logoUNMSM.png";
import { validateLoginSM } from "../../hooks/validateLogin";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../../contexts/userContext";

function LoginInstitucional() {
  const apiUrl = `${import.meta.env.VITE_API_URL}/api/user/loginAcademic`;
  const { loading, error, login } = useLogin(apiUrl);
  const { userData, isInstitutional} = useUserContext();
  // console.log(userData, isInstitutional)
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
