"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  ZoomableGroup,
} from "react-simple-maps";
import { mapPins, type MapPin } from "@/lib/mapPins";

const GEO_URL = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

export default function MapPage() {
  const [selectedPin, setSelectedPin] = useState<MapPin | null>(null);
  const [loadError, setLoadError] = useState(false);
  const [mapCenter, setMapCenter] = useState<[number, number]>([20, 10]);
  const [mapZoom, setMapZoom] = useState(1);

  return (
    <main className="px-6 py-10 max-w-5xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#48BB78] mb-2">
          Cultural World Map
        </p>
        <h1 className="text-4xl font-extrabold text-[#1A3A2A] tracking-tight mb-2">
          Bugs on the Menu 🗺️
        </h1>
        <p className="text-[#1A3A2A]/60 text-sm">
          2 billion people eat insects regularly. Tap a pin to see what&apos;s cooking.
        </p>
      </div>

      {/* Map */}
      <div className="bg-white rounded-3xl overflow-hidden shadow-sm mb-6 relative">
        {loadError ? (
          <div className="flex flex-col items-center justify-center h-64 text-center px-6">
            <div className="text-4xl mb-3">🌍</div>
            <p className="text-[#1A3A2A]/60 text-sm">
              Map couldn&apos;t load. Check your connection and try again.
            </p>
          </div>
        ) : (
          <ComposableMap
            projection="geoMercator"
            projectionConfig={{ scale: 130, center: [20, 10] }}
            style={{ width: "100%", height: "420px" }}
          >
            <ZoomableGroup center={mapCenter} zoom={mapZoom} onMoveEnd={({ coordinates, zoom }: { coordinates: [number, number]; zoom: number }) => { setMapCenter(coordinates); setMapZoom(zoom); }}>
              <Geographies geography={GEO_URL}>
                {({ geographies }: { geographies: { rsmKey: string }[] }) =>
                  geographies.map((geo) => (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      fill="#C6F6D5"
                      stroke="#F0FFF4"
                      strokeWidth={0.5}
                      style={{
                        default: { outline: "none" },
                        hover: { fill: "#9AE6B4", outline: "none" },
                        pressed: { outline: "none" },
                      }}
                    />
                  ))
                }
              </Geographies>

              {mapPins.map((pin) => (
                <Marker
                  key={pin.id}
                  coordinates={pin.coordinates}
                  onClick={() => {
                    setSelectedPin(pin);
                    setMapCenter(pin.coordinates);
                    setMapZoom(4);
                  }}
                >
                  <motion.g
                    whileHover={{ scale: 1.3 }}
                    whileTap={{ scale: 0.95 }}
                    style={{ cursor: "pointer" }}
                  >
                    <circle
                      r={10}
                      fill={selectedPin?.id === pin.id ? "#1A3A2A" : "white"}
                      stroke="#48BB78"
                      strokeWidth={2}
                    />
                    <text
                      textAnchor="middle"
                      dominantBaseline="central"
                      fontSize={10}
                    >
                      {pin.emoji}
                    </text>
                  </motion.g>
                </Marker>
              ))}
            </ZoomableGroup>
          </ComposableMap>
        )}

        <p className="text-[10px] text-[#1A3A2A]/30 text-center pb-2">
          Scroll to zoom · Drag to pan · Tap a pin to explore
        </p>
      </div>

      {/* Pin card */}
      <AnimatePresence>
        {selectedPin && (
          <motion.div
            key={selectedPin.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-3xl p-6 shadow-sm"
          >
            <div className="flex items-start justify-between gap-4 mb-4">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-[#C6F6D5] flex items-center justify-center text-3xl flex-shrink-0">
                  {selectedPin.emoji}
                </div>
                <div>
                  <p className="text-xs font-semibold tracking-[0.15em] uppercase text-[#48BB78] mb-0.5">
                    {selectedPin.region}
                  </p>
                  <h2 className="text-2xl font-extrabold text-[#1A3A2A] tracking-tight">
                    {selectedPin.dish}
                  </h2>
                  <p className="text-sm text-[#1A3A2A]/60">{selectedPin.insect}</p>
                </div>
              </div>
              <button
                onClick={() => {
                setSelectedPin(null);
                setMapCenter([20, 10]);
                setMapZoom(1);
              }}
                className="text-[#1A3A2A]/30 hover:text-[#1A3A2A] text-xl font-bold transition-colors flex-shrink-0"
              >
                ×
              </button>
            </div>

            <p className="text-sm text-[#1A3A2A]/80 leading-relaxed mb-4">
              {selectedPin.description}
            </p>

            <div className="bg-[#F0FFF4] rounded-2xl px-4 py-3">
              <p className="text-xs font-semibold text-[#48BB78] uppercase tracking-wider mb-1">
                Cultural Context
              </p>
              <p className="text-xs text-[#1A3A2A]/70 leading-relaxed">
                {selectedPin.culturalContext}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Pin list (mobile fallback + quick nav) */}
      {!selectedPin && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2"
        >
          {mapPins.map((pin) => (
            <button
              key={pin.id}
              onClick={() => {
                    setSelectedPin(pin);
                    setMapCenter(pin.coordinates);
                    setMapZoom(4);
                  }}
              className="bg-white rounded-2xl p-3 text-left hover:shadow-md transition-all hover:-translate-y-0.5 shadow-sm"
            >
              <div className="text-2xl mb-1">{pin.emoji}</div>
              <p className="text-xs font-bold text-[#1A3A2A] leading-tight">{pin.dish}</p>
              <p className="text-[10px] text-[#1A3A2A]/50">{pin.country}</p>
            </button>
          ))}
        </motion.div>
      )}
    </main>
  );
}
