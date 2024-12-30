import { create } from 'zustand'

interface ActionTabsStore {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const useActionTabsStore = create<ActionTabsStore>()((set) => ({
  // Get initial tab from URL or default to 'inbox'
  activeTab: new URLSearchParams(window.location.search).get('tab') || 'inbox',
  
  setActiveTab: (tab) => set((state) => {
    if (state.activeTab === tab) return state;
    
    // Update URL params
    const params = new URLSearchParams(window.location.search);
    params.set('tab', tab);
    window.history.pushState({}, '', `${window.location.pathname}?${params}`);
    
    return { activeTab: tab };
  }),
})) 