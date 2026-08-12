import { defineMcp } from "@lovable.dev/mcp-js";
import listResidencesTool from "./tools/list-residences";
import getResidenceTool from "./tools/get-residence";

export default defineMcp({
  name: "cozy-corner-estates",
  title: "Cozy Corner Estates",
  version: "0.1.0",
  instructions:
    "Public tools for the Lange Gasse Collection, four private residences in Vienna Josefstadt. Use `list_residences` to see all units and `get_residence` for the full description of one unit by slug. All content is DE/EN.",
  tools: [listResidencesTool, getResidenceTool],
});
