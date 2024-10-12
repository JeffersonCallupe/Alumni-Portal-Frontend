export function validateLoginSM(formData){
  let errors = {};

  if (!formData.email.endsWith("@unmsm.edu.pe")) {
    errors.email = "Debe utilizar un correo institucional";
  } 
  if (!formData.password) {
    errors.password = "La contraseña es requerida";
  }

  return errors;
};

export function validateRegistroSM(formData){
  let errors = {};

  if (!formData.password) {
    errors.password = "La contraseña es requerida";
  }

  if (formData.password !== formData.confirmPassword) {
    errors.confirmPassword = "Las contraseñas no coinciden";
  }

  return errors;
};


export function validateLoginEmpresa(formData){
  let errors = {};

  if (!/\S+@\S+\.\S+/.test(formData.usuario)) {
    errors.usuario = "Debe ingresar un correo válido";
  }

  if (!formData.clave) {
    errors.clave = "La contraseña es requerida";
  }

  return errors;
};



export function validateRegistroEmpresa(formData) {
  let errors = {};

  if (!/\S+@\S+\.\S+/.test(formData.email)) {
    errors.email = "Debe ingresar un correo válido";
  }

  if (!formData.password) {
    errors.password = "La contraseña es requerida";
  }

  if (formData.password !== formData.confirmPassword) {
    errors.confirmPassword = "Las contraseñas no coinciden";
  }

  if (!formData.name) {
    errors.name = "El nombre de la empresa es requerido";
  }

  if (!formData.ruc) {
    errors.ruc = "El RUC es requerido";
  }

  return errors;
}
