"use client";

import { MapContainer, TileLayer, Marker, useMapEvents, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Icon } from "leaflet";
import { useEffect, useState } from "react";
import { MOCK_EVENTS } from "@/lib/data";
import { useEventStore } from "@/lib/store";

// Fix for default Leaflet icons not loading
const icon = new Icon({
    iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
    shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
});

// Component to handle map clicks for selection
function MapEvents() {
    const { setSelectedEvent } = useEventStore();
    useMapEvents({
        click: () => setSelectedEvent(null), // Deselect on background click
    });
    return null;
}

export default function Map() {
    const [isMounted, setIsMounted] = useState(false);
    const { setSelectedEvent, selectedEventId } = useEventStore();

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return <div className="h-full w-full bg-muted animate-pulse" />;
    }

    return (
        <MapContainer
            center={[40.73061, -73.935242]} // NYC center
            zoom={12}
            zoomControl={false} // Hide default zoom control for cleaner look
            scrollWheelZoom={true}
            className="h-full w-full z-0"
        >
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
            />
            <MapEvents />
            {MOCK_EVENTS.map((event) => (
                <Marker
                    key={event.id}
                    position={event.coordinates}
                    icon={icon}
                    eventHandlers={{
                        click: (e) => {
                            e.originalEvent.stopPropagation();
                            setSelectedEvent(event.id);
                        },
                    }}
                    opacity={selectedEventId && selectedEventId !== event.id ? 0.6 : 1}
                />
            ))}
        </MapContainer>
    );
}
