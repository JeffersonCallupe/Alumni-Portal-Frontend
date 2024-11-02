import React from "react";
import ContentContactoEmpresa from "../../components/organisms/cards/empresa/contentContacto";
import FormContacto from "../../components/organisms/forms/empresa/formContacto";
import FormDescripcion from "../../components/organisms/forms/empresa/formDescripcion";
import FormFoto from "../../components/organisms/forms/formFoto";
import HomeBase from "../../components/templates/home/home";
import InfoBaseCard from "../../components/organisms/cards/profileBaseCards/infoBaseCard";
import ProfileBaseCard from "../../components/organisms/cards/profileBaseCards/headerBaseCard";
import { useUserContext } from "../../contexts/userContext";
import usePatch from "../../hooks/usePatch";

function ProfileEmpresa() {
  const { userData } = useUserContext();
  const apiUrl = userData
    ? `${import.meta.env.VITE_API_URL}/api/company/${userData.id}`
    : null;
  const imageUrl = `${import.meta.env.VITE_API_URL}/api/image`;
  const { loading, patch } = usePatch(apiUrl);
  if (!userData) {
    return <div>Loading...</div>;
  }
  
  const handleSaveChanges = async (formData) => {
    try {
      await patch(formData);
    } catch (error) {
      console.error("Error al guardar los cambios:", error);
    }
  };

  const contentFoto = React.cloneElement(<FormFoto />, {
    apiUrl: imageUrl
  });

  const contentDescripcion = React.cloneElement(<FormDescripcion />, {
    onSubmit: handleSaveChanges,
    loading: loading,
  });

  const contentContacto = React.cloneElement(<FormContacto />, {
    onSubmit: handleSaveChanges,
    loading: loading,
  });

  return (
    <HomeBase>
      <div className="w-full flex flex-col mb-16">
        <ProfileBaseCard
          apiUrl={imageUrl}
          handleSaveChanges={handleSaveChanges}
          loading={loading}
          dialogContent={contentFoto}
          modalId="modal- foto"
        />
        <InfoBaseCard
          title="Descripción de la Empresa"
          cardContent={
            <textarea
              value={userData.description || "No especificado."}
              readOnly
              style={{
                  width: '100%',
                  height: 'auto',
                  overflow: 'auto',
                  resize: 'vertical',
                  lineHeight: '1.5',
                  minHeight: '100px',
                  maxHeight: '200px',
              }}
            />
          }
          dialogContent={contentDescripcion}
          modalId="modal-descripcion"
        />

        <InfoBaseCard
          title="Información de Contacto"
          cardContent={<ContentContactoEmpresa />}
          dialogContent={contentContacto}
          modalId="modal-contacto"
        />
      </div>
    </HomeBase>
  );
}

export default ProfileEmpresa;