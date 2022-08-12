import { useCallback, useEffect, useRef } from "react";
import { Network, Options, Edge, DataSet } from "vis-network/standalone/esm/vis-network";
import { CustomNode } from "./types";



interface VisNetworkProps {
    nodes: DataSet<CustomNode, "id">,
    edges: DataSet<Edge>,
    setSelectedNode: (node: CustomNode) => void
}


const VisNetwork: React.FC<VisNetworkProps> = ({ nodes, edges, setSelectedNode }) => {
    // A reference to the vis network instance
    const visJsRef = useRef<HTMLDivElement>(null);


    const options: Options = {
    };

    const onClick = useCallback((clickEvent) => {
        if (clickEvent.nodes && clickEvent.nodes.length === 1) {
            setSelectedNode(nodes.get(clickEvent.nodes)[0])
        } else {
            setSelectedNode(undefined)
        }
    }, [nodes])

    useEffect(() => {
        const network = visJsRef.current && new Network(visJsRef.current, { nodes, edges }, options);
        network?.on("click", onClick)
    }, [visJsRef, nodes, edges]);

    return (
        <div style={{ flex: 1, minHeight: 500, height: 700 }}
            ref={visJsRef}
        />
    );
};

export default VisNetwork;