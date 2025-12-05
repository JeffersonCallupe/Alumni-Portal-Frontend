export function validateLoginSM(formData) {
  let errors = {};
  const emailPattern = /^[a-zA-Z0-9._%+-]+@unmsm\.edu\.pe$/;
  if (!emailPattern.test(formData.email)) {
    errors.email = "Debe ingresar un correo institucional válido (@unmsm.edu.pe)";
  }
  if (!formData.password) {
    errors.password = "La contraseña es requerida";
  }
  return errors;
};

export function validateLoginSUM(formData) {
  let errors = {};
  if (!formData.username) {
    errors.username = "El usuario de SUM es requerido";
  }

  if (!formData.password) {
    errors.password = "La contraseña es requerida";
  }
  return errors;
}

export function validateRegistroSM(formData) {
  let errors = {};

  if (formData.password !== formData.confirmPassword) {
    errors.confirmPassword = "Las contraseñas no coinciden";
  }

  return errors;
};


export function validateLoginEmpresa(formData) {
  let errors = {};

  return errors;
};



export function validateRegistroEmpresa(formData) {
  let errors = {};

  if (!/\S+@\S+\.\S+/.test(formData.email)) errors.email = "Debe ingresar un correo válido";
  if (!formData.password) errors.password = "La contraseña es requerida";
  if (formData.password !== formData.confirmPassword) errors.confirmPassword = "Las contraseñas no coinciden";
  if (!formData.name) errors.name = "El nombre de la empresa es requerido";
  if (!formData.ruc) errors.ruc = "El RUC es requerido";
  if (!formData.sector) errors.sector = "Debe seleccionar una opción";

  return errors;
}
