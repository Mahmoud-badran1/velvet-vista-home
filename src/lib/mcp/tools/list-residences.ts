import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { residences } from "../../../data/residences";

export default defineTool({
  name: "list_residences",
  title: "List residences",
  description:
    "List all residences available in the Lange Gasse Collection with their key facts (size, outdoor space, rooms, status, price).",
  inputSchema: {
    lang: z.enum(["de", "en"]).default("en").describe("Language for the text fields."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: ({ lang }) => {
    const items = [...residences]
      .sort((a, b) => a.order - b.order)
      .map((r) => ({
        slug: r.slug,
        name: r.name[lang],
        kicker: r.kicker[lang],
        area: r.area,
        outdoor: r.outdoor,
        rooms: r.rooms,
        status: r.status[lang],
        price: r.price[lang],
      }));
    return {
      content: [{ type: "text", text: JSON.stringify(items, null, 2) }],
      structuredContent: { residences: items },
    };
  },
});
