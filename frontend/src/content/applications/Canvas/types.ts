
import { Node } from "vis-network/standalone/esm/vis-network";


export interface CustomNode extends Node {
    ngsiObject: any,
}

export interface IncomingRelationshipParameter {
    type: string,
    context?: string,
    relationshipName: string
}