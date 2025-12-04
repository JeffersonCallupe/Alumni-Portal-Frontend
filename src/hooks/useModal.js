import { useState } from 'react';

/**
 * Custom hook para gestionar el estado de apertura/cierre de modales
 * @returns {Object} Objeto con estado y funciones del modal
 * @returns {boolean} returns.open - Estado de apertura del modal
 * @returns {Function} returns.handleOpen - Función para abrir el modal
 * @returns {Function} returns.handleClose - Función para cerrar el modal
 */
const useModal = () => {
  const [open, setOpen] = useState(false);

  /** Abre el modal */
  const handleOpen = () => setOpen(true);

  /** Cierra el modal */
  const handleClose = () => setOpen(false);

  return {
    open,
    handleOpen,
    handleClose,
  };
};

export default useModal;