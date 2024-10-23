// app/api/nearby-places/route.ts
import { NextResponse } from "next/server";

const GOOGLE_MAPS_API_KEY = process.env.GOOGLE_MAPS_API_KEY;

interface PlacesRequestParams {
   lat: number;
   lng: number;
   types: string[];
}

export async function GET(request: Request) {
   try {
      // Get URL parameters
      const { searchParams } = new URL(request.url);
      const lat = searchParams.get("lat");
      const lng = searchParams.get("lng");
      const types = searchParams.get("types");

      // Validate required parameters
      if (!lat || !lng || !types) {
         return NextResponse.json({ error: "Missing required parameters: lat, lng, and types" }, { status: 400 });
      }

      if (!GOOGLE_MAPS_API_KEY) {
         return NextResponse.json({ error: "Google Maps API key not configured" }, { status: 500 });
      }

      const radius = 1500; // Search within 1.5km radius
      const typesParam = types.split(",").join("|");

      // Google Maps Places API URL
      const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=${radius}&type=${typesParam}&key=${GOOGLE_MAPS_API_KEY}`;

      const response = await fetch(url);
      const data = await response.json();

      if (data.status === "OK") {
         return NextResponse.json(data.results);
      } else {
         console.error("Error fetching nearby places:", data.status);
         return NextResponse.json({ error: `Google Places API error: ${data.status}` }, { status: 500 });
      }
   } catch (error) {
      console.error("Failed to fetch nearby places:", error);
      return NextResponse.json({ error: "Failed to fetch nearby places" }, { status: 500 });
   }
}
