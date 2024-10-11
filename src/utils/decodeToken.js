/*"import jwtDecode from 'jwt-decode' */

export const decodeToken = (token) => {
    /*const decodedToken = jwtDecode(token) */
    const decodedToken = token;
    return {
        username: decodedToken?.data?.nombreUsuario || 'Usuario de prueba',
        profilePicture: "https://static.vecteezy.com/system/resources/previews/019/879/186/non_2x/user-icon-on-transparent-background-free-png.png",
        role: decodedToken?.data?.rol || 'Institucional',
        userType: decodedToken?.data?.administrador === 1 ? 1 : 0,
    };
};

export default decodeToken;