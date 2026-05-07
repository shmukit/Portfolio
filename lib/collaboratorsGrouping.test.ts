import { describe, expect, it } from "vitest";
import { groupCollaboratorsByProjectId } from "./collaboratorsGrouping";

describe("groupCollaboratorsByProjectId", () => {
  it("groups and sorts by order_index per project", () => {
    const rows = [
      {
        id: "c2",
        project_id: "p1",
        name: "Second",
        order_index: 2,
      },
      {
        id: "c1",
        project_id: "p1",
        name: "First",
        order_index: 1,
      },
      {
        id: "c3",
        project_id: "p2",
        name: "Only",
        order_index: 0,
      },
    ];

    const map = groupCollaboratorsByProjectId(rows);

    expect(map.get("p1")?.map((c) => c.name)).toEqual(["First", "Second"]);
    expect(map.get("p2")?.map((c) => c.name)).toEqual(["Only"]);
  });
});
