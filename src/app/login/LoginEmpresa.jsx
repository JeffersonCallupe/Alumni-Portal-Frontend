import LoginBase from "../../components/templates/login/login";
import useLogin from "../../hooks/useLogin";
import imgLogo from "../../assets/logoEmpresa.png";
import imgFondo from "../../assets/portadaEmpresa.png";
import {validateLoginEmpresa} from "../../hooks/validateLogin";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../../contexts/userContext";

function LoginEmpresa() {
    const apiUrl = `${import.meta.env.VITE_API_URL}/api/company/loginCompany`; 
    const { loading, error, login } = useLogin(apiUrl); 
    const { userData } = useUserContext();
    const navigate = useNavigate();
  
    return (
      <LoginBase
        apiUrl={apiUrl}
        imgLogo={imgLogo}
        backgroundImage={imgFondo}
        description={"Módulo de Ingreso Empresarial"}
        handleRedirect={{ userData, error, navigate}}
        loginRedirectUrl={"/profile"} 
        loading={loading}
        onSubmit={login} 
        validate={validateLoginEmpresa}
        isEmpresa = {true}
      />
    );
  }
  
  export default LoginEmpresa;

