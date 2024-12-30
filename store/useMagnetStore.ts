import { create } from 'zustand'
// import { type Magnet } from '@/types/magnet' // You'll need to move types to a separate file

interface MagnetStore {
  magnet: any | null
  community: any | null
  startScreenObject: any | null // Consider creating a proper type for this
  setMagnet: (magnet: any | null) => void
  setCommunity: (community: string | null) => void
  setStartScreenObject: (startScreenObject: any | null) => void
  reset: () => void
}

export const useMagnetStore = create<MagnetStore>((set) => ({
  magnet: null,
  community: null,
  startScreenObject: null,
  setMagnet: (magnet) => set({ magnet }),
  setCommunity: (community) => set({ community }),
  setStartScreenObject: (startScreenObject) => set({ startScreenObject }),
  reset: () => set({ magnet: null, community: null, startScreenObject: null }),
})) 