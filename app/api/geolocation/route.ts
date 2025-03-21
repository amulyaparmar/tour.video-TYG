import { NextResponse } from 'next/server'
import { geolocation, ipAddress } from '@vercel/functions'
import type { NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
  // Get geolocation and IP data directly using Vercel Functions
  const { city, country, region, countryRegion, latitude, longitude } = geolocation(request)
  const ip = ipAddress(request)
  
  // Get the origin from the request headers
  const origin = request.headers.get('origin') || 'http://localhost:5174'
  
  // Create the response with the geolocation data
  const response = NextResponse.json({
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
  
  // Set CORS headers
  response.headers.set('Access-Control-Allow-Origin', origin)
  response.headers.set('Access-Control-Allow-Credentials', 'true')
  response.headers.set('Access-Control-Allow-Methods', 'GET, OPTIONS')
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization')
  
  return response
}

// Handle OPTIONS requests for CORS preflight
export async function OPTIONS(request: NextRequest) {
  const origin = request.headers.get('origin') || 'http://localhost:5174'
  
  const response = new NextResponse(null, { status: 204 })
  
  response.headers.set('Access-Control-Allow-Origin', origin)
  response.headers.set('Access-Control-Allow-Credentials', 'true')
  response.headers.set('Access-Control-Allow-Methods', 'GET, OPTIONS')
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization')
  
  return response
} 