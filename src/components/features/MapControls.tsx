"use client";

import { Plus, Minus, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LiquidGlass } from "@/components/ui/liquid-glass";
import { useEventStore } from "@/lib/store";

export function MapControls() {
    return (
        <div className="absolute -top-44 right-4 z-50 flex flex-col gap-2">
            {/* Zoom In Button */}
            <LiquidGlass className="rounded-full shadow-lg">
                <Button
                    onClick={() => useEventStore.getState().triggerZoomIn()}
                    variant="ghost"
                    size="icon"
                    className="h-12 w-12 hover:bg-white/10 text-white"
                    aria-label="Zoom in"
                >
                    <Plus className="h-5 w-5" />
                </Button>
            </LiquidGlass>

            {/* Zoom Out Button */}
            <LiquidGlass className="rounded-full shadow-lg">
                <Button
                    onClick={() => useEventStore.getState().triggerZoomOut()}
                    variant="ghost"
                    size="icon"
                    className="h-12 w-12 hover:bg-white/10 text-white"
                    aria-label="Zoom out"
                >
                    <Minus className="h-5 w-5" />
                </Button>
            </LiquidGlass>

            {/* Locate Me Button */}
            <LiquidGlass className="rounded-full shadow-lg">
                <Button
                    onClick={() => useEventStore.getState().triggerLocate()}
                    variant="ghost"
                    size="icon"
                    className="h-12 w-12 hover:bg-white/10 text-white"
                >
                    <MapPin className="h-5 w-5" />
                    <span className="sr-only">Locate Me</span>
                </Button>
            </LiquidGlass>
        </div>
    );
}