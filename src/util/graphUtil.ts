import cytoscape from 'cytoscape';
import { CampGraph } from './types';

export function campGraphToCytoscapeElements(
  campGraph: CampGraph,
): cytoscape.ElementDefinition[] {
  const { members, edges } = campGraph;
  const allElements: cytoscape.ElementDefinition[] = [];

  members.forEach((member) => {
    // cytoscape expects unique ids for nodes, so we set the member's fullName
    // to be the id
    allElements.push({
      data: { id: member.fullName, label: member.fullName, ...member },
    });
  });
  edges.forEach((edge) => {
    allElements.push({ data: edge });
  });

  return allElements;
}
