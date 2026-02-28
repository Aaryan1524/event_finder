import { NextRequest, NextResponse } from 'next/server';
import { getTokensFromCode } from '@/lib/calendar';

export async function GET(request: NextRequest) {
    try {
        const searchParams = request.nextUrl.searchParams;
        const code = searchParams.get('code');
        const error = searchParams.get('error');

        if (error) {
            // User denied access or error occurred
            return NextResponse.redirect(new URL('/?calendar_error=access_denied', request.url));
        }

        if (!code) {
            return NextResponse.redirect(new URL('/?calendar_error=missing_code', request.url));
        }

        const redirectUri =
            process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI ||
            'http://localhost:3000/api/calendar/callback';

        // Exchange code for tokens
        const tokens = await getTokensFromCode(code, redirectUri);

        if (!tokens.access_token) {
            return NextResponse.redirect(
                new URL('/?calendar_error=token_exchange_failed', request.url)
            );
        }

        // Redirect back to home with access token in URL for the client to pick up
        const homeUrl = new URL('/', request.url);
        homeUrl.searchParams.set('calendar_token', tokens.access_token);

        const response = NextResponse.redirect(homeUrl);

        // Store the refresh token server-side in an httpOnly cookie so it is
        // never exposed to JavaScript. Access tokens are short-lived (~1 hour);
        // the refresh token lets us silently obtain new ones.
        if (tokens.refresh_token) {
            response.cookies.set('calendar_refresh_token', tokens.refresh_token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'lax',
                path: '/',
                maxAge: 60 * 60 * 24 * 30, // 30 days
            });
        }

        return response;
    } catch (error) {
        console.error('Error in calendar callback:', error);
        return NextResponse.redirect(
            new URL('/?calendar_error=token_exchange_failed', request.url)
        );
    }
}
