import React from "react";
import HomeBase from "../../components/templates/home/home";
import ProfileBaseCard from "../../components/organisms/cards/profileBaseCards/headerBaseCard";
import { useUserContext } from "../../contexts/userContextInstitucional";
import usePatch from "../../hooks/usePatch";

function ProfileInstitucional() {
  const { userData } = useUserContext();
  const apiUrl = userData
    ? `http://178.128.147.224:8080/api/user/${userData.id}`
    : null;
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

  return (
    <HomeBase>
      <div className="w-full flex flex-col mb-16">
        <ProfileBaseCard
          handleSaveChanges={handleSaveChanges}
          loading={loading}
        />
      </div>
    </HomeBase>
  );
}

export default ProfileInstitucional;