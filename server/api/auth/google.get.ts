import { H3Event } from "h3";

interface GoogleUser {
    id: string
    email: string
    verified_email: boolean
    name: string
    given_name: string
    family_name: string
    picture: string
    locale: string
}

interface OAuthTokens {
    accessToken: string
    refreshToken?: string
    expiresIn?: number
    tokenType?: string
    idToken?: string  // Google provides an ID token
}

export default defineOAuthGoogleEventHandler({
    config: {
        emailRequired: true,
        scopes: ['profile', 'email']
    },
    async onSuccess(event: H3Event, { user, tokens }: { user: GoogleUser, tokens: OAuthTokens }) {
        await setUserSession(event, {
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                avatar: user.picture
            },
            loggedInAt: new Date().toISOString(),
            auth: {
                accessToken: tokens.accessToken,
                refreshToken: tokens.refreshToken,
                expiresIn: tokens.expiresIn,
                tokenType: tokens.tokenType,
                idToken: tokens.idToken
            }
        })
        return sendRedirect(event, '/')
    },

    onError(event: H3Event, error: Error) {
        console.error('Google OAuth error:', error)
        return sendRedirect(event, '/login?error=google-auth-failed')
    },
})
