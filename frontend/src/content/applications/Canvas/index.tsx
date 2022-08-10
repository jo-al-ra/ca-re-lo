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

    useEffect(() => {
        const initialId = searchParams.get("id")
        if (initialId) {
            loadEntityById(initialId).then(node => {
                nodes.update([node])
                onSetSelectedNode(node)
            })
        }
    }, [searchParams])

    const loadEntityById: (entityId: string) => Promise<CustomNode> = (entityId) => {
        return makeRequest(entityId).then(async data => {
            const latestContenthash = await findLatestContenthashTx.findTx(entityId)
            const computedContenthash = await keyValues2contenthash(
                await makeRequest(entityId, true),
                "https://raw.githubusercontent.com/jo-al-ra/ca-re-lo/main/data-models/json-context.jsonld"
            )
            const integrityProven = computedContenthash === latestContenthash.contenthash
            const color = integrityProven ? "green" : "red"
            return {
                ngsiObject: data,
                id: data.id,
                contenthash: latestContenthash.contenthash,
                ensNode: latestContenthash.ensNode,
                txHash: latestContenthash.txHash,
                integrityProven: computedContenthash === latestContenthash.contenthash,
                color: { border: color, highlight: { border: color } },
                label: data.id,
                title: data.name,
                shape: "box",
            }
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
                                        loading={!selectedNode?.txHash}
                                        blockscoutLink={`http://localhost:4000/tx/${selectedNode?.txHash}`}
                                        hash={selectedNode?.contenthash}
                                        verified={selectedNode?.integrityProven}
                                        dataProvider={"farmer.carelo"} //TODO
                                    />
                                </Grid>
                                <Grid xs={6} sm={4} item>
                                    <OwnerCard
                                        loading={!selectedNode?.txHash} //TODO
                                        blockscoutLink={`http://localhost:4000/tx/${selectedNode?.txHash}`}
                                        ownerName="farmer.carelo"
                                        ownerAddress="0x6660C7d275995f1111C47dC181827Da73898b4C6"
                                        ownerVerified={true}
                                        onClickTransfer={() => console.log("test")}
                                    />
                                </Grid>

                                <Grid xs={6} sm={4} item>
                                    <RelationshipCard
                                        loading={!selectedNode?.txHash} //TODO
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
