import { H3Event } from "h3";

interface GitHubUser {
    id: number
    login: string
    name: string
    email: string
    avatar_url: string
    html_url: string
}

interface OAuthTokens {
    accessToken: string
    refreshToken?: string
    expiresIn?: number
    tokenType?: string
}

export default defineOAuthGitHubEventHandler({
    config: {
        emailRequired: true
    },
    async onSuccess(event: H3Event, { user, tokens }: { user: GitHubUser, tokens: OAuthTokens }) {
        await setUserSession(event, {
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                avatar: user.avatar_url
            },
            loggedInAt: new Date().toISOString(),

        })
        return sendRedirect(event, '/')
    },
    onError(event: H3Event, error: Error) {
        console.error('GitHub OAuth error:', error)
        return sendRedirect(event, '/')
    },
})
