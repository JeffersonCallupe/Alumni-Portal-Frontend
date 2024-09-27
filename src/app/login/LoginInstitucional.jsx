import LoginBase from "../../components/templates/login/login";
import useLogin from "../../hooks/useLogin";
import imgFondo from "../../assets/loginInstitucionalFondo.jpeg";
import imgLogo from "../../assets/logoUNMSM.png";

function LoginInstitucional() {
  const apiUrl = "https://localhost:3000/api/auth/login";
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
    />
  );
}

export default LoginInstitucional;
