import { NextResponse } from 'next/server'
import { geolocation, ipAddress } from '@vercel/functions'
import type { NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
  // Get geolocation and IP data directly using Vercel Functions
  const { city,  country, flag, region, countryRegion, latitude, longitude, postalCode } = geolocation(request)
  const ip = ipAddress(request)
  
  return NextResponse.json({
    city: city ?? 'unknown',
    country: country ?? 'unknown',
    flag: flag ?? 'unknown',
    region: region ?? 'unknown',
    countryRegion: countryRegion ?? 'unknown',
    latitude: latitude ?? 'unknown',
    longitude: longitude ?? 'unknown',
    postalCode: postalCode ?? 'unknown',
    ip: ip ?? 'unknown'
  })
} 