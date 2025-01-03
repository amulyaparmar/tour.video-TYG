"use client";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { useVisitorStore } from "@/store/useVisitorStore";
import { initializeSupabaseRealtime } from "@/utils/supabase";
import { useEffect, useState } from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [channelref, setchannelref] = useState<any>();
  const { activevisitors, handleJoin, handleLeave, setactivevisitors } = useVisitorStore();

  useEffect(() => {
    const url = window.location.href;
  
    // Regex to match UUIDs
    const regex = /([a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12})/;
    const match = url.match(regex);
  
    const magnet_uuid = match ? match[1] : null;
    console.log("magnet_uuid",magnet_uuid)
    if (magnet_uuid) {
      initializeSupabaseRealtime(setchannelref, handleJoin, handleLeave, magnet_uuid);
    }
  
    // Return a cleanup function to unsubscribe when the magnetUuid changes or the component unmounts
    return () => {
      if (channelref) {
        channelref.unsubscribe();
        setactivevisitors(null);
        console.log(`Unsubscribed from channel: ${magnet_uuid}`);
      }
    };
  }, []);
  

  console.log("activevisitors", activevisitors);

  return (
    <>
      <SidebarProvider>
        <AppSidebar />
        <main>
          {children}
        </main>
      </SidebarProvider>
    </>
  );
}
