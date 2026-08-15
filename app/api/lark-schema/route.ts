import { listLarkFields } from "@/lib/lark";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  if (process.env.VERCEL_ENV === "production") {
    return Response.json({ error: "Not found" }, { status: 404 });
  }

  try {
    const fields = await listLarkFields();
    return Response.json({
      fields: fields.map(({ field_name, type, is_primary }) => ({
        name: field_name,
        type,
        primary: Boolean(is_primary),
      })),
    });
  } catch (error) {
    console.error("Unable to inspect Lark Base schema", error);
    return Response.json({ error: "Unable to inspect Lark Base schema." }, { status: 502 });
  }
}
