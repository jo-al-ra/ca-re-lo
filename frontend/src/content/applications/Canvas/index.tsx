import { Helmet } from 'react-helmet-async';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import { Grid, Container, Card, Button } from '@mui/material';
import Footer from 'src/components/Footer';
import PageHeader from './PageHeader';
import { useGetEntityById } from 'src/hooks/api/ngsi-ld/useGetEntityById';
import { useCallback, useEffect, useMemo, useState } from 'react';
import VisNetwork from './Network';
import Controls from './Controls';
import { CustomNode, IncomingRelationshipParameter } from './types';
import { Edge, DataSet } from "vis-network/standalone/esm/vis-network";
import Details from './Details';
import { useGetEntitiesByQuery } from 'src/hooks/api/ngsi-ld/useGetEntitiesByQuery';
import { useLocation } from 'react-router-dom';
import { useReadContentHash } from 'src/hooks/eth/ens/useReadContenthash';
import { keyValues2contenthash } from 'src/utils/ngsi-ld/conversion';


interface LocationState {
    initialEntityId: string
}

function Canvas() {
    const { readContenthash } = useReadContentHash();
    const { makeRequest, loading, error, responseStatus } = useGetEntityById("http://context/ngsi-context.jsonld")
    const loadIncomingCallback = useGetEntitiesByQuery();
    const nodes = useMemo(() => {
        return new DataSet<CustomNode>()
    }, [])
    const edges = useMemo(() => {
        return new DataSet<Edge>()
    }, [])
    const [selectedNode, setSelectedNode] = useState<CustomNode>(undefined)
    const location = useLocation()

    useEffect(() => {
        if (location.state) {
            const { initialEntityId } = location.state as LocationState;
            if (initialEntityId) {
                loadEntityById(initialEntityId)
            }
        }
    }, [location])

    const loadEntityById = (entityId) => {
        makeRequest(entityId).then(data => {
            nodes.update([createEntityNode(data)])
            onSetSelectedNode({ ngsiObject: data, id: data.id })
        })
    }

    const onSetSelectedNode = useCallback((node: CustomNode) => {
        setSelectedNode(node)
    }, [])


    const createEntityNode = (entity) => ({
        id: entity.id,
        label: entity.id,
        title: entity.name,
        shape: "box",
        ngsiObject: entity
    })

    const loadRelationships = async (node: CustomNode, outgoing: string[], incoming: IncomingRelationshipParameter[]) => {
        let _nodes = [];
        let _edges = [];
        const createRelationshipNode = (source, relationshipName) => ({
            id: `${source.id}_${relationshipName}`,
            label: relationshipName,
            shape: "ellipse",
            ngsiObject: source[relationshipName]

        })
        const createEdge = (sourceId, targetId) => ({
            id: `${sourceId}_${targetId}`,
            from: sourceId,
            to: targetId,
            arrows: { to: true }
        })
        for (let i = 0; i < outgoing.length; i++) {
            const entity = await makeRequest(node.ngsiObject[outgoing[i]].object)
            _nodes.push(createEntityNode(entity))
            _nodes.push(createRelationshipNode(node.ngsiObject, outgoing[i]))
            _edges.push(createEdge(node.id, `${node.id}_${outgoing[i]}`))
            _edges.push(createEdge(`${node.id}_${outgoing[i]}`, entity.id))
        }
        //add incoming relationships
        for (let i = 0; i < incoming.length; i++) {
            const entities = await loadIncomingCallback.makeRequest({
                linkHeader: incoming[i].context,
                ...(incoming[i].type == "DLTtxReceipt") ? { ngsiLdTenant: "orion" } : {},
                type: incoming[i].type,
                query: `${incoming[i].relationshipName}=="${selectedNode.id}"`
            }
            )
            let latestEntity;
            for (let j = 0; j < entities.length; j++) {
                if (incoming[i].type == "DLTtxReceipt"
                    && !(entities[j].TxReceipts.value.blockNumber < latestEntity?.value?.blockNumber)
                    && entities[j].TxReceipts.value.statusOK
                ) {
                    latestEntity = entities[j]
                } else if (incoming[i].type != "DLTtxReceipt") {
                    latestEntity = undefined;
                    _nodes.push(createEntityNode(entities[j]))
                    _nodes.push(createRelationshipNode(entities[j], incoming[i].relationshipName))
                    _edges.push(createEdge(entities[j].id, `${entities[j].id}_${incoming[i].relationshipName}`))
                    _edges.push(createEdge(`${entities[j].id}_${incoming[i].relationshipName}`, node.id))
                }
            }
            if (latestEntity) {
                _nodes.push(createEntityNode(latestEntity))
                _nodes.push(createRelationshipNode(latestEntity, incoming[i].relationshipName))
                _edges.push(createEdge(latestEntity.id, `${latestEntity.id}_${incoming[i].relationshipName}`))
                _edges.push(createEdge(`${latestEntity.id}_${incoming[i].relationshipName}`, node.id))
            }
        }

        nodes.update(_nodes)
        edges.update(_edges)
    }

    const checkIntegrity = async (node: CustomNode) => {
        const storedContenthash = await readContenthash(node.ngsiObject.id)
        const computedContenthash = await keyValues2contenthash(await makeRequest(node.ngsiObject.id, true), "https://raw.githubusercontent.com/jo-al-ra/ca-re-lo/main/data-models/json-context.jsonld")
        return storedContenthash === computedContenthash
    }

    return (
        <>
            <Helmet>
                <title>Canvas</title>
            </Helmet>
            <PageTitleWrapper>
                <PageHeader onSubmit={(entityId) => loadEntityById(entityId)} />
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
                            onLoadEntityById={(entityId => {
                                loadEntityById(entityId)
                            })}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <Details node={selectedNode} reload={() => { loadEntityById(selectedNode.id) }} />
                    </Grid>
                    <Grid item xs={6}>
                        <Card style={{ flex: 1, width: '100%', height: 600, padding: 15 }}>
                            <VisNetwork
                                nodes={nodes}
                                edges={edges}
                                setSelectedNode={onSetSelectedNode} />
                        </Card>
                        <Button onClick={() => {
                            const isInteger = checkIntegrity(selectedNode)
                            const color = isInteger ? "green" : "red"
                            nodes.update({ ...selectedNode, color: { border: color, highlight: { border: color } } })
                        }}>
                            Check integrity
                        </Button>
                    </Grid>
                </Grid>
            </Container>
            <Footer />
        </>
    );
}

export default Canvas;
