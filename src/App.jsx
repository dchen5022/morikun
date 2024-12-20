import { useCallback, useState } from "react";
import {
  ReactFlow,
  Controls,
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
} from "@xyflow/react";

import AddIcon from "@mui/icons-material/Add";
import InfoIcon from "@mui/icons-material/Info";

import "@xyflow/react/dist/style.css";

import TextUpdaterNode from "./TextUpdaterNode.jsx";

import "./text-updater-node.css";
import { IconButton } from "@mui/material";

const rfStyle = {
  backgroundColor: "#B8CEFF",
};

const initialNodes = [
  {
    id: "node-1",
    type: "textUpdater",
    position: { x: 0, y: 0 },
    data: { value: 123 },
  },
];
// we define the nodeTypes outside of the component to prevent re-renderings
// you could also use useMemo inside the component
const nodeTypes = { textUpdater: TextUpdaterNode };

function Flow() {
  const [nodes, setNodes] = useState(initialNodes);
  const [numNodes, setNumNodes] = useState(1);
  const [edges, setEdges] = useState([]);

  const onNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    [setNodes]
  );
  const onEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    [setEdges]
  );
  const onConnect = useCallback(
    (connection) => {
      const edge = { ...connection, type: "step" };
      setEdges((eds) => addEdge(edge, eds));
    },
    [setEdges]
  );

  const addNode = () => {
    const newNode = {
      id: `node-${numNodes + 1}`,
      type: "textUpdater",
      position: { x: 150, y: 150 },
      data: { text: "" },
    };
    setNodes([...nodes, newNode]);
    setNumNodes(numNodes + 1);
    console.log("Add button clicked!");
  };

  const debug = () => {
    console.log("nodes", nodes);
    console.log("numNodes", numNodes);
  };

  const divStyle = {
    position: "fixed",
    bottom: "0",
    right: "0",
    margin: "5rem",
    maxWidth: "3rem",
    minWidth: "3rem",
    maxHeight: "3rem",
    minHeight: "3rem",
    hover: "pointer",
    zIndex: 1000000,
    backgroundColor: "lightblue", // Optional: for visibility
    padding: "10px", // Optional: for some padding
  };

  const divStyle1 = {
    position: "fixed",
    bottom: "7rem",
    right: "0",
    margin: "5rem",
    maxWidth: "3rem",
    minWidth: "3rem",
    maxHeight: "3rem",
    minHeight: "3rem",
    hover: "pointer",
    zIndex: 1000000,
    backgroundColor: "lightblue", // Optional: for visibility
    padding: "10px", // Optional: for some padding
  };

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      nodeTypes={nodeTypes}
      fitView
      style={rfStyle}
    >
      <Controls />
      <IconButton sx={divStyle} onClick={addNode}>
        <AddIcon />
      </IconButton>
      <IconButton sx={divStyle1} onClick={debug}>
        <InfoIcon />
      </IconButton>
    </ReactFlow>
  );
}

export default Flow;
