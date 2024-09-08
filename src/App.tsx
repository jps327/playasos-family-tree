import cytoscape from 'cytoscape';
import * as React from 'react';
import CytoscapeComponent from 'react-cytoscapejs';
import { useQuery } from '@tanstack/react-query';
import { CampGraph, campGraphToCytoscapeElements } from './util/graphUtil';

/*
const ELEMENTS = [
  {
    data: { id: 'one', label: 'Node 1', something: 'woah1' },
    position: { x: 40, y: 40 },
  },
  {
    data: { id: 'two', label: 'Node 2', something: 'woah2' },
    position: { x: 100, y: 20 },
  },
  { data: { source: 'one', target: 'two', label: 'Edge from Node1 to Node2' } },
];
 */

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
  const cyRef = React.useRef<cytoscape.Core | null>(null);
  const cyAPI = cyRef.current;
  const { data: campGraph } = useData();

  React.useEffect(() => {
    // add event handlers
    cyAPI?.on('click', 'node', (event: cytoscape.EventObjectNode) => {
      const node = event.target;
      console.log(`clicked: ${node.data('fullName')}`);
    });

    return () => {
      cyAPI?.removeListener('click');
    };
  }, [cyAPI]);

  const cytoscapeElements = React.useMemo(() => {
    return campGraph ? campGraphToCytoscapeElements(campGraph) : [];
  }, [campGraph]);

  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <CytoscapeComponent
        cy={(cy) => {
          cyRef.current = cy;
        }}
        elements={cytoscapeElements}
        style={{ width: '600px', height: '600px' }}
      />
    </div>
  );
}
