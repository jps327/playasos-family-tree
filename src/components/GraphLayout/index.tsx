import * as React from 'react';
import CytoscapeComponent from 'react-cytoscapejs';
import { CampGraph, CampMember } from '../../util/types';
import { campGraphToCytoscapeElements } from '../../util/graphUtil';

type Props = {
  campGraph: CampGraph;
  onCampMemberSelect: (campMember: CampMember) => void;
};

export function GraphLayout({
  campGraph,
  onCampMemberSelect,
}: Props): JSX.Element {
  const [cyAPI, setCyAPI] = React.useState<cytoscape.Core | null>(null);

  React.useEffect(() => {
    // add event handlers
    const handleNodeClick = (event: cytoscape.EventObjectNode) => {
      const node = event.target;
      onCampMemberSelect(node.data());
    };

    cyAPI?.on('click', 'node', handleNodeClick);

    // clean up event handlers
    return () => {
      cyAPI?.off('click', 'node', handleNodeClick);
    };
  }, [cyAPI, onCampMemberSelect]);

  // convert camp graph to cytoscape elements
  const cytoscapeElements = React.useMemo(() => {
    return campGraph ? campGraphToCytoscapeElements(campGraph) : [];
  }, [campGraph]);

  return (
    <CytoscapeComponent
      cy={setCyAPI}
      elements={cytoscapeElements}
      style={{ width: '100%', height: '100%' }}
      layout={{ name: 'concentric' }}
      stylesheet={[
        {
          selector: 'node',
          style: {
            label: 'data(fullName)', // Use fullName as label for nodes
            width: 50,
            height: 50,
            'background-color': '#61bffc',
            'text-valign': 'center',
            'text-halign': 'center',
          },
        },
        {
          selector: 'edge',
          style: {
            width: 2,
            'line-color': '#ccc',
            'target-arrow-color': '#ccc', // Set arrow color to match the line
            'target-arrow-shape': 'triangle', // Define the arrow shape
            'curve-style': 'bezier', // Use a smooth curved line for the edge
          },
        },
      ]}
    />
  );
}
