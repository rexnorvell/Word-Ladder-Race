import { getCurrentUser } from "../utils/auth";

export async function me(request: Request, env: Env, corsHeaders: HeadersInit): Promise<Response> {
    const user = await getCurrentUser(request, env);
    if (!user) {
        return new Response(null, {
            status: 401, headers: corsHeaders
        });
    }

    return Response.json(user, { headers: corsHeaders });
};