import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
    const cookieStore = await cookies();
    const token = cookieStore.get('session')?.value;

    if (!token) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = req.nextUrl;
    const params = new URLSearchParams();
    const forward = ['user_email', 'method', 'path', 'from', 'to', 'limit', 'offset'];
    for (const key of forward) {
        const val = searchParams.get(key);
        if (val) params.set(key, val);
    }

    const response = await fetch(`${process.env.API_URL}/admin/audit_logs?${params}`, {
        headers: { Authorization: `Bearer ${token}` },
        cache: 'no-store',
    });

    if (response.status === 401) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    if (response.status === 403) {
        return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    if (!response.ok) {
        return NextResponse.json({ error: 'API error' }, { status: response.status });
    }

    const data = await response.json();
    return NextResponse.json(data);
}
