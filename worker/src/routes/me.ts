import { getCurrentUser } from "../utils/auth";

export async function me(request: Request, env: Env): Promise<Response> {
    const user = await getCurrentUser(request, env);
    if (!user) {
        return new Response(null, { status: 401 });
    }

    return Response.json(user);
};