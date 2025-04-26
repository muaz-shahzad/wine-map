import { MapContainer, GeoJSON } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import wineRegions from "../data/wine-regions.json";
import rivers from "../data/rivers.json";  // Assuming you have rivers data
// import cities from "../data/cities.json";  // No markers for cities

export default function WorldMap() {
  // Random colors array
  const randomColors = ["#ff7f0e", "#2ca02c", "#1f77b4", "#d62728", "#9467bd", "#17becf", "#bcbd22"];

  // Function to get random color
  const getRandomColor = () => {
    return randomColors[Math.floor(Math.random() * randomColors.length)];
  };

  // Region style function
  const regionStyle = (feature: any) => ({
    fillColor: getRandomColor(),
    weight: 1,
    opacity: 1,
    color: "#fff",
    dashArray: "3",
    fillOpacity: 0.7,
  });

  // River style
  const riverStyle = {
    color: "#A3CBE3",
    weight: 2,
  };

  // What happens for each region
  const onEachRegion = (feature: any, layer: any) => {
    // Log the feature properties to ensure the data is correct
    console.log("Feature Properties:", feature.properties);

    // Ensure the name is present
    if (feature.properties && feature.properties.name) {
      console.log(`Binding Popup for ${feature.properties.name}`);
      layer.bindPopup(`<b>${feature.properties.nom}</b><br/>Wine region info here`);
    }

    layer.on({
      click: (e: any) => {
        console.log("Clicked on region", feature.properties.nom);  // Check if click is detected
        e.target.openPopup(); // Open the popup
      },
      mouseover: (e: any) => {
        e.target.setStyle({
          weight: 2,
          color: "#666",
          fillOpacity: 0.9,
        });
      },
      mouseout: (e: any) => {
        e.target.setStyle(regionStyle(feature)); // Reset to normal style
      },
    });
  };

  return (
    <MapContainer center={[46.6034, 1.8883]} zoom={6} style={{ height: "100vh", width: "100%" }}>
      <GeoJSON data={wineRegions as any} style={regionStyle} onEachFeature={onEachRegion} />
      <GeoJSON data={rivers as any} style={riverStyle} />
    </MapContainer>
  );
}
