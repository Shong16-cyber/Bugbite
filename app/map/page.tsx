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
      {/* Header */}
      <div className="max-w-5xl mx-auto px-6 pt-8 pb-6 flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6 text-center sm:text-left">
        <Image
          src="/icons/bug_worldmap.svg"
          alt=""
          width={88}
          height={88}
          className="object-contain flex-shrink-0 drop-shadow-sm"
        />
        <div>
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#2A7D50] mb-2">
            Cultural World Map
          </p>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0D2B19] tracking-tight mb-1">
            Bugs on the Menu
          </h1>
          <p className="text-[#0D2B19]/60 text-sm">
            2 billion people eat insects regularly. Tap a pin to see what&apos;s cooking.
          </p>
        </div>
      </div>

      {/* Map — full viewport width */}
      <div className="w-full bg-white border-y border-[#C8E2D4] relative overflow-hidden">
        {loadError ? (
          <div className="flex flex-col items-center justify-center h-64 text-center px-6">
            <div className="text-4xl mb-3">🌍</div>
            <p className="text-[#0D2B19]/60 text-sm">
              Map couldn&apos;t load. Check your connection and try again.
            </p>
          </div>
        ) : (
          <>
            <ComposableMap
              projection="geoMercator"
              projectionConfig={{ scale: 160, center: [20, 10] }}
              style={{ width: "100%", height: "auto" }}
              className="h-[260px] sm:h-[400px] md:h-[520px]"
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
            <p className="text-[10px] text-[#0D2B19]/30 text-center py-2">
              Scroll to zoom · Drag to pan · Tap a pin to explore
            </p>
          </>
        )}

        {/* Desktop side panel — slides in from right */}
        <AnimatePresence>
          {selectedPin && (
            <motion.div
              key={`desktop-${selectedPin.id}`}
              initial={{ x: "100%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: "100%", opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="hidden sm:flex absolute top-0 right-0 h-full w-[340px] bg-[#FAFFF7]/95 backdrop-blur-md border-l border-[#C8E2D4] shadow-xl flex-col"
            >
              <PinDetail pin={selectedPin} onClose={closePin} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Mobile bottom sheet — rendered outside map div so it can be fixed */}
      <AnimatePresence>
        {selectedPin && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="sm:hidden fixed inset-0 bg-[#0D2B19]/20 z-40"
              onClick={closePin}
            />
            {/* Sheet */}
            <motion.div
              key={`mobile-${selectedPin.id}`}
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="sm:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#FAFFF7] rounded-t-3xl border-t border-[#C8E2D4] shadow-2xl max-h-[65vh] flex flex-col"
            >
              {/* Drag handle */}
              <div className="flex justify-center pt-3 pb-1">
                <div className="w-10 h-1 bg-[#0D2B19]/20 rounded-full" />
              </div>
              <div className="overflow-y-auto flex-1">
                <PinDetail pin={selectedPin} onClose={closePin} />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Pin grid */}
      <div className="max-w-5xl mx-auto px-6 py-8">
        <h2 className="text-sm font-semibold text-[#0D2B19]/40 uppercase tracking-wider mb-4">
          All Locations
        </h2>
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
              <p className="text-sm font-bold text-[#0D2B19] leading-tight mb-0.5">
                {pin.dish}
              </p>
              <p className="text-xs text-[#0D2B19]/50">{pin.country}</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function PinDetail({ pin, onClose }: { pin: MapPin; onClose: () => void }) {
  return (
    <div className="p-6 flex flex-col gap-4">
      {/* Close */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-[#0D2B19]/10 hover:bg-[#0D2B19]/20 text-[#0D2B19] text-lg font-bold transition-colors"
      >
        ×
      </button>

      {/* Icon + region + title */}
      <div className="flex items-center gap-4 pt-2 pr-10">
        <div className="w-16 h-16 rounded-2xl bg-[#EEF7F2] flex items-center justify-center text-4xl flex-shrink-0">
          {pin.emoji}
        </div>
        <div>
          <p className="text-xs font-semibold tracking-[0.15em] uppercase text-[#2A7D50] mb-0.5">
            {pin.region}
          </p>
          <h2 className="text-xl sm:text-2xl font-extrabold text-[#0D2B19] tracking-tight leading-tight">
            {pin.dish}
          </h2>
          <p className="text-sm text-[#0D2B19]/60">{pin.insect}</p>
        </div>
      </div>

      {/* Description */}
      <p className="text-sm text-[#0D2B19]/80 leading-relaxed">
        {pin.description}
      </p>

      {/* Cultural context */}
      <div className="bg-white border border-[#C8E2D4] rounded-xl px-4 py-3">
        <p className="text-xs font-semibold text-[#2A7D50] uppercase tracking-wider mb-1">
          Cultural Context
        </p>
        <p className="text-xs text-[#0D2B19]/70 leading-relaxed">
          {pin.culturalContext}
        </p>
      </div>
    </div>
  );
}
