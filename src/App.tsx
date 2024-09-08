import cytoscape from 'cytoscape';
import * as React from 'react';
import CytoscapeComponent from 'react-cytoscapejs';
import { useQuery } from '@tanstack/react-query';
import {
  CampGraph,
  campGraphToCytoscapeElements,
  CampMember,
} from './util/graphUtil';
import { Drawer } from '@mantine/core';

function useData() {
  return useQuery({
    queryKey: ['allData'],
    queryFn: async () => {
      const response = await fetch('/api/data');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data: CampGraph = await response.json();
      console.log('backend data', data);
      return data;
    },
  });
}

export function App(): JSX.Element {
  const [cyAPI, setCyAPI] = React.useState<cytoscape.Core | null>(null);
  const { data: campGraph } = useData();
  const [isPopoverOpened, setIsPopoverOpened] = React.useState(false);
  const [selectedNode, setClickedNode] = React.useState<
    cytoscape.NodeSingular | undefined
  >();
  const [selectedNodePosition, setClickedNodePosition] = React.useState({
    x: 0,
    y: 0,
  });

  React.useEffect(() => {
    // add event handlers
    const handleNodeClick = (event: cytoscape.EventObjectNode) => {
      const node = event.target;
      const { x, y } = node.renderedPosition();
      setClickedNode(node);
      setClickedNodePosition({ x, y });
      setIsPopoverOpened(true);
    };

    cyAPI?.on('click', 'node', handleNodeClick);

    // clean up event handlers
    return () => {
      cyAPI?.off('click', 'node', handleNodeClick);
    };
  }, [cyAPI]);

  const selectedCampMember: CampMember | undefined = React.useMemo(() => {
    return selectedNode?.data();
  }, [selectedNode]);

  // convert camp graph to cytoscape elements
  const cytoscapeElements = React.useMemo(() => {
    return campGraph ? campGraphToCytoscapeElements(campGraph) : [];
  }, [campGraph]);

  return (
    <div className="relative flex h-screen w-screen items-center justify-center">
      {campGraph ? (
        <CytoscapeComponent
          cy={setCyAPI}
          elements={cytoscapeElements}
          style={{ width: '600px', height: '600px' }}
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
      ) : null}
      <Drawer
        opened={isPopoverOpened}
        onClose={() => setIsPopoverOpened(false)}
        title={selectedCampMember?.fullName}
        trapFocus={false}
        closeOnClickOutside={false}
        withOverlay={false}
        position="right"
      >
        {selectedCampMember?.referrer}
      </Drawer>
    </div>
  );
}
