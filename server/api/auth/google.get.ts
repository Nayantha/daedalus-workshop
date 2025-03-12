import { H3Event } from "h3";

interface GoogleUser {
    email: string
    name: string
    picture: string
}

interface OAuthTokens {
    access_token: string
    refreshToken?: string
    expires_in?: number
    token_type?: string
    id_token?: string
}

export default defineOAuthGoogleEventHandler({
    config: {
        emailRequired: true,
        scopes: ['profile', 'email']
    },
    async onSuccess(event: H3Event, { user, tokens }: { user: GoogleUser, tokens: OAuthTokens }) {
        await setUserSession(event, {
            user: {
                name: user.name,
                email: user.email,
                avatar: user.picture
            },
            loggedInAt: new Date().toISOString(),
            auth: {
                accessToken: tokens.access_token,
                refreshToken: tokens.refreshToken,
                expiresIn: tokens.expires_in,
                tokenType: tokens.token_type,
                idToken: tokens.id_token
            }
        })
        return sendRedirect(event, '/');
    },

    onError(event: H3Event, error: Error) {
        console.error('Google OAuth error:', error)
        return sendRedirect(event, '/login?error=google-auth-failed')
    },
})
