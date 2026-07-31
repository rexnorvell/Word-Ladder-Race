import { leaderboard } from "./routes/leaderboard";
import { register } from "./routes/register";
import { login } from "./routes/login";
import { logout } from "./routes/logout";
import { me } from "./routes/me";
import { account } from "./routes/account";

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    if (url.pathname === "/api/me") {
      return me(request, env);
    }
    else if (url.pathname === "/api/leaderboard") {
      return leaderboard(request, env);
    }
    else if (url.pathname === "/api/register") {
      return register(request, env);
    }
    else if (url.pathname === "/api/login") {
      return login(request, env);
    }
    else if (url.pathname === "/api/logout") {
      return logout(request, env);
    }
    else if (url.pathname === "/api/account") {
      return account(request, env);
    }

    return new Response("Not Found", { status: 404 });
  },
} satisfies ExportedHandler<Env>;