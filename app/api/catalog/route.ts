import { readDatabase } from "@/lib/server/database";

export async function GET() {
  const database = await readDatabase();
  return Response.json({ destinations: database.destinations, packages: database.packages });
}
