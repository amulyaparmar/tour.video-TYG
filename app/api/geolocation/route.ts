import { NextResponse } from 'next/server'
import { geolocation, ipAddress } from '@vercel/functions'
import type { NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
  // Get geolocation and IP data directly using Vercel Functions
  const { city, country, region, countryRegion, latitude, longitude } = geolocation(request)
  const ip = ipAddress(request)
  
  return NextResponse.json({
    error: null,
    ip: ip ?? 'unknown',
    location: {
      accuracy_radius: 5, // Assuming a default value, adjust as needed
      city: city ?? 'unknown',
      country: country ?? 'unknown',
      latitude: latitude ?? 'unknown',
      longitude: longitude ?? 'unknown',
      state: countryRegion ?? 'unknown',
      regionId: region ?? 'unknown'
    },
    status: 'success'
  })
} 