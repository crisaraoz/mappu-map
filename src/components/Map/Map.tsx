/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from "react";
import styles from "./Map.module.scss";
import flagJapon from "../../assets/japon1.png";
import flagKorea from "../../assets/korea1.png";
import flagChina from "../../assets/china1.png";

interface Location {
  name: string;
  country: string;
  lat: number;
  lng: number;
  instagram: string;
  flag: string;
  color: string;
}
interface MapProps {
  selectedLocation: string | null;
}
declare global {
  interface Window {
    google: any;
    initMap: () => void;
  }
}

function Map({ selectedLocation }: MapProps) {

  useEffect(() => {
    function initMap() {
      if (typeof window !== "undefined") {
        const map = new window.google.maps.Map(document.getElementById("map"), {
          zoom: 12.8,
          center: { lat: -34.6000, lng: -58.4393 },
        });

        setMarkers(map);
      }
    }

    const locations: Location[] = [
      { name: "Mappu dev", country: "Korea",lat: -34.608230271063675, lng: -58.450628311087975, instagram: "https://www.instagram.com/cris.araozz/", flag: flagKorea, color: "blue-dot" },
      { name: "KBBQ Parrilla", country: "Korea",lat: -34.5930797, lng: -58.4553429, instagram: "https://www.instagram.com/cris.araozz/", flag: flagKorea, color: "blue-dot" },
      { name: "Barrio Chino", country: "China",lat: -34.5775, lng: -58.438, instagram: "https://www.instagram.com/cris.araozz/", flag: flagKorea, color: "green-dot" },
      { name: "Mirutaki", country: "Japon",lat: -34.5776241, lng: -58.4325179, instagram: "https://www.instagram.com/cris.araozz/", flag: flagJapon, color: "red-dot" },
      { name: "Nueva Casa Japonesa", country: "Japon",lat: -34.6218913, lng: -58.3989718, instagram: "https://www.instagram.com/cris.araozz/", flag: flagJapon, color: "red-dot" },
      { name: "Montañeses Restaurante", country: "China",lat: -34.5757392, lng: -58.4632838, instagram: "https://www.instagram.com/cris.araozz/", flag: flagChina, color: "green-dot" },
    ];
    
    function setMarkers(map: google.maps.Map) {
      const shape = {
        coords: [1, 1, 1, 20, 18, 20, 18, 1],
        type: "poly",
      };

      locations.forEach((location) => {
        if (selectedLocation === null || selectedLocation === 'all' || location.country.toLowerCase() === selectedLocation.toLowerCase()) {
          let iconUrl;

          switch (location.color) {
            case "red-dot":
              iconUrl = "http://maps.google.com/mapfiles/ms/micons/red-dot.png";
              break;
            case "blue-dot":
              iconUrl = "http://maps.google.com/mapfiles/ms/micons/blue-dot.png";
              break;
            case "green-dot":
              iconUrl = "http://maps.google.com/mapfiles/ms/micons/green-dot.png";
              break;
            default:
              iconUrl = "http://maps.google.com/mapfiles/ms/micons/red-dot.png";
              break;
          }

          const marker = new window.google.maps.Marker({
            position: { lat: location.lat, lng: location.lng },
            map,
            icon: iconUrl,
            shape: shape,
            title: location.name,
            zIndex: 4,
          });

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
                        <a href="${location.instagram}" target="_blank" style="color: #ff1100">Ir a Mappu Reseña</a>
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
        }
      });
    }

    if (window.google && window.google.maps) {
      initMap();
    } else {
      window.initMap = initMap;
      const existingScript = document.getElementById("googleMapsScript");
      if (!existingScript) {
        const script = document.createElement("script");
        script.src = `https://maps.googleapis.com/maps/api/js?key=${import.meta.env.VITE_APP_GOOGLE_MAPS_API_KEY}&callback=initMap`;
        script.defer = true;
        script.async = true;

        document.head.appendChild(script);
      }
    }
  }, [selectedLocation]);

  return <div id="map" className={styles.mapContainer}></div>;
}

export default Map;
