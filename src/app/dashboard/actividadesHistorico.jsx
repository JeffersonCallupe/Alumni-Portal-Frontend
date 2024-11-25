import React, { useState, useEffect, useRef } from "react";
import ActividadCard from "../../components/organisms/cards/dashboard/actividadCard";
import HomeBase from "../../components/templates/home/home";
import { useUserContext } from "../../contexts/userContext";
import { useAlert } from "../../contexts/alertContext";
import useGet from "../../hooks/useGet";
import usePost from "../../hooks/usePost";

function ActividadesHistorico() {
  const { userData } = useUserContext();
  const { showAlert } = useAlert();
  const [actividades, setActividades] = useState([]);
  const [inscripciones, setInscripciones] = useState([]);
  const fetchDataRef = useRef(false);
  const { getData: getActividades } = useGet(
    `${import.meta.env.VITE_API_URL}/api/activity/all`
  );
  const { getData: getInscripciones } = useGet(
    `${import.meta.env.VITE_API_URL}/api/enrollment/user/${userData?.id}`
  );
  const { post: inscribirUsuario } = usePost(
    `${import.meta.env.VITE_API_URL}/api/enrollment/save`
  );

  useEffect(() => {
    if(userData && !fetchDataRef.current) {
      const fetchDatos = async () => {
        try {
          const actividadesData = await getActividades();
          setActividades(actividadesData);

          const inscripcionesData = await getInscripciones();
          setInscripciones(inscripcionesData.map((i) => i.activityId)); // Solo IDs de actividades inscritas
        } catch (error) {
          console.error("Error al obtener los datos:", error);
        }
      };

      fetchDatos();
      fetchDataRef.current = true;
    }
  }, [userData, getActividades, getInscripciones]);

  const handleRegister = async (activityId) => {
    try {
      const enrollmentData = {
        user: { id: userData.id },
        activity: { id: activityId },
      };
      await inscribirUsuario(enrollmentData);
      setInscripciones((prev) => [...prev, activityId]); // Añadir nueva inscripción
      showAlert("Inscripción realizada con éxito.", "success");
    } catch (error) {
      console.error("Error al inscribirse en la actividad:", error);
      showAlert("No se pudo realizar la inscripción.", "error");
    }
  };

  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <HomeBase>
        <div className="flex flex-row gap-8 mt-4 mb-16 lg:mx-12 justify-center">
            <div className="lg:w-4/12">
                <p>Filtros aaa</p>
            </div>
            <div className="flex flex-col w-10/12 lg:w-7/12">
            {actividades.length > 0 ? (
                actividades.map((actividad) => (
                <ActividadCard
                    key={actividad.id}
                    actividad={actividad}
                    onRegister={
                    inscripciones.includes(actividad.id)
                        ? null // No mostrar botón si ya está inscrito
                        : () => handleRegister(actividad.id)
                    }
                    multimediaApi={`${import.meta.env.VITE_API_URL}/api/activity/activity-image`}
                />
                ))
            ) : (
                <div className="text-center text-gray-500">No hay actividades disponibles.</div>
            )}
            </div>
        </div>
    </HomeBase>
  );
}

export default ActividadesHistorico;

