"use client";

import { Navbar } from "@/components/features/Navbar";
import { useEventStore } from "@/lib/store";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { MOCK_EVENTS } from "@/lib/data";

export default function ProfilePage() {
    const { myRsvps } = useEventStore();
    const rsvpEvents = MOCK_EVENTS.filter((e) => myRsvps.includes(e.id));

    return (
        <div className="min-h-screen bg-background pb-20">
            <Navbar />

            <main className="container mx-auto max-w-2xl py-8 space-y-8 px-4 sm:px-0">
                <div className="flex items-center gap-4">
                    <Avatar className="h-20 w-20">
                        <AvatarImage src="https://github.com/shadcn.png" />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <div>
                        <h1 className="text-2xl font-bold">Aaryan</h1>
                        <p className="text-muted-foreground">Event Enthusiast</p>
                    </div>
                    <Button variant="outline" className="ml-auto" asChild>
                        <Link href="/settings">Edit Profile</Link>
                    </Button>
                </div>

                <section className="space-y-4">
                    <h2 className="text-xl font-semibold">My Reservations</h2>
                    {rsvpEvents.length === 0 ? (
                        <div className="rounded-xl border border-dashed p-8 text-center text-muted-foreground">
                            <p>No upcoming events.</p>
                            <Button variant="link" asChild><Link href="/">Browse Events</Link></Button>
                        </div>
                    ) : (
                        <div className="grid gap-4">
                            {rsvpEvents.map(event => (
                                <div key={event.id} className="flex items-center gap-4 rounded-lg border p-4 bg-card">
                                    <img src={event.image} alt={event.title} className="h-16 w-16 rounded-md object-cover" />
                                    <div className="flex-1">
                                        <h3 className="font-semibold">{event.title}</h3>
                                        <p className="text-sm text-muted-foreground">{event.date} • {event.time}</p>
                                    </div>
                                    <Badge variant={event.isPrivate ? "secondary" : "default"}>
                                        {event.isPrivate ? "Pending" : "Confirmed"}
                                    </Badge>
                                </div>
                            ))}
                        </div>
                    )}
                </section>
            </main>
        </div>
    );
}
