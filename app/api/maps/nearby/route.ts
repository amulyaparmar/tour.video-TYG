import { NextResponse } from "next/server";

const GOOGLE_MAPS_API_KEY = process.env.GOOGLE_MAPS_API_KEY;

interface RequestBody {
   latitude: number;
   longitude: number;
   types: string[];
   radius?: number;
   maxResults?: number;
}

interface PlacesSearchRequest {
   includedTypes: string[];
   maxResultCount: number;
   locationRestriction: {
      circle: {
         center: {
            latitude: number;
            longitude: number;
         };
         radius: number;
      };
   };
}

export async function POST(request: Request) {
   try {
      if (!GOOGLE_MAPS_API_KEY) {
         return NextResponse.json({ error: "Google Maps API key not configured" }, { status: 500 });
      }

      // Parse the JSON body
      const body: RequestBody = await request.json();
      const { latitude, longitude, types, radius = 1500, maxResults = 10 } = body;

      // Validate required parameters
      if (!latitude || !longitude || !types || !Array.isArray(types)) {
         return NextResponse.json({ error: "Missing or invalid required parameters: latitude, longitude, and types (array)" }, { status: 400 });
      }

      const requestBody: PlacesSearchRequest = {
         includedTypes: types,
         maxResultCount: maxResults,
         locationRestriction: {
            circle: {
               center: {
                  latitude,
                  longitude,
               },
               radius,
            },
         },
      };

      // Google Places API v1 endpoint
      const url = "https://places.googleapis.com/v1/places:searchNearby";

      const response = await fetch(url, {
         method: "POST",
         headers: {
            "Content-Type": "application/json",
            "X-Goog-Api-Key": GOOGLE_MAPS_API_KEY,
            "X-Goog-FieldMask":
               "places.displayName,places.id,places.formattedAddress,places.location,places.iconMaskBaseUri,places.iconBackgroundColor,places.photos",
         },
         body: JSON.stringify(requestBody),
      });

      const data = await response.json();

      if (response.ok) {
         return NextResponse.json(data.places);
      } else {
         console.error("Error fetching nearby places:", data.error);
         return NextResponse.json({ error: `Google Places API error: ${data.error?.message || "Unknown error"}` }, { status: response.status });
      }
   } catch (error) {
      console.error("Failed to fetch nearby places:", error);
      return NextResponse.json({ error: "Failed to fetch nearby places" }, { status: 500 });
   }
}
