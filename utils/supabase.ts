import { createClient } from '@supabase/supabase-js';

const supabaseUrl = "https://tkweddqlriikqgylsuxz.supabase.co";
const supabaseAnonKey =
   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRrd2VkZHFscmlpa3FneWxzdXh6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzIwNzc0MjIsImV4cCI6MTk4NzY1MzQyMn0.IWdx6ELEUykw11jBQUW2ZT30jjX2-TyHT8INgLe07Ew";

const supabase = createClient(supabaseUrl, supabaseAnonKey);

const initializeSupabaseRealtime = (
   setchannelref : any,
   handleJoin : any,
   handleLeave : any,
   magnet_uuid : string,
 ) => {
   const channel = supabase.channel(magnet_uuid);
   setchannelref(channel);
  
   // Function to handle new member join
   const handleUserJoin = ({ newPresences } : any) => {
     handleJoin(newPresences);
   };
  
   // Function to handle member leave
   const handleUserLeave = ({ leftPresences } : any) => {
     handleLeave(leftPresences);
   };
  
   // Set up listeners for join and leave events
   channel.on('presence', { event: 'join' }, handleUserJoin);
   channel.on('presence', { event: 'leave' }, handleUserLeave);
  
   // Optional: Set up listener for broadcast events if needed
   channel
     .on('broadcast', { event: 'chat' }, (payload) =>
       console.log('presence_event:', payload)
     )
     .subscribe();
  
   // Return the channel so it can be used in the cleanup function
   return channel;
 };

export { supabase, initializeSupabaseRealtime };
