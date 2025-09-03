import { NextRequest, NextResponse } from 'next/server'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ params: string[] }> }
) {
  const resolvedParams = await params
  const [width, height] = resolvedParams.params || ['400', '300']
  
  const w = parseInt(width) || 400
  const h = parseInt(height) || 300
  
  // Generate consistent colors based on dimensions for caching
  const seed = w * h
  const colorIndex = seed % 8
  
  const colors = [
    ['#3B82F6', '#1D4ED8'], // Blue gradient
    ['#10B981', '#059669'], // Green gradient
    ['#F59E0B', '#D97706'], // Orange gradient
    ['#8B5CF6', '#7C3AED'], // Purple gradient
    ['#EF4444', '#DC2626'], // Red gradient
    ['#06B6D4', '#0891B2'], // Cyan gradient
    ['#F97316', '#EA580C'], // Orange gradient
    ['#84CC16', '#65A30D'], // Lime gradient
  ]
  
  const [color1, color2] = colors[colorIndex]
  
  const svg = `<svg width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="grad${colorIndex}" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:${color1};stop-opacity:1" />
        <stop offset="100%" style="stop-color:${color2};stop-opacity:1" />
      </linearGradient>
    </defs>
    <rect width="${w}" height="${h}" fill="url(#grad${colorIndex})"/>
    <circle cx="${w/2}" cy="${h/2}" r="30" fill="white" opacity="0.2"/>
    <rect x="${w/2-12}" y="${h/2-8}" width="24" height="16" fill="white" opacity="0.8" rx="2"/>
    <rect x="${w/2-8}" y="${h/2-12}" width="16" height="8" fill="white" opacity="0.6" rx="1"/>
    <rect x="${w/2-8}" y="${h/2+4}" width="16" height="8" fill="white" opacity="0.6" rx="1"/>
    <text x="${w/2}" y="${h - 15}" text-anchor="middle" fill="white" opacity="0.6" font-family="Arial, sans-serif" font-size="11">${w}×${h}</text>
  </svg>`
  
  return new NextResponse(svg, {
    headers: {
      'Content-Type': 'image/svg+xml',
      'Cache-Control': 'public, max-age=86400, s-maxage=86400',
    },
  })
}