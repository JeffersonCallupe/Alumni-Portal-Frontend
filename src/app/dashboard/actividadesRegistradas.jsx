import React, { useState, useEffect, useRef } from "react";
import ActividadCard from "../../components/organisms/cards/dashboard/actividadCard";
import HomeBase from "../../components/templates/home/home";
import { useUserContext } from "../../contexts/userContext";
import { useAlert } from "../../contexts/alertContext";
import useGet from "../../hooks/useGet";
import useModal from "../../hooks/useModal";
import useDelete from "../../hooks/useDelete";

function ActividadesRegistradas() {
    const { open, handleOpen, handleClose } = useModal();
    const [actividades, setActividades] = useState([]);
    const [selectedActivity, setSelectedActivity] = useState(null);
    const { userData, isInstitutional } = useUserContext();
    const [apiEndpoints, setApiEndpoints] = useState({});
    const fetchDataRef = useRef(false);

    // Solo se define userType y URLs dinámicas si userData está disponible
    useEffect(() => {
        if (userData) {
            setApiEndpoints({
                getAll: `${import.meta.env.VITE_API_URL}/api/activity/all`,
                multimedia: `${import.meta.env.VITE_API_URL}/api/activity/activity-image`,
            });
        }
    }, [userData, isInstitutional, selectedActivity]);

    // Hooks de API solo se inicializan cuando los endpoints están definidos
    const { getData } = useGet(apiEndpoints.getAll);
    

    useEffect(() => {
        if (userData && apiEndpoints.getAll && !fetchDataRef.current) {
            const fetchActividades = async () => {
                try {
                    const data = await getData();
                    setActividades(data);
                } catch (error) {
                    console.error("Error al obtener las actividades:", error);
                }
            };
            fetchActividades();
            fetchDataRef.current = true;
        }
    }, [userData, apiEndpoints.getAll, getData]);

    if (!userData) {
        return <div>Loading...</div>;
    } 
    
    const handleCancelEnrollment = async (id) => {

    }

    return (
        <HomeBase>
            <div className="flex flex-row gap-8 mt-4 mb-16 lg:mx-12 justify-center">
                <div className="lg:w-4/12">
                    <p>Filtros aaa</p>
                </div>
                <div className="flex flex-col w-10/12 lg:w-7/12">
                    <div>
                        {actividades.length > 0 ? (
                            actividades.map((actividad) => (
                                <ActividadCard
                                    key={actividad.id}
                                    actividad={actividad}
                                    multimediaApi={apiEndpoints.multimedia}
                                    onCancelEnrollment={handleCancelEnrollment}
                                />
                            ))
                        ) : (
                            <div>No hay actividades disponibles</div>
                        )}
                    </div>
                </div>
            </div>
        </HomeBase>
    );
}

export default ActividadesRegistradas;
