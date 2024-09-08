import cytoscape from 'cytoscape';

export type CampMember = {
  fullName: string;
  referrer: string;
  playaName?: string;
  firstBurnYear?: number;
  location?: string;
  bio?: string;
  secondaryConnections?: string[];
  numberOfBurnsWithCamp?: number;
  numberOfBurnsTotal?: number;
  imgUrl?: string;
};

export type CampGraph = {
  members: readonly CampMember[];
  edges: ReadonlyArray<{ source: string; target: string }>;
};

export function campGraphToCytoscapeElements(
  campGraph: CampGraph,
): cytoscape.ElementDefinition[] {
  const { members, edges } = campGraph;
  const allElements: cytoscape.ElementDefinition[] = [];

  members.forEach((member) => {
    // cytoscape expects unique ids for nodes, so we set the member's fullName
    // to be the id
    allElements.push({ data: { id: member.fullName, ...member } });
  });
  edges.forEach((edge) => {
    allElements.push({ data: edge });
  });

  return allElements;
}
