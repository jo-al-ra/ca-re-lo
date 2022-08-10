import { Helmet } from 'react-helmet-async';
import { Grid, Container, Card, Button } from '@mui/material';
import Footer from 'src/components/Footer';
import { useGetEntityById } from 'src/hooks/api/ngsi-ld/useGetEntityById';
import { useCallback, useEffect, useMemo, useState } from 'react';
import VisNetwork from './Network';
import { CustomNode, IncomingRelationshipParameter } from './types';
import { Edge, DataSet } from "vis-network/standalone/esm/vis-network";
import { useGetEntitiesByQuery } from 'src/hooks/api/ngsi-ld/useGetEntitiesByQuery';
import { useSearchParams } from 'react-router-dom';
import { keyValues2contenthash } from 'src/utils/ngsi-ld/conversion';
import { formConfig } from 'src/utils/ngsi-ld/config';
import Claims from './Claims';
import Attestations from './Attestations';
import IntegrityCard from './EntityProfile/IntegrityCard';
import { useFindLatestContenthashTx } from 'src/hooks/eth/ens/useFindLatestContenthashTx';
import EntityProfile from './EntityProfile';
import AdvancedCard from './AdvancedCard';
import OwnerCard from './EntityProfile/OwnerCard';
import RelationshipCard from './EntityProfile/RelationshipCard';


function Canvas() {
    const findLatestContenthashTx = useFindLatestContenthashTx()
    const { makeRequest, error, responseStatus } = useGetEntityById("http://context/ngsi-context.jsonld")
    const loadIncomingCallback = useGetEntitiesByQuery();
    const nodes = useMemo(() => {
        return new DataSet<CustomNode>()
    }, [])
    const edges = useMemo(() => {
        return new DataSet<Edge>()
    }, [])
    const [selectedNode, setSelectedNode] = useState<CustomNode>(undefined)
    const [searchParams, setSearchParams] = useSearchParams()

    const loadEntityById: (entityId: string) => Promise<CustomNode> = useCallback((entityId) => {
        return makeRequest(entityId).then(async data => {
            return {
                ngsiObject: data,
                id: data.id,
                label: data.id,
                title: data.name,
                shape: "box",
            }
        })
    }, [findLatestContenthashTx.findTx])

    useEffect(() => {
        const initialId = searchParams.get("id")
        if (initialId) {
            loadEntityById(initialId).then(node => {
                nodes.update([node])
                onSetSelectedNode(node)
            })
        }
    }, [searchParams, loadEntityById])

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
            if (node.ngsiObject[outgoing[i]]) {
                const refNode = await loadEntityById(node.ngsiObject[outgoing[i]].object)
                _nodes.push(refNode)
                _edges.push(createEdge(`${node.id}_${outgoing[i]}`, refNode.id))
                _nodes.push(createRelationshipNode(node.ngsiObject, outgoing[i]))
                _edges.push(createEdge(node.id, `${node.id}_${outgoing[i]}`))
            }
        }
        //add incoming relationships
        for (let i = 0; i < incoming.length; i++) {
            const entities = await loadIncomingCallback.makeRequest({
                linkHeader: incoming[i].context,
                type: incoming[i].type,
                query: `${incoming[i].relationshipName}=="${selectedNode.id}"`
            }
            )
            for (let j = 0; j < entities.length; j++) {
                _nodes.push(createEntityNode(entities[j]))
                _nodes.push(createRelationshipNode(entities[j], incoming[i].relationshipName))
                _edges.push(createEdge(entities[j].id, `${entities[j].id}_${incoming[i].relationshipName}`))
                _edges.push(createEdge(`${entities[j].id}_${incoming[i].relationshipName}`, node.id))
            }
        }

        nodes.update(_nodes)
        edges.update(_edges)
    }

    return (
        <>
            <Helmet>
                <title>Canvas</title>
            </Helmet>
            {/* <PageTitleWrapper>
                <PageHeader onSubmit={(entityId) => loadEntityById(entityId)} />
            </PageTitleWrapper> */}
            <Container maxWidth={false}>
                <Grid
                    container
                    direction="row"
                    justifyContent="left"
                    alignItems="stretch"
                    spacing={3}
                >
                    <Grid item xs={6}>
                        <EntityProfile
                            node={selectedNode}
                            reload={() => { loadEntityById(selectedNode.id as string) }}
                        >
                            <Grid
                                container
                                direction="row"
                                justifyContent="left"
                                alignItems="stretch"
                                spacing={3}
                            >
                                <Grid xs={6} sm={4} item>
                                    <IntegrityCard
                                        id={selectedNode?.ngsiObject?.id}
                                        onIntegrityVerified={(integrityProven) => {
                                            const color = integrityProven ? "green" : "red"
                                            nodes.update(
                                                {
                                                    ...selectedNode,
                                                    color: {
                                                        border: color,
                                                        highlight: { border: color }
                                                    }
                                                })
                                        }}
                                    />
                                </Grid>
                                <Grid xs={6} sm={4} item>
                                    <OwnerCard
                                        id={selectedNode?.ngsiObject?.id}
                                        listedOwner={selectedNode?.ngsiObject?.owner?.value}
                                        onClickTransfer={() => console.log("test")}
                                    />
                                </Grid>

                                <Grid xs={6} sm={4} item>
                                    <RelationshipCard
                                        loading={false} //TODO
                                        displayRelationshipState={{ consumedVia: true, producedVia: false, modifiedVia: false }}
                                        onToggleDisplayRelationship={(relationshipName) => console.log(relationshipName)}
                                    />
                                </Grid>
                            </Grid>

                        </EntityProfile>
                    </Grid>
                    <Grid item xs={6}>
                        <Card style={{ flex: 1, width: '100%', height: 600, padding: 15 }}>
                            <VisNetwork
                                nodes={nodes}
                                edges={edges}
                                setSelectedNode={onSetSelectedNode} />
                        </Card>
                    </Grid>
                    <Grid item xs={6}>
                        <Claims
                            node={selectedNode} />
                    </Grid>
                    <Grid item xs={6}>
                        <Attestations
                            node={selectedNode} />
                    </Grid>
                    <Grid item xs={6}>
                        <AdvancedCard
                            node={selectedNode}
                            reload={() => { loadEntityById(selectedNode.id as string) }}
                        />
                        <Button onClick={() => {
                            const config = formConfig[selectedNode.ngsiObject.type]
                            loadRelationships(selectedNode, config.relationshipKeys, config.incomingRelationships)
                        }}>
                            Load Relationships
                        </Button>
                    </Grid>
                </Grid>
            </Container>
            <Footer />
        </>
    );
}

export default Canvas;
