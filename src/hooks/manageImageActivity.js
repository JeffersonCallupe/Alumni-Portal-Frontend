export const uploadProfilePicture = async (apiUrl, id, imageFile) => {
    const token = sessionStorage.getItem("token");
    const formData = new FormData();
    if(imageFile) formData.append("image", imageFile);
  
    try {
      const response = await fetch(`${apiUrl}/${id}`, {
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
  
  export const getProfilePicture = async (apiUrl, id) => {
    const token = sessionStorage.getItem("token");
    try {
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
      console.error(error);
      throw error;
    }
  };
  