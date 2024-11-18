import React, { useEffect, useState } from "react";
import { Card, CardHeader, CardMedia, CardContent, Avatar, Typography } from "@mui/material";
import Button from "../../../atoms/buttons/actionButton";

const ActividadRegistradaCard = ({ actividad, onCancelEnrollment }) => {
    const {
        id,
        title,
        description,
        startDate,
        endDate,
        location,
        companyId,
        userId,
        userName,
        userPaternalSurname,
        userMaternalSurname,
        companyName,
        enrollmentStatus,
    } = actividad;

    const [activityImage, setActivityImage] = useState(null);
    const [profileImage, setProfileImage] = useState(null);

    useEffect(() => {
        const fetchActivityImage = async () => {
            try {
                const response = await fetch(
                    `http://178.128.147.224:8080/api/activity/activity-image/${id}`
                );
                const blob = await response.blob();
                setActivityImage(URL.createObjectURL(blob));
            } catch (error) {
                console.error("Error al obtener la imagen de la actividad:", error);
            }
        };

        const fetchProfileImage = async () => {
            try {
                const profileEndpoint = userId
                    ? `http://178.128.147.224:8080/api/image/download-user/${userId}`
                    : `http://178.128.147.224:8080/api/image/download-company/${companyId}`;

                const response = await fetch(profileEndpoint);
                const blob = await response.blob();
                setProfileImage(URL.createObjectURL(blob));
            } catch (error) {
                console.error("Error al obtener la imagen de perfil:", error);
            }
        };

        fetchActivityImage();
        fetchProfileImage();
    }, [id, userId, companyId]);

    // const isCancelable = new Date(startDate) > new Date();
    // console.log(startDate);

    return (
        <Card sx={{ textAlign: "left", borderRadius: "8px", boxShadow: "none", margin: "0.5rem 0" }}>
            <CardHeader
                avatar={
                    <Avatar src={profileImage} aria-label="profile">
                        {profileImage ? null : userName?.[0] || companyName?.[0]}
                    </Avatar>
                }
                action={
                    
                    <>
                        <Button texto="Cancelar" onClick={() => onCancelEnrollment(id)} />
                    </>
                }
                title={
                    userId
                        ? `${title} - Creado por ${userName} ${userPaternalSurname} ${userMaternalSurname}`
                        : `${title} - Creado por ${companyName}`
                }
                subheader={`Inicio: ${startDate} | Fin: ${endDate}`}
            />
            <CardMedia
                component="img"
                image={activityImage}
                alt={title}
                sx={{
                    width: "auto",
                    height: "auto",
                    maxWidth: "80%",
                    justifySelf: "center",
                }}
            />
            <CardContent>
                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                    {description}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                    {location}
                </Typography>
            </CardContent>
        </Card>
    );
};

export default ActividadRegistradaCard;
