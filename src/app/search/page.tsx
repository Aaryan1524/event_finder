"use client";

import { Navbar } from "@/components/features/Navbar";
import { Input } from "@/components/ui/input";
import { Search as SearchIcon } from "lucide-react";
import { EventCard } from "@/components/features/EventCard";
import { MOCK_EVENTS } from "@/lib/data";
import { useState } from "react";

export default function SearchPage() {
    const [query, setQuery] = useState("");

    const filteredEvents = MOCK_EVENTS.filter(e =>
        e.title.toLowerCase().includes(query.toLowerCase()) ||
        e.type.toLowerCase().includes(query.toLowerCase()) ||
        e.vibe.some(v => v.toLowerCase().includes(query.toLowerCase()))
    );

    return (
        <div className="min-h-screen bg-background pb-20">
            <Navbar />

            <main className="container mx-auto px-4 py-6 space-y-6">
                <div className="relative">
                    <SearchIcon className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                    <Input
                        placeholder="Search events, vibes, or categories..."
                        className="pl-10 h-12 text-lg"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        autoFocus
                    />
                </div>

                <section>
                    <h2 className="text-xl font-semibold mb-4">
                        {query ? `Results for "${query}"` : "Browse All Events"}
                    </h2>
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {filteredEvents.map((event) => (
                            <EventCard key={event.id} event={event} />
                        ))}
                    </div>
                    {filteredEvents.length === 0 && (
                        <p className="text-muted-foreground text-center py-10">No events found.</p>
                    )}
                </section>
            </main>
        </div>
    );
}
