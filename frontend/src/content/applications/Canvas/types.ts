
import { Node } from "vis-network/standalone/esm/vis-network";


export interface CustomNode extends Node {
    ngsiObject: any,
    integrityProven?: boolean;
    displayedRelationships: { [relationshipName: string]: boolean }
}