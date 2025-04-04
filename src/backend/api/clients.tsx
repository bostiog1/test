import { Database } from "bun:sqlite";
import { validateCookieToken } from "../utils/cookieUtils";

export function getClients(db: Database) {
  return async (req: Request) => {
    try {
      const cookieHeader = req.headers.get("Cookie");

      const { valid, decoded, token } = validateCookieToken(cookieHeader);

      if (!valid || !decoded) {
        return Response.json({ message: "Unauthorized" }, { status: 401 });
      }

      const clients = db
        .query("SELECT id, name, email, phone, created_at FROM clients")
        .all();
      return new Response(JSON.stringify(clients), {
        headers: { "Content-Type": "application/json" },
      });
    } catch (error) {
      console.error("Error fetching clients:", error);
      return new Response("Error fetching clients", { status: 500 });
    } finally {
    }
  };
}
