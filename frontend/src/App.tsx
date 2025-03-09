import { useState } from "react";
import "./App.css";
import LocationInput from "./components/LocationInput";
import InfoModal from "./components/InfoModal";

function App() {
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);
  const [showInfoModal, setShowInfoModal] = useState(false);

  const handleLocationSelect = (location: string) => {
    setSelectedLocation(location);
  };

  return (
    <div className="app-container">
      <button className="info-button" onClick={() => setShowInfoModal(true)}>ℹ️</button>

      <h1>Weather App - Arnav Balaji</h1>
      <LocationInput onLocationSelect={handleLocationSelect} />
      

      {showInfoModal && <InfoModal onClose={() => setShowInfoModal(false)} />}
    </div>
  );
}

export default App;
