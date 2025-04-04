import { Database } from "bun:sqlite";

export function logoutUser(db: Database) {
  return async (req: Request) => {
    try {
      const response = new Response(
        JSON.stringify({ message: "Logged out successfully" }),
        {
          status: 200,
          headers: new Headers({
            "Content-Type": "application/json",
            "Set-Cookie":
              "token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; HttpOnly; SameSite=Strict",
          }),
        },
      );

      return response;
    } catch (error) {
      console.error("Logout error:", error);
      return new Response(JSON.stringify({ error: "Logout failed" }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }
  };
}
