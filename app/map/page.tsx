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
  const [mapZoom, setMapZoom] = useState(1.4);

  const MIN_ZOOM = 1;
  const MAX_ZOOM = 8;

  const openPin = (pin: MapPin) => {
    setSelectedPin(pin);
    // Zoom in on the pin. Offset center east by ~15° so the pin sits in the
    // left half of the map, clear of the 420px right-side detail panel.
    setMapCenter([pin.coordinates[0] + 15, pin.coordinates[1]]);
    setMapZoom(3);
  };

  const closePin = () => {
    setSelectedPin(null);
    setMapCenter([20, 10]);
    setMapZoom(1.4);
  };

  const zoomIn = () => setMapZoom((z) => Math.min(z * 2, MAX_ZOOM));
  const zoomOut = () => setMapZoom((z) => Math.max(z / 2, MIN_ZOOM));
  const resetZoom = () => {
    setMapCenter([20, 10]);
    setMapZoom(1.4);
  };

  return (
    <div className="relative">
      <section className="h-[calc(100vh-80px)] sm:h-[calc(100vh-88px)] flex flex-col">
        {/* Header */}
        <div className="max-w-5xl mx-auto w-full px-6 pt-10 pb-6 shrink-0 flex items-center gap-6">
          <Image
            src="/icons/bug_worldmap.svg"
            alt=""
            width={96}
            height={96}
            className="object-contain flex-shrink-0 drop-shadow-sm"
          />
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

        {/* Map — fills the rest of the first screen */}
        <div className="w-full flex-1 min-h-[360px] bg-[#F4FAF7] border-y border-[#C8E2D4] relative overflow-hidden flex flex-col">
          {loadError ? (
            <div className="flex flex-col items-center justify-center flex-1 text-center px-6">
              <div className="text-4xl mb-3">🌍</div>
              <p className="text-[#0D2B19]/60 text-sm">
                Map couldn&apos;t load. Check your connection and try again.
              </p>
            </div>
          ) : (
            <>
              <div className="relative flex-1 min-h-0">
                <ComposableMap
                  projection="geoMercator"
                  projectionConfig={{ scale: 160, center: [20, 10] }}
                  style={{ width: "100%", height: "100%" }}
                >
                  <ZoomableGroup
                    center={mapCenter}
                    zoom={mapZoom}
                    onMoveEnd={({ coordinates, zoom }: { coordinates: [number, number]; zoom: number }) => {
                      setMapCenter(coordinates);
                      setMapZoom(zoom);
                    }}
                  >
                    <Geographies geography={GEO_URL}>
                      {({ geographies }: { geographies: { rsmKey: string }[] }) =>
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

                    {[...mapPins]
                      .sort((a, b) => {
                        // Render the selected pin last so its enlarged circle
                        // paints on top of its neighbors.
                        if (selectedPin?.id === a.id) return 1;
                        if (selectedPin?.id === b.id) return -1;
                        return 0;
                      })
                      .map((pin) => {
                      const clipId = `pin-clip-${pin.id}`;
                      const isSelected = selectedPin?.id === pin.id;

                      return (
                        <Marker
                          key={pin.id}
                          coordinates={pin.coordinates}
                          onClick={() => openPin(pin)}
                        >
                          <motion.g
                            animate={{ scale: isSelected ? 1.9 : 1 }}
                            transition={{ type: "spring", stiffness: 300, damping: 22 }}
                            whileHover={{ scale: isSelected ? 2 : 1.18 }}
                            whileTap={{ scale: isSelected ? 1.8 : 0.95 }}
                            style={{ cursor: "pointer" }}
                          >
                            <defs>
                              <clipPath id={clipId}>
                                <circle r={16} cx={0} cy={0} />
                              </clipPath>
                            </defs>
                            <circle
                              r={18}
                              fill={isSelected ? "#0D2B19" : "#2A7D50"}
                            />
                            <circle r={16} fill="white" />
                            <image
                              href={pin.illustration}
                              x={-16}
                              y={-16}
                              width={32}
                              height={32}
                              clipPath={`url(#${clipId})`}
                              preserveAspectRatio="xMidYMid meet"
                            />
                          </motion.g>
                        </Marker>
                      );
                    })}
                  </ZoomableGroup>
                </ComposableMap>
                {/* Zoom controls */}
                <div className="absolute bottom-4 right-4 flex flex-col gap-1">
                  <motion.button
                    onClick={zoomIn}
                    disabled={mapZoom >= MAX_ZOOM}
                    whileTap={{ scale: 0.9 }}
                    className="w-9 h-9 flex items-center justify-center rounded-xl bg-white border border-[#C8E2D4] shadow-sm text-[#0D2B19] text-lg font-bold hover:bg-[#EEF7F2] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                    aria-label="Zoom in"
                  >
                    +
                  </motion.button>
                  <motion.button
                    onClick={zoomOut}
                    disabled={mapZoom <= MIN_ZOOM}
                    whileTap={{ scale: 0.9 }}
                    className="w-9 h-9 flex items-center justify-center rounded-xl bg-white border border-[#C8E2D4] shadow-sm text-[#0D2B19] text-lg font-bold hover:bg-[#EEF7F2] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                    aria-label="Zoom out"
                  >
                    −
                  </motion.button>
                  {mapZoom > 1 && (
                    <motion.button
                      onClick={resetZoom}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      whileTap={{ scale: 0.9 }}
                      className="w-9 h-9 flex items-center justify-center rounded-xl bg-white border border-[#C8E2D4] shadow-sm text-[#0D2B19] text-[10px] font-semibold hover:bg-[#EEF7F2] transition-colors"
                      aria-label="Reset zoom"
                    >
                      ⌂
                    </motion.button>
                  )}
                </div>
              </div>

              <p className="shrink-0 text-[10px] text-[#0D2B19]/30 text-center py-2">
                <span className="hidden sm:inline">Scroll to zoom · Drag to pan · </span>
                Tap a pin to explore
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
                className="hidden sm:flex absolute top-0 right-0 h-full w-[500px] bg-[#FAFFF7]/95 backdrop-blur-md border-l border-[#C8E2D4] shadow-xl flex-col overflow-y-auto"
              >
                <PinDetail pin={selectedPin} onClose={closePin} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

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
              <Image
                src={pin.illustration}
                alt=""
                width={56}
                height={56}
                className="mb-2 h-14 w-14 object-contain"
              />
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
    <div className="p-6 flex flex-col gap-4 h-full">
      {/* Close */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-[#0D2B19]/10 hover:bg-[#0D2B19]/20 text-[#0D2B19] text-lg font-bold transition-colors z-10"
      >
        ×
      </button>

      {/* Icon + region + title */}
      <div className="flex items-center gap-4 pr-10">
        <div className="w-16 h-16 rounded-2xl bg-white flex items-center justify-center flex-shrink-0 overflow-hidden border border-[#C8E2D4]">
          <Image
            src={pin.illustration}
            alt=""
            width={72}
            height={72}
            className="h-14 w-14 object-contain"
          />
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

      {/* Cultural context — text only */}
      <div className="bg-white border border-[#C8E2D4] rounded-xl px-4 py-3">
        <p className="text-xs font-semibold text-[#2A7D50] uppercase tracking-wider mb-1">
          Cultural Context
        </p>
        <p className="text-xs text-[#0D2B19]/70 leading-relaxed">
          {pin.culturalContext}
        </p>
      </div>

      {/* Scene illustration — fills the entire remaining area edge-to-edge */}
      <div className="-mx-6 -mb-6 flex-1 min-h-0 overflow-hidden border-t border-[#C8E2D4] bg-white">
        <Image
          src={pin.sceneIllustration}
          alt=""
          width={840}
          height={840}
          className="w-full h-full object-cover"
          priority
        />
      </div>
    </div>
  );
}
