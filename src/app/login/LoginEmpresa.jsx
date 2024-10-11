import LoginBase from "../../components/templates/login/login";
import useLoginEmpresa from "../../hooks/useLoginEmpresa"; 
import imgLogo from "../../assets/logoEmpresa.png";
import imgFondo from "../../assets/portadaEmpresa.png";
import {validateLoginEmpresa} from "../../hooks/validateLogin";
import { useNavigate } from "react-router-dom";


function LoginEmpresa() {
    const apiUrl = "http://178.128.147.224:8080/api/company/loginCompany"; 
    const { data, loading, error, login } = useLoginEmpresa(apiUrl); 
    const navigate = useNavigate();
  
    return (
      <LoginBase
        apiUrl={apiUrl}
        imgLogo={imgLogo}
        backgroundImage={imgFondo}
        description={"Módulo de Ingreso Empresarial"}
        handleRedirect={{ data, error, navigate}}
        loginRedirectUrl={"/home"} 
        loading={loading}
        onSubmit={login} 
        validate={validateLoginEmpresa}
        isEmpresa = {true}
      />
    );
  }
  
  export default LoginEmpresa;

