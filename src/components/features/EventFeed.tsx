"use client";

import { useEventStore } from "@/lib/store";
import { EventCard } from "./EventCard";

export function EventFeed() {
    const { events, filter } = useEventStore();

    const filteredEvents = events.filter((event) => {
        if (filter === "All") return true;
        return event.type === filter || event.vibe.some(v => v.includes(filter));
    });

    return (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredEvents.map((event) => (
                <EventCard key={event.id} event={event} />
            ))}
        </div>
    );
}
