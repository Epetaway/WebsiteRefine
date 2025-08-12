import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    // Return a placeholder response for now
    // In production, this would serve the actual PDF file
    return new NextResponse(
      JSON.stringify({ 
        message: 'Resume download endpoint - PDF would be served here',
        url: '/resume.pdf'
      }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ error: 'Failed to serve resume' }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
  }
}