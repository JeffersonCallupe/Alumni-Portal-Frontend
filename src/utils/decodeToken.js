import { DEFAULT_PROFILE_IMAGE } from '../constants/app.constants';

/**
 * Decodifica un token JWT y extrae información del usuario
 * NOTA: Actualmente retorna el token sin decodificar. 
 * Descomentar la importación y uso de jwt-decode cuando esté listo.
 * 
 * @param {string|Object} token - Token JWT a decodificar
 * @returns {Object} Información del usuario extraída del token
 * @returns {string} returns.username - Nombre del usuario
 * @returns {string} returns.profilePicture - URL de la foto de perfil
 * @returns {string} returns.role - Rol del usuario
 * @returns {number} returns.userType - Tipo de usuario (0: normal, 1: administrador)
 */
export const decodeToken = (token) => {
    // TODO: Descomentar cuando jwt-decode esté correctamente configurado
    // import { jwtDecode } from 'jwt-decode';
    // const decodedToken = jwtDecode(token);

    const decodedToken = token;

    return {
        username: decodedToken?.data?.nombreUsuario || 'Usuario de prueba',
        profilePicture: DEFAULT_PROFILE_IMAGE,
        role: decodedToken?.data?.rol || 'Institucional',
        userType: decodedToken?.data?.administrador === 1 ? 1 : 0,
    };
};

export default decodeToken;