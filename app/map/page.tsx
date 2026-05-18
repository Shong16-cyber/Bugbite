"use client";

import { useState } from "react";
import Image from "next/image";
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

  const openPin = (pin: MapPin) => {
    setSelectedPin(pin);
    setMapCenter(pin.coordinates);
    setMapZoom(4);
  };

  const closePin = () => {
    setSelectedPin(null);
    setMapCenter([20, 10]);
    setMapZoom(1);
  };

  return (
    <div className="relative">
      {/* Header — constrained width */}
      <div className="max-w-5xl mx-auto px-6 pt-10 pb-4 flex items-center gap-6">
        <Image src="/icons/bug_worldmap.svg" alt="" width={100} height={100} className="object-contain flex-shrink-0 drop-shadow-sm" />
        <div>
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#2A7D50] mb-2">
            Cultural World Map
          </p>
          <h1 className="text-4xl font-extrabold text-[#0D2B19] tracking-tight mb-1">
            Bugs on the Menu
          </h1>
          <p className="text-[#0D2B19]/60 text-sm">
            2 billion people eat insects regularly. Tap a pin to see what&apos;s cooking.
          </p>
        </div>
      </div>

      {/* Map — full viewport width */}
      <div className="w-full bg-white border-y border-[#C8E2D4] relative">
        {loadError ? (
          <div className="flex flex-col items-center justify-center h-64 text-center px-6">
            <div className="text-4xl mb-3">🌍</div>
            <p className="text-[#0D2B19]/60 text-sm">
              Map couldn&apos;t load. Check your connection and try again.
            </p>
          </div>
        ) : (
          <ComposableMap
            projection="geoMercator"
            projectionConfig={{ scale: 160, center: [20, 10] }}
            style={{ width: "100%", height: "520px" }}
          >
            <ZoomableGroup
              center={mapCenter}
              zoom={mapZoom}
              onMoveEnd={({ coordinates, zoom }) => {
                setMapCenter(coordinates);
                setMapZoom(zoom);
              }}
            >
              <Geographies geography={GEO_URL}>
                {({ geographies }) =>
                  geographies.map((geo) => (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      fill="#C6F6D5"
                      stroke="#FAFFF7"
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
                  onClick={() => openPin(pin)}
                >
                  <motion.g
                    whileHover={{ scale: 1.3 }}
                    whileTap={{ scale: 0.95 }}
                    style={{ cursor: "pointer" }}
                  >
                    <circle
                      r={10}
                      fill={selectedPin?.id === pin.id ? "#0D2B19" : "white"}
                      stroke="#2A7D50"
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
        <p className="text-[10px] text-[#0D2B19]/30 text-center py-2">
          Scroll to zoom · Drag to pan · Tap a pin to explore
        </p>

        {/* Side panel — slides in over map, no backdrop */}
        <AnimatePresence>
          {selectedPin && (
            <motion.div
              key={selectedPin.id}
              initial={{ x: "100%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: "100%", opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="absolute top-0 right-0 h-full w-full sm:w-[360px] bg-[#FAFFF7]/95 backdrop-blur-md border-l border-[#C8E2D4] shadow-xl flex flex-col"
            >
              {/* Close */}
              <button
                onClick={closePin}
                className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-[#0D2B19]/10 hover:bg-[#0D2B19]/20 text-[#0D2B19] text-lg font-bold transition-colors"
              >
                ×
              </button>

              <div className="p-6 flex flex-col gap-4 overflow-y-auto">
                {/* Icon + region + title */}
                <div className="flex items-center gap-4 pt-2">
                  <div className="w-16 h-16 rounded-2xl bg-[#EEF7F2] flex items-center justify-center text-4xl flex-shrink-0">
                    {selectedPin.emoji}
                  </div>
                  <div>
                    <p className="text-xs font-semibold tracking-[0.15em] uppercase text-[#2A7D50] mb-0.5">
                      {selectedPin.region}
                    </p>
                    <h2 className="text-2xl font-extrabold text-[#0D2B19] tracking-tight leading-tight">
                      {selectedPin.dish}
                    </h2>
                    <p className="text-sm text-[#0D2B19]/60">{selectedPin.insect}</p>
                  </div>
                </div>

                {/* Description */}
                <p className="text-sm text-[#0D2B19]/80 leading-relaxed">
                  {selectedPin.description}
                </p>

                {/* Cultural context */}
                <div className="bg-white border border-[#C8E2D4] rounded-xl px-4 py-3">
                  <p className="text-xs font-semibold text-[#2A7D50] uppercase tracking-wider mb-1">
                    Cultural Context
                  </p>
                  <p className="text-xs text-[#0D2B19]/70 leading-relaxed">
                    {selectedPin.culturalContext}
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Pin grid — constrained width, below map */}
      <div className="max-w-5xl mx-auto px-6 py-8">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {mapPins.map((pin) => (
            <button
              key={pin.id}
              onClick={() => openPin(pin)}
              className={`bg-white border rounded-2xl p-4 text-left hover:shadow-md hover:-translate-y-0.5 transition-all ${
                selectedPin?.id === pin.id
                  ? "border-[#2A7D50] ring-1 ring-[#2A7D50]"
                  : "border-[#C8E2D4]"
              }`}
            >
              <div className="text-2xl mb-2">{pin.emoji}</div>
              <p className="text-sm font-bold text-[#0D2B19] leading-tight mb-0.5">{pin.dish}</p>
              <p className="text-xs text-[#0D2B19]/50">{pin.country}</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
