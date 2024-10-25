// manageImage.js
export const uploadProfilePicture = async (apiUrl, id, imageFile) => {
    const formData = new FormData();
    formData.append("image", imageFile);
    console.log(`${apiUrl}/upload-user/${id}`)
  
    try {
      const response = await fetch(`${apiUrl}/upload-user/${id}`, {
        method: 'POST',
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
    try {
      const response = await fetch(`${apiUrl}/download-user/${id}`, {
        method: 'GET',
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
    try {
      const response = await fetch(`${apiUrl}/delete-image-user/${id}`, {
        method: 'DELETE',
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