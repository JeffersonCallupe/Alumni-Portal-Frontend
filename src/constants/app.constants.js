/**
 * Constantes de configuración de la aplicación
 * Este archivo centraliza todos los valores constantes para facilitar el mantenimiento
 */

// ============================================================================
// URLs y Recursos
// ============================================================================

/**
 * URL de la imagen de perfil por defecto
 * Se usa cuando un usuario no tiene foto de perfil configurada
 */
export const DEFAULT_PROFILE_IMAGE = "https://static.vecteezy.com/system/resources/previews/019/879/186/non_2x/user-icon-on-transparent-background-free-png.png";

// ============================================================================
// Configuración de Tiempos (en milisegundos)
// ============================================================================

/**
 * Duración en milisegundos antes de ocultar automáticamente las alertas
 * @default 3000ms (3 segundos)
 */
export const ALERT_AUTO_HIDE_DURATION = 3000;

// ============================================================================
// Mensajes de Usuario
// ============================================================================

/**
 * Mensajes estandarizados para la aplicación
 * Organizados por categoría: PERMISSIONS, SUCCESS, ERROR, WARNING, INFO
 */
export const MESSAGES = {
    // Mensajes de Permisos
    PERMISSIONS: {
        COMPANY_ONLY_CREATE_JOB: "Solo las empresas pueden crear ofertas laborales.",
        COMPANY_ONLY_EDIT_JOB: "Solo las empresas pueden editar ofertas laborales.",
        COMPANY_ONLY_DELETE_JOB: "Solo las empresas pueden eliminar ofertas laborales.",
        COMPANY_ONLY_CREATE_ACTIVITY: "Solo las empresas pueden crear actividades.",
        COMPANY_ONLY_EDIT_ACTIVITY: "Solo las empresas pueden editar actividades.",
        COMPANY_ONLY_DELETE_ACTIVITY: "Solo las empresas pueden eliminar actividades.",
    },

    // Mensajes de Éxito
    SUCCESS: {
        // Ofertas Laborales
        JOB_CREATED: "Oferta laboral publicada correctamente",
        JOB_UPDATED: "Oferta laboral actualizada correctamente",
        JOB_DELETED: "Oferta laboral eliminada correctamente",
        JOB_APPLIED: "Has aplicado exitosamente a la oferta laboral",
        JOB_APPLICATION_CANCELLED: "Aplicación cancelada correctamente",

        // Actividades
        ACTIVITY_CREATED: "Actividad publicada correctamente",
        ACTIVITY_UPDATED: "Actividad actualizada correctamente",
        ACTIVITY_DELETED: "Actividad eliminada correctamente",
        ACTIVITY_ENROLLED: "Te has inscrito exitosamente a la actividad",
        ACTIVITY_UNENROLLED: "Inscripción cancelada correctamente",

        // Perfil
        PROFILE_UPDATED: "La información se actualizó con éxito",
        PASSWORD_UPDATED: "Contraseña actualizada correctamente",
        IMAGE_UPLOADED: "Imagen subida correctamente",

        // Autenticación
        LOGIN_SUCCESS: "Inicio de sesión exitoso",
        LOGOUT_SUCCESS: "Sesión cerrada correctamente",
        REGISTER_SUCCESS: "Registro exitoso",
    },

    // Mensajes de Error
    ERROR: {
        // Ofertas Laborales
        JOB_SAVE: "Error al guardar la oferta laboral",
        JOB_DELETE: "Error al eliminar la oferta laboral",
        JOB_LOAD: "Error al cargar las ofertas laborales",
        NO_APPLICANTS: "No hay postulantes que han aplicado a la oferta laboral",
        JOB_APPLY: "Error al aplicar a la oferta laboral",

        // Actividades
        ACTIVITY_SAVE: "Error al guardar la actividad",
        ACTIVITY_DELETE: "Error al eliminar la actividad",
        ACTIVITY_LOAD: "Error al cargar las actividades",
        NO_PARTICIPANTS: "No hay participantes inscritos en esta actividad",
        ACTIVITY_ENROLL: "Error al inscribirse a la actividad",

        // Perfil
        PROFILE_UPDATE: "Error al actualizar el perfil",
        PASSWORD_UPDATE: "Error al actualizar la contraseña",
        IMAGE_UPLOAD: "Error al subir la imagen",

        // Autenticación
        LOGIN_ERROR: "Error al iniciar sesión",
        INVALID_CREDENTIALS: "Credenciales inválidas",
        SESSION_EXPIRED: "Sesión expirada. Por favor, inicia sesión nuevamente",

        // Genéricos
        NETWORK_ERROR: "Error de conexión. Verifica tu conexión a internet",
        UNKNOWN_ERROR: "Ha ocurrido un error inesperado",
    },

    // Mensajes de Advertencia
    WARNING: {
        NO_JOB_SELECTED: "No se seleccionó una oferta de trabajo válida",
        NO_ACTIVITY_SELECTED: "No se seleccionó una actividad válida",
        UNSAVED_CHANGES: "Tienes cambios sin guardar",
    },

    // Mensajes Informativos
    INFO: {
        LOADING: "Cargando...",
        NO_JOBS_AVAILABLE: "No hay ofertas laborales disponibles",
        NO_ACTIVITIES_AVAILABLE: "No hay actividades disponibles",
        NO_RESULTS: "No se encontraron resultados",
    },
};

// ============================================================================
// Roles de Usuario
// ============================================================================

/**
 * Roles disponibles en el sistema
 */
export const USER_ROLES = {
    COMPANY: "COMPANY",
    STUDENT: "STUDENT",
    INSTITUTIONAL: "INSTITUTIONAL",
    ADMIN: "ADMIN",
};

// ============================================================================
// Tipos de Alerta
// ============================================================================

/**
 * Tipos de alerta disponibles para el sistema de notificaciones
 */
export const ALERT_TYPES = {
    SUCCESS: "success",
    ERROR: "error",
    WARNING: "warning",
    INFO: "info",
};

// ============================================================================
// Estados de Aplicación
// ============================================================================

/**
 * Estados posibles de una aplicación a oferta laboral
 */
export const APPLICATION_STATUS = {
    PENDING: "PENDING",
    ACCEPTED: "ACCEPTED",
    REJECTED: "REJECTED",
    CANCELLED: "CANCELLED",
};

/**
 * Estados posibles de una inscripción a actividad
 */
export const ENROLLMENT_STATUS = {
    ACTIVE: "ACTIVE",
    CANCELLED: "CANCELLED",
    COMPLETED: "COMPLETED",
};

// ============================================================================
// Configuración de Paginación
// ============================================================================

/**
 * Configuración por defecto para paginación
 */
export const PAGINATION = {
    DEFAULT_PAGE_SIZE: 10,
    PAGE_SIZE_OPTIONS: [5, 10, 20, 50],
};

// ============================================================================
// Formatos de Fecha
// ============================================================================

/**
 * Formatos de fecha utilizados en la aplicación
 */
export const DATE_FORMATS = {
    DISPLAY: "DD/MM/YYYY",
    DISPLAY_WITH_TIME: "DD/MM/YYYY HH:mm",
    API: "YYYY-MM-DD",
    API_WITH_TIME: "YYYY-MM-DDTHH:mm:ss",
};

// ============================================================================
// Validaciones
// ============================================================================

/**
 * Constantes para validaciones de formularios
 */
export const VALIDATION = {
    MIN_PASSWORD_LENGTH: 8,
    MAX_PASSWORD_LENGTH: 50,
    MIN_USERNAME_LENGTH: 3,
    MAX_USERNAME_LENGTH: 50,
    MAX_DESCRIPTION_LENGTH: 1000,
    MAX_TITLE_LENGTH: 100,
};

// ============================================================================
// Modalidades de Trabajo
// ============================================================================

/**
 * Modalidades disponibles para ofertas laborales
 */
export const WORK_MODALITIES = {
    REMOTE: "Remoto",
    PRESENCIAL: "Presencial",
    HYBRID: "Híbrido",
};

// ============================================================================
// Niveles de Experiencia
// ============================================================================

/**
 * Niveles de experiencia para ofertas laborales
 */
export const EXPERIENCE_LEVELS = {
    ENTRY: "Junior",
    MID: "Semi-Senior",
    SENIOR: "Senior",
    EXPERT: "Experto",
};

export default {
    DEFAULT_PROFILE_IMAGE,
    ALERT_AUTO_HIDE_DURATION,
    MESSAGES,
    USER_ROLES,
    ALERT_TYPES,
    APPLICATION_STATUS,
    ENROLLMENT_STATUS,
    PAGINATION,
    DATE_FORMATS,
    VALIDATION,
    WORK_MODALITIES,
    EXPERIENCE_LEVELS,
};
