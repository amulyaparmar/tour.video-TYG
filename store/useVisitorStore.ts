import { create } from 'zustand'

interface VisitorStore {
    activevisitors: Array<Object> | null,
    setactivevisitors: (activevisitors: any | null) => void
    handleJoin: (newPresences: any | null) => void
    handleLeave: (leftPresences: any | null) => void
  }

export const useVisitorStore = create<VisitorStore>((set) => ({
    activevisitors: [],
    setactivevisitors:  (activevisitors : any) => set({ activevisitors }),
    // Function to handle new member join
    handleJoin: (newPresences : any) => set((state : any) => {
      // Check if all newPresences already exist in the current state
      const hasDuplicateVisitors = newPresences.every((item : any) => {
        const visitorId = item.visitorId ?? item.visitor_id;
        return state.activevisitors.findIndex((visitor : any) => (visitor.visitorId ?? visitor.visitor_id) === visitorId) !== -1;
      });
   
      // If all visitors from newPresences already exist, return the previous state
      if (hasDuplicateVisitors) {
        return state;  // No updates needed, return previous state
      }
   
      // Process new presences, ensuring no duplicate visitorId entries
      const newMembers = newPresences.map((item: any) => {
        const visitorId = item.visitorId ?? item.visitor_id;
   
        // If visitor already exists, return the previous state visitor
        const existingVisitorIndex = state.activevisitors.findIndex((visitor : any) => (visitor.visitorId ?? visitor.visitor_id) === visitorId);
   
        if (existingVisitorIndex !== -1) {
          // Visitor already exists, return the existing visitor (no changes)
          return state.activevisitors[existingVisitorIndex];
        }
   
        // Otherwise, add a new entry for the visitor
        return {
          ...item,
          //unreadCount: 0,
          //backgroundColor: generateRandomLightColor(),
          //visitorName: item?.userInfo?.name ?? generateUsername(visitorId)
        };
      });
   
      // Merge the new members with the existing active visitors
      let updatedMembers = [...newMembers, ...state.activevisitors];
   
      // Return the updated state
      return {
        activevisitors: updatedMembers
      };
    }),
   
   
    // Function to handle member leave
    handleLeave: (leftPresences : any) => set((state: any) => {
      const updatedMembers = state.activevisitors.filter(
        (member: any) => !leftPresences.some((left : any) => left?.visitorId  === member?.visitorId)
      );
      return {
        activevisitors: updatedMembers
      };
    }),
   
   
  }));