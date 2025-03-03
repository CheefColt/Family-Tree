import React, { useState, useCallback } from "react";
import ReactFlow, { Controls, Background, addEdge, MiniMap } from "reactflow";
import "reactflow/dist/style.css";
import NodeDetailsForm from "./NodeDetailsForm";
import NodeEditForm from "./NodeEditForm";
import CoupleDetailsForm from "./CoupleDetailsForm";
import Modal from "./Modal";

const initialNodes = [];
const initialEdges = [];

const nodeWidth = 150;
const nodeHeight = 60;

const FamilyTree = () => {
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);
  const [counter, setCounter] = useState(1);
  const [selectedNode, setSelectedNode] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState(null);

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    []
  );

  const addPerson = (label) => {
    const parent = selectedNode ? nodes.find((node) => node.id === selectedNode) : null;
    const newId = counter.toString();
    const childY = parent ? parent.position.y + nodeHeight + 100 : 50;
    const siblings = nodes.filter(node => node.position.y === childY);
    const siblingCount = siblings.length;
    const childX = parent ? parent.position.x + siblingCount * (nodeWidth + 50) - ((siblingCount - 1) * (nodeWidth / 2)) : 500;
    
    const newNode = {
      id: newId,
      data: { label: label || `Person ${newId}` },
      position: { x: childX, y: childY },
    };

    setNodes((nds) => [...nds, newNode]);
    if (parent) {
      setEdges((eds) => [...eds, { id: `${parent.id}-${newId}`, source: parent.id, target: newId }]);
    }
    setCounter(counter + 1);
    setShowModal(false);
  };

  const addCouple = (label1, label2) => {
    const parent = selectedNode ? nodes.find((node) => node.id === selectedNode) : null;
    const newId1 = counter.toString();
    const newId2 = (counter + 1).toString();
    const childY = parent ? parent.position.y + nodeHeight + 100 : 50;
    const siblings = nodes.filter(node => node.position.y === childY);
    const siblingCount = siblings.length;
    const childX1 = parent ? parent.position.x + siblingCount * (nodeWidth + 50) - ((siblingCount - 1) * (nodeWidth / 2)) : 500;
    const childX2 = childX1 + nodeWidth + 50;
    
    const newNode1 = {
      id: newId1,
      data: { label: label1 || `Person ${newId1}` },
      position: { x: childX1, y: childY },
    };

    const newNode2 = {
      id: newId2,
      data: { label: label2 || `Person ${newId2}` },
      position: { x: childX2, y: childY },
    };

    setNodes((nds) => [...nds, newNode1, newNode2]);
    if (parent) {
      setEdges((eds) => [
        ...eds,
        { id: `${parent.id}-${newId1}`, source: parent.id, target: newId1 },
        { id: `${parent.id}-${newId2}`, source: parent.id, target: newId2 },
      ]);
    }
    setEdges((eds) => [
      ...eds,
      { id: `${newId1}-${newId2}`, source: newId1, target: newId2, type: 'couple' },
    ]);
    setCounter(counter + 2);
    setShowModal(false);
  };

  const onNodeClick = (_, node) => {
    setSelectedNode(node.id);
  };

  const saveNodeDetails = (id, label) => {
    setNodes((nds) =>
      nds.map((node) =>
        node.id === id ? { ...node, data: { ...node.data, label } } : node
      )
    );
  };

  const openModal = (type) => {
    setModalType(type);
    setShowModal(true);
  };

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <button onClick={() => openModal('person')}>Add Person</button>
      <button onClick={() => openModal('couple')}>Add Couple</button>
      <NodeEditForm selectedNode={selectedNode} nodes={nodes} onSave={saveNodeDetails} />
      <ReactFlow nodes={nodes} edges={edges} onNodeClick={onNodeClick} onConnect={onConnect} fitView>
        <MiniMap />
        <Controls />
        <Background color="#aaa" gap={16} />
      </ReactFlow>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          {modalType === 'person' && <NodeDetailsForm onSubmit={addPerson} />}
          {modalType === 'couple' && <CoupleDetailsForm onSubmit={addCouple} />}
        </Modal>
      )}
    </div>
  );
};

export default FamilyTree;