"use client";

import { useEffect, useRef, useState } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";

interface MapViewProps {
  boundaries: GeoJSON.FeatureCollection;
  facilityPoints: GeoJSON.FeatureCollection;
  wardScores: Record<string, number>;
  onWardClick: (wardCode: string) => void;
  selectedWardId: string | null;
}

function getPGSColor(pgs: number): string {
  if (pgs >= 0.7) return "#dc2626";
  if (pgs >= 0.5) return "#fdba74";
  if (pgs >= 0.3) return "#86efac";
  return "#bbf7d0";
}

function buildMatchExpression(wardScores: Record<string, number>): any[] {
  const entries = Object.entries(wardScores).flatMap(([k, v]) => [k, getPGSColor(v)]);
  return ["match", ["get", "ward_code"], ...entries, "#e7e5e4"];
}

export default function MapView({
  boundaries,
  facilityPoints,
  wardScores,
  onWardClick,
  selectedWardId,
}: MapViewProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<maplibregl.Map | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    const map = new maplibregl.Map({
      container: containerRef.current,
      style: {
        version: 8,
        sources: {
          "osm-tiles": {
            type: "raster",
            tiles: ["https://tile.openstreetmap.org/{z}/{x}/{y}.png"],
            tileSize: 256,
            attribution: "&copy; OpenStreetMap contributors",
          },
        },
        layers: [
          {
            id: "osm-tiles-layer",
            type: "raster",
            source: "osm-tiles",
            minzoom: 0,
            maxzoom: 19,
          },
        ],
      },
      center: [36.82, -1.28],
      zoom: 11,
    });

    map.on("load", () => {
      mapRef.current = map;

      map.addSource("wards", {
        type: "geojson",
        data: boundaries as any,
      });

      map.addLayer({
        id: "wards-fill",
        type: "fill",
        source: "wards",
        paint: {
          "fill-color": [
            "case",
            ["boolean", ["==", ["get", "ward_code"], selectedWardId ?? ""], false],
            "#a3e635",
            buildMatchExpression(wardScores),
          ] as any,
          "fill-opacity": 0.6,
        },
      });

      map.addLayer({
        id: "wards-outline",
        type: "line",
        source: "wards",
        paint: {
          "line-color": "#44403c",
          "line-width": 1,
        },
      });

      map.addSource("facilities", {
        type: "geojson",
        data: facilityPoints as any,
      });

      map.addLayer({
        id: "facilities-points",
        type: "circle",
        source: "facilities",
        paint: {
          "circle-radius": 4,
          "circle-color": "#78716c",
          "circle-stroke-width": 1,
          "circle-stroke-color": "#fff",
        },
      });

      map.on("click", "wards-fill", (e) => {
        if (e.features && e.features[0]?.properties?.ward_code) {
          onWardClick(e.features[0].properties.ward_code);
        }
      });

      map.on("mouseenter", "wards-fill", () => {
        map.getCanvas().style.cursor = "pointer";
      });

      map.on("mouseleave", "wards-fill", () => {
        map.getCanvas().style.cursor = "";
      });

      setReady(true);
    });

    return () => {
      map.remove();
      mapRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const map = mapRef.current;
    if (!map || !map.isStyleLoaded()) return;

    const source = map.getSource("wards") as maplibregl.GeoJSONSource;
    if (source) source.setData(boundaries as any);

    map.setPaintProperty("wards-fill", "fill-color", [
      "case",
      ["boolean", ["==", ["get", "ward_code"], selectedWardId ?? ""], false],
      "#a3e635",
      buildMatchExpression(wardScores),
    ] as any);
  }, [wardScores, selectedWardId, boundaries]);

  return (
    <div className="relative min-h-[400px] w-full overflow-hidden rounded-xl border border-neutral-200">
      <div ref={containerRef} className="h-[500px] w-full md:h-[600px]" aria-label="Map of Nairobi wards with health equity data" role="application" />
      {!ready && (
        <div className="absolute inset-0 flex items-center justify-center bg-neutral-50 text-sm text-neutral-500">
          Loading map...
        </div>
      )}
    </div>
  );
}
