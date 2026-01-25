"use client";

import dynamic from "next/dynamic";

const EventMap = dynamic(() => import("./Map/EventMap"), {
    ssr: false,
    loading: () => <div className="h-screen w-full bg-muted animate-pulse" />
});

export default function MapWrapper() {
    return <EventMap />;
}
