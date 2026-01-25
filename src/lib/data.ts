export interface Event {
    id: string;
    title: string;
    type: "Academic" | "Party" | "Chill" | "Music" | "Food" | "Networking";
    date: string;
    time: string;
    location: string;
    image: string;
    vibe: string[];
    host: {
        name: string;
        avatar: string;
    };
    price: string;
    isPrivate: boolean;
    coordinates: [number, number];
}

export const CATEGORIES = ["All", "Academic", "Party", "Chill", "Music", "Food", "Networking"];

export const MOCK_EVENTS: Event[] = [
    {
        id: "1",
        title: "FIU Car Meet: Night Shift",
        type: "Chill",
        date: "Tonight",
        time: "9:00 PM",
        location: "PG6 Rooftop, FIU",
        image: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=2083&auto=format&fit=crop",
        vibe: ["#Cars", "#LateNight", "#Vibes"],
        host: {
            name: "Panther Motorsports",
            avatar: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=100&auto=format&fit=crop&q=60",
        },
        price: "Free",
        isPrivate: false,
        coordinates: [25.7589, -80.3739], // PG6 area
    },
    {
        id: "3",
        title: "Greek Life Pool Party",
        type: "Party",
        date: "Fri, Oct 24",
        time: "8:00 PM",
        location: "109 Tower Pool",
        image: "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?q=80&w=2070&auto=format&fit=crop",
        vibe: ["#Loud", "#GreekLife", "#College"],
        host: {
            name: "Sigma Chi",
            avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=60",
        },
        price: "$10",
        isPrivate: true,
        coordinates: [25.7601, -80.3705], // 109 Tower approx
    },
    {
        id: "4",
        title: "Library Study Grind",
        type: "Academic",
        date: "Tonight",
        time: "7:00 PM",
        location: "Green Library 2nd Floor",
        image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?q=80&w=2128&auto=format&fit=crop",
        vibe: ["#Focus", "#Exams", "#Coffee"],
        host: {
            name: "Study Group A",
            avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&auto=format&fit=crop&q=60",
        },
        price: "Free",
        isPrivate: false,
        coordinates: [25.7562, -80.3745], // Green Library
    },
    {
        id: "5",
        title: "Food Truck Invasion",
        type: "Food",
        date: "Sat, Oct 25",
        time: "5:00 PM",
        location: "Tamiami Park",
        image: "https://images.unsplash.com/photo-1565123409695-7b5ef63a2efb?q=80&w=2071&auto=format&fit=crop",
        vibe: ["#Foodie", "#Outdoor", "#Music"],
        host: {
            name: "Miami Eats",
            avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&auto=format&fit=crop&q=60",
        },
        price: "$$",
        isPrivate: false,
        coordinates: [25.7535, -80.3780], // Tamiami Park
    },
    {
        id: "6",
        title: "Dorm Storm",
        type: "Party",
        date: "Fri, Oct 24",
        time: "11:00 PM",
        location: "University Towers",
        image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=2070&auto=format&fit=crop",
        vibe: ["#Wild", "#DormLife", "#Late"],
        host: {
            name: "Josh P.",
            avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100&auto=format&fit=crop&q=60",
        },
        price: "By Invite",
        isPrivate: true,
        coordinates: [25.7595, -80.3725], // Towers
    }
];
