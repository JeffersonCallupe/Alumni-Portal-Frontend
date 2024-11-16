export const uploadProfilePicture = async (apiUrl, id, imageFile) => {
  const formData = new FormData();
  formData.append("image", imageFile); // Clave 'image', como en Postman
  const token = sessionStorage.getItem("token"); // Recupera el token

  try {
    const response = await fetch(`${apiUrl}/${id}`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      body: formData, // FormData se usa para enviar el archivo
    });

    if (!response.ok) {
      // Lanza un error si la respuesta no es 200 OK
      const errorResponse = await response.json();
      throw new Error(`Error al subir la imagen: ${errorResponse.message || response.statusText}`);
    }
    return await response.text();

  } catch (error) {
    console.error("Error al subir la imagen:", error);
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
    const response = await fetch(`${apiUrl}/${id}`, {
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
    console.error("Error al eliminar la imagen:", error);
    throw error;
  }
};