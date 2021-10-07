import React, { useState, useCallback } from 'react';
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  Controls,
  removeElements,
  isNode,
} from 'react-flow-renderer';
import dagre from 'dagre';

// import './layouting.css';

const position = { x: 0, y: 0 };
const edgeType = 'smoothstep';

const initialElements = [
  {
    id: '1',
    type: 'input',
    data: { label: 'input' },
    position,
  },
  {
    id: '2',
    data: { label: 'node 2' },
    position,
  },
  {
    id: '2a',
    data: { label: 'node 2a' },
    position,
  },
  {
    id: '2b',
    data: { label: 'node 2b' },
    position,
  },
  {
    id: '2c',
    data: { label: 'node 2c' },
    position,
  },
  {
    id: '2d',
    data: { label: 'node 2d' },
    position,
  },
  {
    id: '3',
    data: { label: 'node 3' },
    position,
  },
  {
    id: '4',
    data: { label: 'node 4' },
    position,
  },
  {
    id: '5',
    data: { label: 'node 5' },
    position,
  },
  {
    id: '6',
    type: 'output',
    data: { label: 'output' },
    position,
  },
  {
    id: '7', type: 'output', data: { label: 'output' }, position
  },
  {
    id: 'e12', source: '1', target: '2', type: edgeType, animated: true
  },
  {
    id: 'e13', source: '1', target: '3', type: edgeType, animated: true
  },
  {
    id: 'e22a', source: '2', target: '2a', type: edgeType, animated: true
  },
  {
    id: 'e22b', source: '2', target: '2b', type: edgeType, animated: true
  },
  {
    id: 'e22c', source: '2', target: '2c', type: edgeType, animated: true
  },
  {
    id: 'e2c2d', source: '2c', target: '2d', type: edgeType, animated: true
  },
  {
    id: 'e45', source: '4', target: '5', type: edgeType, animated: true
  },
  {
    id: 'e56', source: '5', target: '6', type: edgeType, animated: true
  },
  {
    id: 'e57', source: '5', target: '7', type: edgeType, animated: true
  },
];

const dagreGraph = new dagre.graphlib.Graph();
dagreGraph.setDefaultEdgeLabel(() => ({}));

// In order to keep this example simple the node width and height are hardcoded.
// In a real world app you would use the correct width and height values of
// const nodes = useStoreState(state => state.nodes) and then node.__rf.width, node.__rf.height

const nodeWidth = 172;
const nodeHeight = 36;

const getLayoutedElements = (elements, direction = 'LR') => {
  const isHorizontal = direction === 'LR';
  dagreGraph.setGraph({ rankdir: direction });

  elements.forEach((el) => {
    if (isNode(el)) {
      dagreGraph.setNode(el.id, { width: nodeWidth, height: nodeHeight });
    } else {
      dagreGraph.setEdge(el.source, el.target);
    }
  });

  dagre.layout(dagreGraph);

  return elements.map((el) => {
    if (isNode(el)) {
      const newEl = el;
      const nodeWithPosition = dagreGraph.node(el.id);
      newEl.targetPosition = isHorizontal ? 'left' : 'top';
      newEl.sourcePosition = isHorizontal ? 'right' : 'bottom';

      // unfortunately we need this little hack to pass a slightly different position
      // to notify react flow about the change. Moreover we are shifting the dagre node position
      // (anchor=center center) to the top left so it matches the react flow node anchor point (top left).
      newEl.position = {
        x: nodeWithPosition.x - nodeWidth / 2 + Math.random() / 1000,
        y: nodeWithPosition.y - nodeHeight / 2,
      };
      return newEl;
    }

    return el;
  });
};

// const layoutedElements = getLayoutedElements(initialElements);

const LayoutFlow = ({ elementsPassed }) => {
  console.log(elementsPassed);
  const layoutedElements = getLayoutedElements(elementsPassed || initialElements);
  const [elements, setElements] = useState(layoutedElements);
  const onConnect = (params) => setElements((els) => addEdge({ ...params, type: 'smoothstep', animated: true }, els));
  const onElementsRemove = (elementsToRemove) => setElements((els) => removeElements(elementsToRemove, els));

  //   const onLayout = useCallback(
  //     (direction) => {
  //       const layoutedElementsNew = getLayoutedElements(elements, direction);
  //       setElements(layoutedElementsNew);
  //     },
  //     [elements]
  //   );

  return (
    <div className="layoutflow">
      <ReactFlowProvider>
        <div style={{ height: '60vh' }}>
          <ReactFlow
            elements={elements}
            onConnect={onConnect}
            onLoad={(instance) => setTimeout(() => instance.fitView(), 0)}
            onElementsRemove={onElementsRemove}
            connectionLineType="smoothstep"
          >
            <Controls />

          </ReactFlow>
        </div>
      </ReactFlowProvider>
    </div>
  );
};

export default LayoutFlow;
