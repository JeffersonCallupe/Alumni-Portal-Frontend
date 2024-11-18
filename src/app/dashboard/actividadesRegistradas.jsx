import React, { useState, useEffect } from "react";
import ActividadRegistradaCard from "../../components/organisms/cards/dashboard/actividadRegistradaCard";
import HomeBase from "../../components/templates/home/home";
import { useUserContext } from "../../contexts/userContext";

function ActividadesRegistradas() {
    const { userData } = useUserContext();
    const [actividades, setActividades] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchUserEnrollments = async () => {
            if (!userData?.id) return;

            try {
                // Obtener inscripciones del usuario
                const enrollmentsResponse = await fetch(
                    `http://178.128.147.224:8080/api/enrollment/user/${userData.id}`
                );
                const enrollments = await enrollmentsResponse.json();

                // Obtener detalles de actividades y enriquecer los datos
                const actividadesData = await Promise.all(
                    enrollments.map(async (enrollment) => {
                        const activityResponse = await fetch(
                            `http://178.128.147.224:8080/api/activity/${enrollment.activityId}`
                        );
                        const activityDetails = await activityResponse.json();

                        return {
                            ...activityDetails,
                            enrollmentId: enrollment.id,
                            enrollmentStatus: enrollment.status,
                            enrollmentDate: enrollment.enrollmentDate,
                        };
                    })
                );

                setActividades(actividadesData);
            } catch (error) {
                console.error("Error al obtener las actividades registradas:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchUserEnrollments();
    }, [userData]);

    if (isLoading) {
        return <div>Loading...</div>;
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
                                <ActividadRegistradaCard
                                    key={actividad.id}
                                    actividad={actividad}
                                    onCancelEnrollment={async (activityId) => {
                                        try {
                                            await fetch(
                                                `http://178.128.147.224:8080/api/enrollment/${actividad.enrollmentId}`,
                                                { method: "DELETE" }
                                            );
                                            setActividades((prev) =>
                                                prev.filter((item) => item.id !== activityId)
                                            );
                                        } catch (error) {
                                            console.error("Error al cancelar la inscripción:", error);
                                        }
                                    }}
                                />
                            ))
                        ) : (
                            <div>No hay actividades registradas</div>
                        )}
                    </div>
                </div>
            </div>
        </HomeBase>
    );
}

export default ActividadesRegistradas;

