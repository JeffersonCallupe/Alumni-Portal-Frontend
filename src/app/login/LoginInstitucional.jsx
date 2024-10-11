import LoginBase from "../../components/templates/login/login"
import useLogin from "../../hooks/useLogin";
import imgFondo from "../../assets/loginInstitucionalFondo.jpeg";
import imgLogo from "../../assets/logoUNMSM.png";
import { validateLoginSM } from "../../hooks/validateLogin";


function LoginInstitucional() {
  const apiUrl = "http://178.128.147.224:8080/api/user/loginAcademic";
  const { data, loading, error, login } = useLogin(apiUrl);

  return (
    <LoginBase
      apiUrl={apiUrl}
      imgLogo={imgLogo}
      backgroundImage={imgFondo}
      description={"Módulo de Ingreso Institucional"}
      handleRedirect={{ data, error }}
      loginRedirectUrl={"/loginSUM"}
      loading={loading}
      onSubmit={login}
      validate={validateLoginSM}
    />
  );
}

export default LoginInstitucional;



