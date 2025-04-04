import { validateCookieToken } from "../utils/cookieUtils";

export function validateTokenHandler() {
  return async (req: Request) => {
    try {
      const cookieHeader = req.headers.get("Cookie");

      const { valid } = validateCookieToken(cookieHeader);

      if (!valid) {
        throw new Error("Invalid token");
      }

      return new Response(null, { status: 200 });
    } catch (error) {
      // console.error("Token validation failed:", error);
      return new Response("Unauthorized", { status: 401 });
    }
  };
}
