import React, { useState, useEffect } from 'react';
import ActividadCard from '../../components/organisms/cards/dashboard/actividadCard';
import HomeBase from '../../components/templates/home/home';
import { useUserContext } from '../../contexts/userContext';
import { useAlert } from '../../contexts/alertContext';
import useGet from '../../hooks/useGet';
import useDelete from '../../hooks/useDelete';

function ActividadesRegistradas() {
  const [enrollments, setEnrollments] = useState([]);
  const [activities, setActivities] = useState([]);
  const { userData } = useUserContext();
  const { showAlert } = useAlert();

  // Endpoint for user's enrollments
  const enrollmentsEndpoint = `${import.meta.env.VITE_API_URL}/api/enrollment/user/${userData?.id}`;
  const { getData: getEnrollments } = useGet(enrollmentsEndpoint);

  // Endpoint for deleting enrollment
  const deleteEnrollmentEndpoint = `${import.meta.env.VITE_API_URL}/api/enrollment`;
  const { deleteData: deleteEnrollment } = useDelete(deleteEnrollmentEndpoint);

  // Fetch user's enrollments
  useEffect(() => {
    const fetchEnrollments = async () => {
      if (userData) {
        try {
          const enrollmentData = await getEnrollments();
          setEnrollments(enrollmentData);

          // Fetch details for each enrolled activity
          const activityPromises = enrollmentData.map(enrollment => 
            fetch(`${import.meta.env.VITE_API_URL}/api/activity/${enrollment.activityId}`, {
              headers: {
                'Authorization': `Bearer ${sessionStorage.getItem('token')}`
              }
            }).then(response => response.json())
          );

          const activityDetails = await Promise.all(activityPromises);
          setActivities(activityDetails);
        } catch (error) {
          console.error('Error fetching enrollments:', error);
          showAlert('No se pudieron cargar las actividades', 'error');
        }
      }
    };

    fetchEnrollments();
  }, [userData]);

  // Handle canceling enrollment
  const handleCancelEnrollment = async (activityId) => {
    try {
      // Find the enrollment ID for this activity
      const enrollment = enrollments.find(e => e.activityId === activityId);
      
      if (enrollment) {
        await deleteEnrollment(enrollment.id);
        
        // Remove the activity from the list
        setActivities(prevActivities => 
          prevActivities.filter(activity => activity.id !== activityId)
        );
        
        showAlert('Inscripción cancelada exitosamente', 'success');
      }
    } catch (error) {
      console.error('Error canceling enrollment:', error);
      showAlert('No se pudo cancelar la inscripción', 'error');
    }
  };

  if (!userData) {
    return <div>Cargando...</div>;
  }

  return (
    <HomeBase>
      <div className="flex flex-row gap-8 mt-4 mb-16 lg:mx-12 justify-center">
        <div className="lg:w-4/12">
            <p>Filtros aaa</p>
        </div>
        <div className="flex flex-col w-10/12 lg:w-7/12">
          {activities.length > 0 ? (
            activities.map((activity) => (
              <ActividadCard
                key={activity.id}
                actividad={{
                  ...activity,
                  userId: userData.id,
                  userName: userData.name,
                  userPaternalSurname: userData.paternalSurname,
                  userMaternalSurname: userData.maternalSurname,
                }}
                multimediaApi={`${import.meta.env.VITE_API_URL}/api/activity/activity-image`}
                onCancelEnrollment={() => handleCancelEnrollment(activity.id)}
              />
            ))
          ) : (
            <div className="text-center text-gray-500">
              No estás inscrito en ninguna actividad
            </div>
          )}
        </div>
      </div>
    </HomeBase>
  );
}

export default ActividadesRegistradas;
