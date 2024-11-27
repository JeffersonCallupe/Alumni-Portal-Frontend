import React, {useState} from "react";
import Button from "../../components/atoms/buttons/actionButton"
import DeleteConfirmationModal from "../../components/organisms/dialog/deleteConfirmationModal";
import HomeBase from "../../components/templates/home/home";
import { useAlert } from "../../contexts/alertContext";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../../contexts/userContext";
import useDelete from "../../hooks/useDelete";

function Configuraciones() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { userData, isInstitutional, logout } = useUserContext();
  const { showAlert } = useAlert();
  const navigate = useNavigate();
  const userType = isInstitutional ? "user": "company";
  const apiUrl = userData ? `${import.meta.env.VITE_API_URL}/api/${userType}` : null;
  const { error, deleteData } = useDelete(apiUrl);
  
  if (!userData) {
    return <div>Loading...</div>;
  }

  const handleChangePassword = () => {
    const profilePath = isInstitutional ? "/profileInstitucional" : "/profile";
    navigate(profilePath);
  };
  
  const handleSaveChanges = async () => {
    try {
        await deleteData(userData.id);
        if(!error) showAlert("La cuenta se eliminó con éxito", "success");
        setIsModalOpen(false);
        logout();
        navigate("/");
        } catch (error) {
            showAlert("Error al guardar los cambios", "error");
        }
    };

  return (
    <HomeBase>
      <div className="w-full h-screen flex flex-col md:flex-row justify-around py-16 mb-24 gap-4">
        <div className="flex flex-col bg-white rounded-lg p-12 md:w-1/3 mx-8 h-fit">
            <h1 className="text-2xl font-bold">Configuración de Cuenta</h1>
            <p className="text-lg text-gray-500">Administra tu cuenta y preferencias</p>
        </div>
        <div className="flex flex-col gap-4 md:w-2/3 mx-8">
            <div className="flex flex-col wrap-row bg-white rounded-lg p-12 mx-8 gap-2">
                <h2 className="text-xl font-bold">Cambiar Contraseña</h2>
                <p className="text-lg text-gray-500">El proceso para cambiar la contraseña se gestiona desde el perfil de usuario.</p>
                <div>
                    <Button texto={"Cambiar Contraseña"} onClick={handleChangePassword} />
                </div>
            </div>
            <div className="flex flex-col wrap-row bg-white rounded-lg p-12 mx-8 gap-2">
                <h2 className="text-xl font-bold">Eliminar cuenta</h2>
                <p className="text-lg text-gray-500">Si eliminas tu cuenta, no podrás recuperarla. Todos tus datos serán eliminados permanentemente.</p>
                <div>
                    <Button texto={"Eliminar cuenta"} onClick={() => setIsModalOpen(true)} />
                </div>
                <DeleteConfirmationModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)} // Cambiar a una función anónima
                    onConfirm={handleSaveChanges}
                    title="Eliminar cuenta"
                    message="¿Estás seguro que deseas eliminar tu cuenta? Esta acción no se puede deshacer."
                    cancelButtonText="Cancelar"
                    confirmButtonText="Eliminar"
                    />
            </div>
        </div>
      </div>
    </HomeBase>
  );
}

export default Configuraciones;