import cytoscape from 'cytoscape';
import * as React from 'react';
import CytoscapeComponent from 'react-cytoscapejs';

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

export function App(): JSX.Element {
  const cyRef = React.useRef<cytoscape.Core | null>(null);

  React.useEffect(() => {
    const cy = cyRef.current;

    // add event handlers
    if (cy) {
      cy.on('click', 'node', (event: cytoscape.EventObjectNode) => {
        const node = event.target;
        console.log(`clicked: ${node.data('something')}`);
      });
    }
  }, []);

  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <CytoscapeComponent
        cy={(cy) => {
          cyRef.current = cy;
        }}
        elements={ELEMENTS}
        style={{ width: '600px', height: '600px' }}
      />
    </div>
  );
}
