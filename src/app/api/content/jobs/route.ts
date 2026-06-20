import { NextResponse } from 'next/server'

// Strip /admin suffix to get the public API base
const ADMIN_BASE = process.env.NEXT_PUBLIC_API_BASE || 'https://jobandubackend.up.railway.app/api/admin'
const API_BASE = ADMIN_BASE.replace('/admin', '')

export async function GET() {
  try {
    const res = await fetch(`${API_BASE}/content/jobs`, { cache: 'no-store' })
    if (!res.ok) throw new Error(`API error: ${res.status}`)
    const data = await res.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error('Error fetching jobs data:', error)
    return NextResponse.json({ error: 'Failed to fetch jobs data' }, { status: 500 })
  }
}
