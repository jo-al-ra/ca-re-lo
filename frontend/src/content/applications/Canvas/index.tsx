import { Helmet } from 'react-helmet-async';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import { Grid, Container, Card } from '@mui/material';
import Footer from 'src/components/Footer';
import PageHeader from './PageHeader';
import { useGetEntityById } from 'src/hooks/api/ngsi-ld/useGetEntityById';
import { useCallback, useState } from 'react';
import VisNetwork from './Network';
import Controls from './Controls';
import { CustomNode, IncomingRelationshipParameter } from './types';
import { Edge } from "vis-network/standalone/esm/vis-network";
import Details from './Details';
import { useGetEntitiesByQuery } from 'src/hooks/api/ngsi-ld/useGetEntitiesByQuery';


function Canvas() {

    const { makeRequest, loading, error, responseStatus } = useGetEntityById("http://context/ngsi-context.jsonld")
    const loadIncomingCallback = useGetEntitiesByQuery();
    const [nodes, setNodes] = useState<CustomNode[]>([])
    const [edges, setEdges] = useState<Edge[]>([])
    const [selectedNode, setSelectedNode] = useState<CustomNode>(undefined)

    const addNodes = (newNodes: CustomNode[]) => {
        setNodes([...nodes, ...newNodes])
    }

    const addEdges = (newEdges: Edge[]) => {
        setEdges([...edges, ...newEdges])
    }

    const onSetSelectedNode = useCallback((node: CustomNode) => {
        setSelectedNode(node)
    }, [])

    const loadRelationships = async (node: CustomNode, outgoing: string[], incoming: IncomingRelationshipParameter[]) => {
        let nodes = [];
        let edges = [];
        const createEntityNode = (entity) => ({
            id: entity.id,
            label: entity.id,
            title: entity.name,
            shape: "box",
            ngsiObject: entity
        })
        const createRelationshipNode = (source, relationshipName) => ({
            id: `${source.id}_${relationshipName}`,
            label: relationshipName,
            shape: "ellipse",
            ngsiObject: source[relationshipName]

        })
        const createEdge = (sourceId, targetId) => ({
            from: sourceId,
            to: targetId,
            arrows: { to: true }
        })
        for (let i = 0; i < outgoing.length; i++) {
            const entity = await makeRequest(node.ngsiObject[outgoing[i]].object)
            nodes.push(createEntityNode(entity))
            nodes.push(createRelationshipNode(node.ngsiObject, outgoing[i]))
            edges.push(createEdge(node.id, `${node.id}_${outgoing[i]}`))
            edges.push(createEdge(`${node.id}_${outgoing[i]}`, entity.id))
        }
        //add incoming relationships
        for (let i = 0; i < incoming.length; i++) {
            const entities = await loadIncomingCallback.makeRequest(
                incoming[i].type,
                `${incoming[i].relationshipName}=="${selectedNode.id}"`,
                incoming[i].context)
            let latestEntity;
            for (let j = 0; j < entities.length; j++) {
                if (incoming[i].type == "DLTtxReceipt"
                    && !(entities[j].TxReceipts.value.blockNumber < latestEntity?.value?.blockNumber)
                    && entities[j].TxReceipts.value.statusOK
                ) {
                    latestEntity = entities[j]
                } else if (incoming[i].type != "DLTtxReceipt") {
                    latestEntity = undefined;
                    nodes.push(createEntityNode(entities[j]))
                    nodes.push(createRelationshipNode(entities[j], incoming[i].relationshipName))
                    edges.push(createEdge(entities[j].id, `${entities[j].id}_${incoming[i].relationshipName}`))
                    edges.push(createEdge(`${entities[j].id}_${incoming[i].relationshipName}`, node.id))
                }
            }
            if (latestEntity) {
                nodes.push(createEntityNode(latestEntity))
                nodes.push(createRelationshipNode(latestEntity, incoming[i].relationshipName))
                edges.push(createEdge(latestEntity.id, `${latestEntity.id}_${incoming[i].relationshipName}`))
                edges.push(createEdge(`${latestEntity.id}_${incoming[i].relationshipName}`, node.id))
            }
        }

        addNodes(nodes)
        addEdges(edges)
    }

    return (
        <>
            <Helmet>
                <title>Canvas</title>
            </Helmet>
            <PageTitleWrapper>
                <PageHeader onSubmit={(entityId) => makeRequest(entityId).then(data => {
                    addNodes([
                        {
                            id: data.id,
                            label: data.id,
                            title: data.name,
                            shape: "box",
                            ngsiObject: data
                        }
                    ])
                })} />
            </PageTitleWrapper>
            <Container maxWidth="lg">
                <Grid
                    container
                    direction="row"
                    justifyContent="center"
                    alignItems="stretch"
                    spacing={3}
                >

                    <Grid item xs={12}>
                        <Controls
                            onLoadRelationships={(outgoing, incoming) => {
                                return loadRelationships(selectedNode, outgoing, incoming)
                            }}
                            selectedNode={selectedNode}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <Details node={selectedNode} />
                    </Grid>
                    <Grid item xs={6}>
                        <Card style={{ flex: 1, width: '100%', height: 600, padding: 15 }}>
                            <VisNetwork
                                nodes={nodes}
                                edges={edges}
                                setSelectedNode={onSetSelectedNode} />
                        </Card>
                    </Grid>
                </Grid>
            </Container>
            <Footer />
        </>
    );
}

export default Canvas;
