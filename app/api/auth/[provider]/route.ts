import { NextRequest, NextResponse } from 'next/server'

export async function GET(
    _req: NextRequest,
    { params }: { params: Promise<{ provider: string }> }
) {
    const { provider } = await params
    const res = await fetch(`${process.env.API_URL}/oauth/${provider}`)

    if (!res.ok) {
        return NextResponse.json({ error: 'failed to get auth url' }, { status: res.status })
    }

    const data = await res.json()
    return NextResponse.json(data)
}
