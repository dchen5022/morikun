import { useCallback } from "react";
import { Handle, Position } from "@xyflow/react";

const handleStyle = { left: 10 };

function TextUpdaterNode({ data, isConnectable }) {
  const onChange = useCallback((evt) => {
    console.log(evt.target.value);
  }, []);

  return (
    <div className="text-updater-node">
      <Handle
        type="target"
        id="a"
        position={Position.Top}
        isConnectable={isConnectable}
      />
      <div>
        <input id="text" name="text" onChange={onChange} className="nodrag" />
      </div>
      <Handle
        type="target"
        id="b"
        position={Position.Left}
        isConnectable={isConnectable}
      />
      <Handle
        type="source"
        position={Position.Right}
        id="c"
        isConnectable={isConnectable}
      />
    </div>
  );
}

export default TextUpdaterNode;
