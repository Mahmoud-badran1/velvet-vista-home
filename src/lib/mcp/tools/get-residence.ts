import { defineTool, ToolError } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { getResidence, residences } from "../../../data/residences";

export default defineTool({
  name: "get_residence",
  title: "Get residence details",
  description:
    "Get the full public details of one residence by slug: intro, description paragraphs, features and key facts.",
  inputSchema: {
    slug: z
      .string()
      .trim()
      .min(1)
      .describe(`Residence slug, one of: ${residences.map((r) => r.slug).join(", ")}`),
    lang: z.enum(["de", "en"]).default("en").describe("Language for the text fields."),
  },
  outputSchema: { residence: z.record(z.string(), z.unknown()) },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: ({ slug, lang }) => {
    const r = getResidence(slug);
    if (!r) {
      throw new ToolError(
        `No residence with slug "${slug}". Available: ${residences.map((x) => x.slug).join(", ")}`,
      );
    }
    const detail = {
      slug: r.slug,
      name: r.name[lang],
      kicker: r.kicker[lang],
      area: r.area,
      outdoor: r.outdoor,
      rooms: r.rooms,
      status: r.status[lang],
      price: r.price[lang],
      intro: r.intro[lang],
      description: r.description[lang],
      features: r.features[lang],
      photos: r.gallery?.length ?? 0,
    };
    return {
      content: [{ type: "text", text: JSON.stringify(detail, null, 2) }],
      structuredContent: { residence: detail },
    };
  },
});
