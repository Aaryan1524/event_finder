import { create } from "zustand";
import { Event, MOCK_EVENTS } from "@/lib/data";

interface EventState {
    events: Event[];
    filter: string;
    selectedEventId: string | null;
    myRsvps: string[]; // list of event IDs
    setFilter: (category: string) => void;
    setSelectedEvent: (id: string | null) => void;
    addEvent: (event: Event) => void;
    joinEvent: (eventId: string) => void;
    isJoined: (eventId: string) => boolean;
    locateTrigger: number;
    triggerLocate: () => void;
}

export const useEventStore = create<EventState>((set, get) => ({
    events: MOCK_EVENTS,
    filter: "All",
    selectedEventId: null,
    myRsvps: [],
    setFilter: (category) => set({ filter: category }),
    setSelectedEvent: (id) => set({ selectedEventId: id }),
    addEvent: (event) => set((state) => ({ events: [event, ...state.events] })),
    joinEvent: (eventId) => {
        const { myRsvps } = get();
        if (myRsvps.includes(eventId)) {
            set({ myRsvps: myRsvps.filter(id => id !== eventId) });
        } else {
            set({ myRsvps: [...myRsvps, eventId] });
        }
    },
    isJoined: (eventId) => get().myRsvps.includes(eventId),
    locateTrigger: 0,
    triggerLocate: () => set((state) => ({ locateTrigger: state.locateTrigger + 1 })),
}));
