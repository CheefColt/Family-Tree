import React, { useState, useCallback } from "react";
import ReactFlow, { Controls, Background, addEdge, MiniMap } from "reactflow";
import "reactflow/dist/style.css";

const initialNodes = [
  { id: "1", data: { label: "Root Person" }, position: { x: 500, y: 50 } },
];
const initialEdges = [];

const nodeWidth = 150;
const nodeHeight = 60;

const FamilyTree = () => {
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);
  const [counter, setCounter] = useState(2);
  const [selectedNode, setSelectedNode] = useState(null);

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    []
  );

  const addPerson = () => {
    if (!selectedNode) return alert("Please select a node to add a child.");
    
    const parent = nodes.find((node) => node.id === selectedNode);
    if (!parent) return;

    const newId = counter.toString();
    const childY = parent.position.y + nodeHeight + 100;
    const siblings = nodes.filter(node => node.position.y === childY);
    const siblingCount = siblings.length;
    const childX = parent.position.x + siblingCount * (nodeWidth + 50) - ((siblingCount - 1) * (nodeWidth / 2));
    
    const newNode = {
      id: newId,
      data: { label: `Person ${newId}` },
      position: { x: childX, y: childY },
    };

    setNodes((nds) => [...nds, newNode]);
    setEdges((eds) => [...eds, { id: `${parent.id}-${newId}`, source: parent.id, target: newId }]);
    setCounter(counter + 1);
  };

  const onNodeClick = (_, node) => {
    setSelectedNode(node.id);
  };

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <button onClick={addPerson} style={{ position: "absolute", zIndex: 10 }}>Add Child</button>
      <ReactFlow nodes={nodes} edges={edges} onNodeClick={onNodeClick} onConnect={onConnect} fitView>
        <MiniMap />
        <Controls />
        <Background color="#aaa" gap={16} />
      </ReactFlow>
    </div>
  );
};

export default FamilyTree;