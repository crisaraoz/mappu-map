/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from "react";
import styles from "./Map.module.scss";
//import logoFlag from "../../assets/isotipo_Mappu_1x1.png";

declare global {
  interface Window {
    google: any;
    initMap: () => void;
  }
}

function Map() {
  useEffect(() => {
    // Código de inicialización del mapa
    function initMap() {
      if (typeof window !== "undefined") {
        const map = new window.google.maps.Map(document.getElementById("map"), {
          zoom: 12.8,
          center: { lat: -34.6037, lng: -58.3816 },
        });

        setMarkers(map);
      }
    }

    // Datos para los marcadores
    const locations = [
      { name: "Mappu dev", lat: -34.608230271063675, lng: -58.450628311087975, instagram: "https://www.instagram.com/cris.araozz/" },
      { name: "Barrio Chino", lat: -34.5775, lng: -58.438, instagram: "https://www.instagram.com/cris.araozz/" },
      { name: "Mirutaki", lat: -34.5776241, lng: -58.4325179, instagram: "https://www.instagram.com/cris.araozz/" },
      { name: "Montañeses Restaurante", lat: -34.5757392, lng: -58.4632838, instagram: "https://www.instagram.com/cris.araozz/"},
    ];

    // Función para crear los marcadores en el mapa
    function setMarkers(map: google.maps.Map) {
      const image = {
        url: "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png",
        //url: logoFlag,
        size: new window.google.maps.Size(20, 32),
        origin: new window.google.maps.Point(0, 0),
        anchor: new window.google.maps.Point(0, 32),
      };

      const shape = {
        coords: [1, 1, 1, 20, 18, 20, 18, 1],
        type: "poly",
      };

      locations.forEach((location) => {
        const marker = new window.google.maps.Marker({
          position: { lat: location.lat, lng: location.lng },
          map,
          icon: image,
          shape: shape,
          title: location.name,
          zIndex: 4,
        });

        // Agregar evento de clic al marcador
        window.google.maps.event.addListener(marker, "click", () => {
          const geocoder = new window.google.maps.Geocoder();
          geocoder.geocode(
            { location: marker.getPosition() },
            (results: any, status: any) => {
              if (status === "OK") {
                if (results[0]) {
                  const content = `
                    <div>
                      <h3>${location.name}</h3>
                      <p>${results[0].formatted_address}</p>
                      <a href="${location.instagram}" target="_blank">Ir a Mappu Reseña</a>
                    </div>
                  `;

                  const infoWindow = new window.google.maps.InfoWindow({
                    content: content,
                  });

                  infoWindow.open(map, marker);
                } else {
                  console.log("No se encontraron resultados");
                }
              } else {
                console.log("Error en la geocodificación:", status);
              }
            }
          );
        });
      });
    }

    // Verifica si la API de Google Maps ya está cargada
    if (window.google && window.google.maps) {
      initMap();
    } else {
      // Si la API no está cargada, se agrega un evento al objeto window para ejecutar initMap cuando esté disponible
      window.initMap = initMap;

      // Carga asíncrona de la API de Google Maps
      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyDtFHRx9vk1O6bGH2G8J-aR16qBdYPV41k&callback=initMap`;
      script.defer = true;
      script.async = true;

      document.head.appendChild(script);
    }
  }, []);

  return <div id="map" className={styles.mapContainer}></div>;
}

export default Map;
