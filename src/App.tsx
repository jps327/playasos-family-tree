import cytoscape from 'cytoscape';
import * as React from 'react';
import CytoscapeComponent from 'react-cytoscapejs';
import { useQuery } from '@tanstack/react-query';
import { CampGraph, campGraphToCytoscapeElements } from './util/graphUtil';

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

  React.useEffect(() => {
    // add event handlers
    const handleNodeClick = (event: cytoscape.EventObjectNode) => {
      const node = event.target;
      console.log(`clicked: ${node.data('fullName')}`);
    };

    cyAPI?.on('click', 'node', handleNodeClick);

    // clean up event handlers
    return () => {
      cyAPI?.off('click', 'node', handleNodeClick);
    };
  }, [cyAPI]);

  const cytoscapeElements = React.useMemo(() => {
    return campGraph ? campGraphToCytoscapeElements(campGraph) : [];
  }, [campGraph]);

  return (
    <div className="flex h-screen w-screen items-center justify-center">
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
    </div>
  );
}
