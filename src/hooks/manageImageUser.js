export const uploadProfilePicture = async (apiUrl, id, imageFile) => {
  const formData = new FormData();
  formData.append("image", imageFile);
  const token = sessionStorage.getItem("token");

  try {
    //const response = await fetch(`${import.meta.env.VITE_API_URL}/api/image/upload-${usertype}/${id}`, {
    const response = await fetch(`${apiUrl}/${id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
    },
      body: formData,
    });
    
    if (!response.ok) {
      throw new Error('Error al subir la imagen');
    }

    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getProfilePicture = async (apiUrl, id) => {
  const token = sessionStorage.getItem("token");
  try {
    //const response = await fetch(`${import.meta.env.VITE_API_URL}/api/image/download-${usertype}/${id}`, {
    const response = await fetch(`${apiUrl}/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
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

export const deleteProfilePicture = async (apiUrl, id) => {
  const token = sessionStorage.getItem("token");
  try {
    //const response = await fetch(`${import.meta.env.VITE_API_URL}/api/image/delete-image-${usertype}/${id}`, {
    const response = await fetch(`${apiUrl}/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
    },
    });

    if (!response.ok) {
      throw new Error('Error al eliminar la imagen');
    }

    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};