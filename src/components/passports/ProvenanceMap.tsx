'use client';

import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Custom Minimal Marker
const createCustomIcon = (isActive: boolean, primaryColor: string = "#a87963") => {
  return L.divIcon({
    className: "custom-marker",
    html: `<div style="
      background-color: ${isActive ? primaryColor : '#fff'};
      border: 2px solid ${primaryColor};
      width: 16px;
      height: 16px;
      border-radius: 50%;
      box-shadow: 0 2px 4px rgba(0,0,0,0.2);
      transition: all 0.3s ease;
      transform: ${isActive ? 'scale(1.5)' : 'scale(1)'};
    "></div>`,
    iconSize: [16, 16],
    iconAnchor: [8, 8],
    popupAnchor: [0, -10]
  });
};

interface Location {
  id: number;
  title: string;
  coords: [number, number];
  description: string;
  date: string;
  phase: string;
}

// Step format from ProductSpec
interface Step {
  name: string;
  role: string;
  city: string;
  country: string;
  lat: number;
  lon: number;
}

interface ProvenanceMapProps {
  locations?: Location[];
  steps?: Step[]; // Alternative: pass steps directly
  title?: string;
  primaryColor?: string;
}

// Convert steps to locations format
function stepsToLocations(steps: Step[]): Location[] {
  return steps.map((step, i) => ({
    id: i + 1,
    title: step.name,
    coords: [step.lat, step.lon] as [number, number],
    description: `${step.role} in ${step.city}, ${step.country}`,
    date: "",
    phase: `0${i + 1}. ${step.role}`
  }));
}

const DEFAULT_LOCATIONS: Location[] = [
  {
    id: 1,
    title: "Clay Harvesting",
    coords: [34.9083, 136.0833],
    description: "Raw clay harvested from the ancient lake bed of Lake Biwa.",
    date: "2024.09.12",
    phase: "01. Source"
  },
  {
    id: 2,
    title: "Wedging & Shaping",
    coords: [34.9500, 135.7500],
    description: "Clay is wedged to remove air pockets and shaped on the kick-wheel.",
    date: "2024.09.28",
    phase: "02. Form"
  },
  {
    id: 3,
    title: "Anagama Firing",
    coords: [35.0116, 135.7681],
    description: "Fired for 72 hours in a wood-burning kiln to achieve natural ash glaze.",
    date: "2024.10.14",
    phase: "03. Fire"
  },
  {
    id: 4,
    title: "Final Inspection",
    coords: [35.6762, 139.6503],
    description: "Quality check and certification at the Earthen Gallery.",
    date: "2024.11.01",
    phase: "04. Certify"
  }
];

// Component to handle map movement
const MapController = ({ center }: { center: [number, number] }) => {
  const map = useMap();
  useEffect(() => {
    map.flyTo(center, map.getZoom(), {
      animate: true,
      duration: 1.5
    });
  }, [center, map]);
  return null;
};

export default function ProvenanceMap({ 
  locations, 
  steps,
  title = "Provenance Map",
  primaryColor = "#a87963"
}: ProvenanceMapProps) {
  // Use steps if provided, otherwise use locations, otherwise use defaults
  const resolvedLocations = steps ? stepsToLocations(steps) : (locations || DEFAULT_LOCATIONS);
  const [activeLocation, setActiveLocation] = useState<Location>(resolvedLocations[0]);

  return (
    <div className="w-full h-[600px] flex flex-col md:flex-row bg-stone-50 border-y border-stone-200">
      {/* Sidebar Info */}
      <div className="w-full md:w-1/3 p-8 md:p-12 flex flex-col justify-center bg-stone-50 z-10 shadow-xl md:shadow-none">
        <div className="mb-8">
          <span className="text-xs font-bold tracking-widest uppercase mb-2 block" style={{ color: primaryColor }}>
            Journey Tracker
          </span>
          <h2 className="font-serif text-3xl md:text-4xl text-stone-900">{title}</h2>
        </div>

        <div className="space-y-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeLocation.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-center gap-3 mb-2 text-xs font-bold uppercase tracking-widest" style={{ color: primaryColor }}>
                <span>{activeLocation.phase}</span>
                <span className="w-8 h-[1px]" style={{ backgroundColor: `${primaryColor}50` }}></span>
                <span>{activeLocation.date}</span>
              </div>
              <h3 className="font-serif text-2xl mb-4 text-stone-900">{activeLocation.title}</h3>
              <p className="text-stone-600 leading-relaxed text-sm">
                {activeLocation.description}
              </p>
              <div className="mt-6 font-mono text-xs text-stone-400">
                LAT: {activeLocation.coords[0]}° N <br />
                LNG: {activeLocation.coords[1]}° E
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Timeline Navigation */}
        <div className="mt-12 flex gap-2">
          {resolvedLocations.map((loc) => (
            <button
              key={loc.id}
              onClick={() => setActiveLocation(loc)}
              className="h-1.5 rounded-full transition-all duration-300"
              style={{
                width: activeLocation.id === loc.id ? 32 : 8,
                backgroundColor: activeLocation.id === loc.id ? primaryColor : '#d1d5db'
              }}
              aria-label={`Go to ${loc.title}`}
            />
          ))}
        </div>
      </div>

      {/* Map */}
      <div className="w-full md:w-2/3 h-full relative grayscale-[0.8] sepia-[0.2] contrast-[0.9]">
        <MapContainer 
          center={activeLocation.coords} 
          zoom={8} 
          scrollWheelZoom={false} 
          className="w-full h-full z-0"
          style={{ background: '#fafaf9' }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
          />
          <MapController center={activeLocation.coords} />
          
          {resolvedLocations.map((loc) => (
            <Marker 
              key={loc.id} 
              position={loc.coords}
              icon={createCustomIcon(activeLocation.id === loc.id, primaryColor)}
              eventHandlers={{
                click: () => setActiveLocation(loc),
              }}
            />
          ))}
        </MapContainer>
        
        {/* Overlay Gradient for seamless integration */}
        <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-stone-50 to-transparent z-[400] pointer-events-none hidden md:block" />
      </div>
      
      {/* CSS Injection for custom marker */}
      <style>{`
        .leaflet-container {
          font-family: ui-sans-serif, system-ui, sans-serif;
        }
      `}</style>
    </div>
  );
}

