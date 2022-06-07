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


function Canvas() {

    const { makeRequest, loading, error, responseStatus } = useGetEntityById("http://context/ngsi-context.jsonld")
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
        for (let i = 0; i < outgoing.length; i++) {
            const entity = await makeRequest(node.ngsiObject[outgoing[i]].object)
            nodes.push({
                id: entity.id,
                label: entity.id,
                title: entity.name,
                shape: "box",
                ngsiObject: entity
            })
            nodes.push({
                id: `${node.id}_${outgoing[i]}`,
                label: outgoing[i],
                shape: "ellipse",
                ngsiObject: node.ngsiObject[outgoing[i]]
            })
            edges.push({ from: node.id, to: `${node.id}_${outgoing[i]}`, arrows: { to: true } })
            edges.push({ from: `${node.id}_${outgoing[i]}`, to: entity.id, arrows: { to: true } })
        }
        addNodes(nodes)
        addEdges(edges)
        //add incoming relationships
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
