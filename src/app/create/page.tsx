"use client";

import { Navbar } from "@/components/features/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { CATEGORIES } from "@/lib/data";
import { useState } from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function CreateEventPage() {
    const [selectedType, setSelectedType] = useState("Party");

    return (
        <div className="min-h-screen bg-background pb-20">
            <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur items-center flex px-4 h-14">
                <Button variant="ghost" size="icon" asChild className="-ml-2 mr-2">
                    <Link href="/">
                        <ArrowLeft className="h-5 w-5" />
                    </Link>
                </Button>
                <span className="font-semibold">Create Event</span>
            </nav>

            <main className="container mx-auto max-w-lg py-8 space-y-8 px-4 sm:px-0 mx-auto">
                <div className="space-y-2">
                    <h1 className="text-2xl font-bold tracking-tight">Post an Event</h1>
                    <p className="text-muted-foreground">Share your vibe with the community.</p>
                </div>

                <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium leading-none">Event Title</label>
                            <Input placeholder="e.g. Midnight Jazz & Cocktails" />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium leading-none">The Vibe (Type)</label>
                            <div className="flex flex-wrap gap-2">
                                {CATEGORIES.filter(c => c !== "All").map(cat => (
                                    <div
                                        key={cat}
                                        onClick={() => setSelectedType(cat)}
                                        className={cn(
                                            "cursor-pointer rounded-full border px-4 py-1.5 text-sm font-medium transition-colors hover:bg-accent",
                                            selectedType === cat ? "bg-primary text-primary-foreground border-primary hover:bg-primary/90" : "bg-card text-card-foreground"
                                        )}
                                    >
                                        {cat}
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium leading-none">Date</label>
                                <Input type="date" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium leading-none">Time</label>
                                <Input type="time" />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium leading-none">Location</label>
                            <Input placeholder="e.g. The Blue Room" />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium leading-none">Description & Vibes</label>
                            <Textarea placeholder="Describe the atmosphere..." className="min-h-[100px]" />
                        </div>
                    </div>

                    <div className="pt-4">
                        <Button size="lg" className="w-full">Publish Event</Button>
                    </div>
                </form>
            </main>
        </div>
    );
}
