import { H3Event } from "h3";

interface GitHubUser {
    name: string
    email: string
    avatar_url: string
}

interface OAuthTokens {
    access_token: string
    refresh_token?: string
    expires_in?: number
    token_type?: string
}

export default defineOAuthGitHubEventHandler({
    config: {
        emailRequired: true
    },
    async onSuccess(event: H3Event, { user, tokens }: { user: GitHubUser, tokens: OAuthTokens }) {
        console.log(user);
        console.log(tokens);
        await setUserSession(event, {
            user: {
                name: user.name,
                email: user.email,
                avatar: user.avatar_url
            },
            loggedInAt: new Date().toISOString(),
            auth: {
                accessToken: tokens.access_token,
                refreshToken: tokens.refresh_token,
                expiresIn: tokens.expires_in,
                tokenType: tokens.token_type
            }
        })
        return sendRedirect(event, '/')
    },
    onError(event: H3Event, error: Error) {
        console.error('GitHub OAuth error:', error)
        return sendRedirect(event, '/')
    },
})
