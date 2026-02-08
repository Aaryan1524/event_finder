"use client";

import {
    Drawer,
    DrawerContent,
    DrawerHeader,
    DrawerTitle,
} from "@/components/ui/drawer";
import { MOCK_EVENTS } from "@/lib/data";
import { EventCard } from "./EventCard";
import { useState } from "react";
import { LiquidGlass } from "@/components/ui/liquid-glass";
import { useEventStore } from "@/lib/store";
import { cn } from "@/lib/utils";
import { MapControls } from "./MapControls";

export function EventsDrawer() {
    const [snap, setSnap] = useState<number | string | null>(0.25);
    const { filter } = useEventStore();

    const filteredEvents = MOCK_EVENTS.filter(event =>
        filter === "All" ? true : event.type === filter
    );

    return (
        <Drawer
            open={true}
            modal={false}
            snapPoints={[0.25, 0.85, 1]}
            activeSnapPoint={snap}
            setActiveSnapPoint={setSnap}
            dismissible={false}
        >
            <DrawerContent showOverlay={false} className="h-full max-h-[96vh] fixed bottom-0 left-0 right-0 z-50 flex flex-col bg-transparent border-none outline-none shadow-none">
                {/* Attached Map Controls */}
                <MapControls />

                <LiquidGlass className="h-full w-full rounded-t-3xl">
                    <div className="flex flex-col h-full">
                        {/* Handle with larger hit area */}
                        <div className="mx-auto w-full flex items-center justify-center py-4 cursor-grab active:cursor-grabbing touch-none">
                            <div className="h-2 w-[80px] rounded-full bg-white/40 backdrop-blur-sm shadow-sm" />
                        </div>
                        <DrawerHeader className="pt-0">
                            <DrawerTitle className="text-white/90">Explore Events</DrawerTitle>
                        </DrawerHeader>
                        <div className="p-8 overflow-y-auto flex-1 pb-32">
                            <div className="grid gap-8 grid-cols-2 sm:grid-cols-3 lg:grid-cols-5">
                                {filteredEvents.map((event) => (
                                    <div key={event.id} className="hover:scale-[1.02] transition-transform duration-300">
                                        <EventCard event={event} />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </LiquidGlass>
            </DrawerContent>
        </Drawer>
    );
}
