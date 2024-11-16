export const uploadProfilePicture = async (apiUrl, id, imageFile, isInstitutional) => {
  const usertype = isInstitutional ? "user" : "company";
  const formData = new FormData();
  formData.append("image", imageFile);
  const token = sessionStorage.getItem("token");

  try {
    const response = await fetch(`${apiUrl}/upload-${usertype}/${id}`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
    },
      body: formData,
    });
    
    if (!response.ok) {
      throw new Error('Error al subir la imagen');
    }
    return await response.text();

  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getProfilePicture = async (apiUrl, id, isInstitutional) => {
  const usertype = isInstitutional ? "user" : "company";
  const token = sessionStorage.getItem("token");
  try {
    const response = await fetch(`${apiUrl}/download-${usertype}/${id}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
    },
    });

    if (!response.ok) {
      throw new Error('Error al obtener la imagen');
    }

    const blob = await response.blob();
    const imageUrl = URL.createObjectURL(blob);
    return imageUrl;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const deleteProfilePicture = async (apiUrl, id, isInstitutional) => {
  const token = sessionStorage.getItem("token");
  const usertype = isInstitutional ? "user" : "company";
  try {
    const response = await fetch(`${apiUrl}/delete-image-${usertype}/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
    },
    });

    if (!response.ok) {
      throw new Error('Error al eliminar la imagen');
    }

    return await response.text();
  } catch (error) {
    console.error(error);
    throw error;
  }
};