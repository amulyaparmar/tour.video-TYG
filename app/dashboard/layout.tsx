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
    const url = new URL(window.location.href);
    const pathParts = url.pathname.split("/");
    const magnet_uuid = pathParts[pathParts.length - 1];

    if (magnet_uuid) {
      initializeSupabaseRealtime(setchannelref, handleJoin, handleLeave, magnet_uuid);
    }

    // Return a cleanup function to unsubscribe when the magnetUuid changes or the component unmounts
    return () => {
      if (channelref) {
        channelref.unsubscribe();
        setactivevisitors([])
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
