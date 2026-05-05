import { redirect } from 'next/navigation'
import { exchangeOAuthCode } from '@/actions/auth'

export default async function CallbackPage({
    params,
    searchParams,
}: {
    params: Promise<{ provider: string }>
    searchParams: Promise<{ code?: string; state?: string; error?: string }>
}) {
    const { provider } = await params
    const { code, state, error } = await searchParams

    if (error || !code || !state) {
        redirect('/login?error=oauth_denied')
    }

    await exchangeOAuthCode(provider, code, state)
}
