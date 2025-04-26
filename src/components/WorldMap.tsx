import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import franceRegions from "../data/france-regions.json";
import rivers from "../data/france-rivers.json";
import { useRef } from "react";

const randomColors = [
  "#e6194b", "#3cb44b", "#ffe119", "#4363d8",
  "#f58231", "#911eb4", "#46f0f0", "#f032e6",
  "#bcf60c", "#fabebe", "#008080", "#e6beff", "#9a6324"
];

const getRandomColor = () => randomColors[Math.floor(Math.random() * randomColors.length)];

export default function WorldMap() {
  const geoJsonRef = useRef<any>(null);

  const onEachRegion = (feature: any, layer: any) => {
    const regionName = feature.properties.nom;  

    layer.bindPopup(`<b>${regionName}</b>`);

    layer.on({
      mouseover: (e: any) => {
        e.target.setStyle({
          weight: 2,
          color: "#666",
          fillOpacity: 0.9,
        });
      },
      mouseout: (e: any) => {
        geoJsonRef.current?.resetStyle(e.target);
      },
      click: () => {
        layer.openPopup();
        console.log('Clicked region:', regionName);
      },
    });
  };

  const regionStyle = (feature: any) => ({
    fillColor: getRandomColor(),
    weight: 1,
    opacity: 1,
    color: "white",
    fillOpacity: 0.6,
  });

  return (
    <MapContainer center={[46.8, 2.5]} zoom={6} style={{ height: "100vh", width: "100%" }}>
      {/* 🔥 Better detailed base map */}
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png"
      />

      {/* 🗺️ Regions Layer */}
      <GeoJSON
        data={franceRegions as any}
        style={regionStyle}
        onEachFeature={onEachRegion}
        ref={geoJsonRef}
      />

      {/* 🌊 Rivers Layer */}
      <GeoJSON
        data={rivers as any}
        style={{ color: "#0077be", weight: 2 }}
      />
    </MapContainer>
  );
}
