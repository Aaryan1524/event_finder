"use client";

import { useEventStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { X, Calendar, Clock, MapPin } from "lucide-react";
import Link from "next/link";
import { MOCK_EVENTS } from "@/lib/data";

export function SelectedEventCard() {
    const { selectedEventId, setSelectedEvent } = useEventStore();

    if (!selectedEventId) return null;

    const event = MOCK_EVENTS.find(e => e.id === selectedEventId);
    if (!event) return null;

    return (
        <div className="absolute bottom-[28vh] left-4 right-4 z-50 animate-in slide-in-from-bottom-5 fade-in duration-300 pointer-events-none flex justify-center">
            <div className="w-full max-w-[320px] bg-card/95 backdrop-blur-md border text-card-foreground shadow-lg rounded-xl overflow-hidden relative pointer-events-auto">
                <Button
                    variant="ghost"
                    size="icon"
                    className="absolute right-2 top-2 z-10 hover:bg-black/20 text-white rounded-full h-6 w-6"
                    onClick={() => setSelectedEvent(null)}
                >
                    <X className="h-3 w-3" />
                </Button>

                <div className="relative h-28">
                    <img src={event.image} alt={event.title} className="h-full w-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                    <div className="absolute bottom-2 left-3 text-white">
                        <Badge className="mb-1 bg-primary/80 backdrop-blur-sm border-none text-[10px] h-5 px-1.5">{event.type}</Badge>
                        <h3 className="text-sm font-bold leading-tight line-clamp-1">{event.title}</h3>
                    </div>
                </div>

                <div className="p-3 space-y-3">
                    <div className="flex flex-col gap-1 text-xs text-muted-foreground">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-1.5">
                                <Calendar className="h-3 w-3" />
                                <span>{event.date}</span>
                                <span>•</span>
                                <Clock className="h-3 w-3" />
                                <span>{event.time}</span>
                            </div>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <MapPin className="h-3 w-3" />
                            <span className="line-clamp-1">{event.location}</span>
                        </div>
                    </div>

                    <div className="flex items-center justify-between gap-3 pt-1">
                        <div className="flex items-center gap-1.5">
                            <img src={event.host.avatar} alt={event.host.name} className="h-6 w-6 rounded-full object-cover" />
                            <span className="text-xs font-medium text-muted-foreground truncate max-w-[100px]">{event.host.name}</span>
                        </div>
                        <Button className="h-7 text-xs px-3" asChild>
                            <Link href={`/events/${event.id}`}>View</Link>
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
