
import { Node } from "vis-network/standalone/esm/vis-network";


export interface CustomNode extends Node {
    ngsiObject: any,
    integrityProven: boolean;
    txHash: string;
    ensNode: string;
    contenthash: string
}

export interface IncomingRelationshipParameter {
    type: string,
    context?: string,
    relationshipName: string
}