import { leaderboard } from "./routes/leaderboard";
import { register } from "./routes/register";
import { login } from "./routes/login";
import { logout } from "./routes/logout";
import { me } from "./routes/me";

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    if (url.pathname === "/me") {
      return me(request, env);
    }
    else if (url.pathname === "/leaderboard") {
      return leaderboard(request, env);
    }
    else if (url.pathname === "/register") {
      return register(request, env);
    }
    else if (url.pathname === "/login") {
      return login(request, env);
    }
    else if (url.pathname === "/logout") {
      return logout(request, env);
    }

    return new Response("Not Found", { status: 404 });
  },
} satisfies ExportedHandler<Env>;