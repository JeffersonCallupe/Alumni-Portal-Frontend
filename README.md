# 📚 Portal Alumni UNMSM - Frontend

El Portal Alumni UNMSM es una aplicación web que actúa como puente entre la comunidad universitaria de la Universidad Nacional Mayor de San Marcos y el mundo profesional. Diseñada para potenciar el networking, esta plataforma facilita la gestión de perfiles, la participación en actividades académicas y la búsqueda de oportunidades laborales en un entorno intuitivo y moderno. ¡Empodera tu futuro con un solo clic!

## 🌟 Índice

1. [Propósito del Proyecto]()
2. [Funcionalidades Principales]()
3. [Tecnologías Utilizadas]()
4. [Estructura del Proyecto]()
5. [Instalación y Configuración]()
6. [Pruebas Funcionales]()
   - [Casos de Prueba del Módulo de Gestión de Acceso]()
   - [Casos de Prueba del Módulo de Gestión de Perfil]()
   - [Casos de Prueba del Módulo de Gestión de Actividades]()
   - [Casos de Prueba del Módulo de Gestión de Empleabilidad]()
   - [Integración de las Pruebas Funcionales]()
   - [Ejecución de las Pruebas Funcionales]()
7. [Licencia](#licencia)

## 1. Propósito del proyecto

El Portal Alumni - Frontend es la interfaz de usuario de la innovadora plataforma diseñada para potenciar la comunidad estudiantil de la Universidad Nacional Mayor de San Marcos (UNMSM). Este portal no solo facilita la creación y personalización de perfiles profesionales, sino también la búsqueda de actividades académicas, eventos y oportunidades laborales, fomentando la interacción directa entre estudiantes y empresas en un entorno moderno y accesible.

### Objetivo

El objetivo principal del Portal Alumni es conectar a estudiantes y empresas en un espacio digital dinámico y eficiente. A través de esta plataforma, los usuarios pueden:

- Crear redes de contacto valiosas.
- Participar en actividades formativas y laborales.
- Acceder a oportunidades laborales que impulsen su crecimiento profesional.

De esta forma, el Portal Alumni se convierte en un eje clave para el desarrollo profesional, académico y social de la comunidad universitaria.

## 2. Funcionalidades Principales

### Gestión de Acceso

- **Integración con el Sistema SUM:** Registro de estudiantes utilizando credenciales institucionales.
- **Registro de Empresas:** Empresas pueden crear cuentas proporcionando información de contacto relevante.
- **Gestión de Contraseñas:** Opciones para cambiar la contraseña actual tanto para estudiantes como para empresas.
- **Eliminación de Cuentas:** Posibilidad de desactivar cuentas de manera autónoma.

### Gestión de Perfiles

- **Personalización de Perfiles:** Estudiantes pueden actualizar sus perfiles profesionales, incluyendo datos académicos.
- **Registro Detallado:** Opciones para agregar experiencia laboral, educación, certificaciones, proyectos y habilidades clave.
- **Generación de CV:** Creación automática de un currículum en formato ATS a partir de los datos del perfil del estudiante.
- **Gestión de Información Empresarial:** Empresas pueden editar y personalizar su información de contacto.

### Gestión de Actividades

- **Publicación de Actividades:** Estudiantes y empresas pueden compartir actividades académicas, eventos y conferencias.
- **Búsqueda de Actividades:** Estudiantes pueden explorar actividades según sus preferencias.
- **Inscripción y Cancelación de Actividades:** Los estudiantes pueden registrarse o cancelar su inscripción en actividades de interés.
- **Gestión de Participantes:** Visualización de la lista de participantes registrados en cada actividad.

### Gestión de Empleabilidad

- **Publicación de Ofertas Laborales:** Empresas pueden publicar vacantes con detalles específicos.
- **Búsqueda de Oportunidades:** Estudiantes pueden explorar ofertas laborales según sus preferencias y habilidades.
- **Aplicación y Cancelación de Aplicaciones:** Gestión de postulaciones por parte de los estudiantes.
- **Seguimiento de Aplicantes:** Empresas pueden visualizar a los postulantes interesados en sus ofertas laborales.

## 3. Tecnologías Utilizadas

El frontend del Portal Alumni está desarrollado utilizando tecnologías modernas y herramientas colaborativas que garantizan un diseño eficiente, una experiencia de usuario óptima y una gestión de código organizada.

### Principales Tecnologías

- **React:** Biblioteca de JavaScript utilizada para construir interfaces de usuario dinámicas y basadas en componentes. Facilita el desarrollo de aplicaciones modulares y escalables.
- **JavaScript (ES6+):** Lenguaje de programación utilizado para implementar la lógica del frontend. La versión ES6+ ofrece características avanzadas como destructuración, funciones flecha, módulos y promesas, lo que mejora la eficiencia y legibilidad del código.
- **Styled Components:** Biblioteca CSS-in-JS que permite diseñar componentes de manera modular y reutilizable, asegurando un estilo consistente a lo largo de la aplicación.
- **Material UI:** Librería de componentes de interfaz de usuario basada en las pautas de diseño de Google Material Design. Proporciona una colección de elementos predefinidos y personalizables que permiten crear interfaces modernas, accesibles y atractivas.

### Herramientas de Desarrollo y Colaboración

- **Git:** Sistema de control de versiones distribuido, utilizado para gestionar el historial de cambios del proyecto y facilitar el trabajo en equipo.
- **GitHub:** Plataforma basada en la web para almacenar el repositorio del proyecto, colaborar en equipo y gestionar tareas mediante issues y pull requests.

### Calidad del Código

- **ESLint:** Herramienta para analizar y reportar patrones en el código JavaScript, ayudando a mantener estándares de calidad y detectar errores durante el desarrollo.

### Diseño UI/UX

- **Figma:** Herramienta colaborativa en línea para el diseño de interfaces de usuario y experiencias de usuario (UI/UX). Permite la creación de prototipos interactivos y facilita la comunicación entre desarrolladores y diseñadores.

## 4. Estructura del Proyecto

A continuación se presenta la estructura de carpetas del repositorio:

```bash
├── public/ # Archivos estático
├── src/
│ ├── app/ # Lógica de la aplicación
│ ├── assets/ # Recursos como imágenes, íconos, botones.
│ ├── components/ # Componentes reutilizables de la UI
│ ├── contexts/ # Contextos para la gestión de estado global
│ ├── hooks/ # Custom hooks para reutilización de lógica
│ ├── utils/ # Funciones auxiliares y utilitarias
│ ├── App.css # Estilos globales
│ ├── App.jsx # Componente principal de la aplicación
│ ├── index.css # Estilos de inicialización
│ └── main.jsx # Punto de entrada de la aplicación
├── eslint.config.js # Configuración de ESLint
├── index.html # Archivo HTML principal
├── package.json # Dependencias y scripts de Node.js
├── postcss.config.js # Configuración de PostCSS
├── tailwind.config.js # Configuración de Tailwind CSS
├── vite.config.js # Configuración de Vite
└── README.md # Documentación del proyecto
```

## 5. Instalación y Configuración

Sigue estos pasos para clonar, configurar e iniciar el proyecto en tu entorno local:

```bash
# Clonar el repositorio
git clone https://github.com/JeffersonCallupe/Alumni-Portal-Frontend.git

# Entrar en el directorio
cd Alumni-Portal-Frontend

# Instalar dependencias
npm install

# Ejecutar el proyecto en desarrollo
npm run dev
```

### Requisitos Previos

Asegúrate de tener instalados los siguientes programas en tu sistema:

- **Node.js (versión 14 o superior) y npm:** Necesarios para gestionar dependencias y scripts.
- **Git:** Para clonar el repositorio.

### Servidor de Desarrollo

Una vez ejecutado el comando npm run dev, el proyecto estará disponible en un servidor local (por defecto en http://localhost:3000). Cualquier cambio realizado en el código se reflejará automáticamente gracias a la recarga en tiempo real (hot reload).

¡Listo! Ahora puedes explorar y contribuir al desarrollo del Portal Alumni.

## 6. Pruebas Funcionales

Las pruebas funcionales del proyecto fueron realizadas utilizando:

- **Selenium:** Una herramienta poderosa y ampliamente utilizada para la automatización de pruebas en aplicaciones web. Selenium permite interactuar con los navegadores de forma programática, simulando acciones de los usuarios, como clics, ingreso de texto y navegación entre páginas, para verificar el comportamiento esperado de la aplicación.
- **PyUnit:** El framework estándar de pruebas unitarias para Python, basado en el módulo unittest. PyUnit facilita la estructuración, ejecución y reporte de resultados de las pruebas, garantizando que cada funcionalidad cumpla con los requisitos establecidos.

Estas herramientas en conjunto proporcionaron un entorno robusto para diseñar y ejecutar pruebas automatizadas, asegurando la calidad y estabilidad del sistema.

Puedes consultar el conjunto completo de casos de prueba realizados para los cuatro módulos principales del sistema en el siguiente enlace: [Casos de prueba de los 4 módulos](https://docs.google.com/document/d/1gSgzKVyP6srcikC5UiUdsWBFG8VgjzUbg1JWrOM1FGk/edit?tab=t.0).

### Casos de Pruebas del Módulo de Gestión de Acceso

- **Usuario estudiante**

  |         Funcionalidad          | Acciones                                                              | Resultados esperados                                                   |
  | :----------------------------: | --------------------------------------------------------------------- | ---------------------------------------------------------------------- |
  | Inicio de Sesión Institucional | El usuario ingresa credenciales válidas para un usuario preexistente. | Mensaje: “Inicio de sesión exitoso” Se redirige al perfil del usuario. |
  |              ...               | ...                                                                   | ...                                                                    |

- **Usuario empresa**
  | Funcionalidad | Acciones | Resultados esperados |
  |:----------------------:| ------------------------------------------------------- | -------------------------------------------------------------- |
  | Inicio de Sesión Empresarial | El usuario ingresa credenciales válidas para un usuario preexistente. | Mensaje: “Inicio de sesión exitoso” Se redirige al perfil del usuario. |
  | ... | ... | ... |

### Casos de Pruebas del Módulo de Gestión de Perfil

- **Usuario estudiante**

  |               Funcionalidad                | Acciones                                                 | Resultados esperados                                                                   |
  | :----------------------------------------: | -------------------------------------------------------- | -------------------------------------------------------------------------------------- |
  | Editar información personal del Estudiante | El usuario ingresa todos los datos requeridos y válidos. | La información personal se actualiza correctamente; se muestra un mensaje confirmando. |
  |                    ...                     | ...                                                      | ...                                                                                    |

- **Usuario empresa**
  | Funcionalidad | Acciones | Resultados esperados |
  |:----------------------:| ------------------------------------------------------- | -------------------------------------------------------------- |
  | Editar información personal del la Empresa | El usuario ingresa todos los datos requeridos y válidos. | La información de la empresa se actualiza correctamente; se muestra un mensaje confirmando. |
  | ... | ... | ... |

### Casos de Pruebas del Módulo de Gestión de Actividades

- **Usuario estudiante**

  |     Funcionalidad      | Acciones                                                 | Resultados esperados                                           |
  | :--------------------: | -------------------------------------------------------- | -------------------------------------------------------------- |
  | Crear actividad válida | El usuario ingresa todos los datos requeridos y válidos. | Actividad creada con éxito; se muestra un mensaje confirmando. |
  |          ...           | ...                                                      | ...                                                            |

- **Usuario empresa**
  | Funcionalidad | Acciones | Resultados esperados |
  |:----------------------:| ------------------------------------------------------- | -------------------------------------------------------------- |
  | Crear actividad válida | El usuario ingresa todos los datos requeridos y válidos. | Actividad creada con éxito; se muestra un mensaje confirmando. |
  | ... | ... | ... |

### Casos de Pruebas del Módulo de Gestión de Empleabilidad

- **Usuario estudiante**

  |      Funcionalidad       | Acciones                                                 | Resultados esperados                                                                         |
  | :----------------------: | -------------------------------------------------------- | -------------------------------------------------------------------------------------------- |
  | Aplicar a oferta laboral | El usuario clickea en el botón "POSTULAR" de una oferta. | El usuario ha aplicado exitosamente a la oferta laboral; se muestra mensaje de confirmación. |
  |           ...            | ...                                                      | ...                                                                                          |

- **Usuario empresa**
  | Funcionalidad | Acciones | Resultados esperados |
  |:----------------------:| ------------------------------------------------------- | -------------------------------------------------------------- |
  | Crear nueva oferta laboral | La empresa ingresa todos los datos requeridos. | El usuario ha aplicado exitosamente a la oferta laboral; se muestra mensaje de confirmación. |
  | ... | ... | ... |

### Integración de las Pruebas Funcionales

```bash
from test_editarInformacionPersonalEmpresa import TestEditarInformacionPersonalEmpresa
from test_editarInfoContacto import TestContacto
from test_editarDescripcionEmpresa import TestEditarDescripcionEmpresa
from test_actividadtestUser import TestActividadtestUser
from test_actividadtestCompany import TestActividadtesCompany
from test_Company import TestTestCompany
from test_User import TestTestUser
import pytest
import sys
import os
from test_loginempresa import TestLoginEmpresa
from test_logininstitucional import TestLogininstitucional

# Añadir el directorio actual al path para importar los módulos de prueba
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

# Importar las clases de prueba
class TestMainWorkflow:
    def setup_method(self, method):
        # Configuración inicial que se ejecutará antes de todos los tests
        pass

    def teardown_method(self, method):
        # Limpieza que se ejecutará después de todos los tests
        pass

    def test_sequential_workflow(self):
        # Ejecutar los tests en el orden deseado
        # Prueba de empresa
        TestTestCompany()
        TestTestUser()
        # Prueba de usuario
        TestActividadtesCompany()
        TestActividadtestUser()
        TestEditarDescripcionEmpresa()
        TestContacto()
        TestEditarInformacionPersonalEmpresa()
        TestLoginEmpresa()
        TestLogininstitucional()

if __name__ == "__main__":
    # Ejecutar los tests usando pytest
    pytest.main([__file__])
```

### Ejecución de las Pruebas Funcionales

Para ejecutar las pruebas funcionales del proyecto, sigue estos pasos:

1. Antes de correr las pruebas, inicia el servidor local del proyecto frontend para garantizar que todas las funcionalidades estén accesibles para las pruebas automatizadas.

2. Asegúrate de tener instalado **pytest**, un marco de pruebas que simplifica la ejecución de tests en Python. Si no lo tienes, instálalo utilizando el siguiente comando:

```bash
pip install pytest
```

3. Ejecuta el siguiente comando en la terminal desde el directorio del proyecto, asegurándote de que los archivos de prueba estén correctamente configurados:

```bash
pytest -v .\main_test.py
```

**Detalles del Comando**

- **pytest:** Es el comando que inicializa el marco de pruebas Pytest.
- **-v:** Activa el modo "verbose", proporcionando un nivel de detalle más alto en los resultados, como el estado de cada prueba ejecutada.
- **.\main_test.py:** Es el archivo principal donde están definidos los casos de prueba funcionales.

Una vez ejecutado, Pytest mostrará un resumen con el número total de pruebas realizadas, cuántas pasaron y, en caso de fallas, detalles sobre los errores encontrados.

## Licencias

Este proyecto está licenciado bajo la **Licencia MIT**. Esto significa que puedes usar, modificar y distribuir el código del proyecto libremente, siempre y cuando incluyas una copia del aviso de copyright y la licencia original en cualquier distribución.
