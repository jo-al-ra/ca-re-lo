import { Helmet } from 'react-helmet-async';
import { Grid, Container, Card } from '@mui/material';
import Footer from 'src/components/Footer';
import { useGetEntityById } from 'src/hooks/api/ngsi-ld/useGetEntityById';
import { useCallback, useEffect, useMemo, useState } from 'react';
import VisNetwork from './Network';
import { CustomNode } from './types';
import { Edge, DataSet } from "vis-network/standalone/esm/vis-network";
import { useSearchParams } from 'react-router-dom';
import { formConfig } from 'src/utils/ngsi-ld/config';
import Claims from './Claims';
import Attestations from './Attestations';
import IntegrityCard from './EntityProfile/IntegrityCard';
import EntityProfile from './EntityProfile';
import AdvancedCard from './AdvancedCard';
import OwnerCard from './EntityProfile/OwnerCard';
import RelationshipCard from './EntityProfile/RelationshipCard';


function Canvas() {
    const { makeRequest, error, responseStatus } = useGetEntityById(process.env.REACT_APP_CARELO_NGSI_CONTEXT ?? "http://context/ngsi-context.jsonld")
    const nodes = useMemo(() => {
        return new DataSet<CustomNode>()
    }, [])
    const edges = useMemo(() => {
        return new DataSet<Edge>()
    }, [])
    const [selectedNode, setSelectedNode] = useState<CustomNode>(undefined)
    const [searchParams, setSearchParams] = useSearchParams()

    const loadEntityById: (entityId: string) => Promise<CustomNode> = useCallback((entityId) => {
        return makeRequest(entityId).then(data => {
            return createEntityNode(data)
        })
    }, [])

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


    const createEntityNode = (entity) => {
        const relationshipKeys = formConfig[entity.type].relationshipKeys.reduce((acc, currentKey) => {
            return { ...acc, [currentKey]: false }
        }, {})
        const node: CustomNode = {
            ngsiObject: entity,
            id: entity.id,
            label: entity.id,
            title: entity.name,
            shape: "box",
            displayedRelationships: relationshipKeys
        }
        return node
    }

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

    const onToggleDisplayRelationship = async (relationshipName, visible) => {
        let _nodes = [];
        let _edges = [];
        const updatedSelectedNode: CustomNode = {
            ...selectedNode,
            displayedRelationships: {
                ...selectedNode.displayedRelationships,
                [relationshipName]: visible
            }
        }
        _nodes.push(updatedSelectedNode)
        const relationship = selectedNode.ngsiObject[relationshipName]
        const isToOneRelationship = relationship?.object
        const isToManyRelationship = Array.isArray(relationship)
        //cases for single or array of relationships
        if (visible && isToOneRelationship) {
            const refNode = await loadEntityById(relationship.object)
            //merge with potential existing version to avoid state being lost
            _nodes.push({ ...refNode, ...nodes.get(relationship.object) })
            _edges.push(createEdge(`${selectedNode.id}_${relationshipName}`, refNode.id))
            _nodes.push(createRelationshipNode(selectedNode.ngsiObject, relationshipName))
            _edges.push(createEdge(selectedNode.id, `${selectedNode.id}_${relationshipName}`))
        }
        if (!visible && isToOneRelationship) {
            const relationshipNode = nodes.get(`${selectedNode.id}_${relationshipName}`)
            const refNode = nodes.get(`${relationship.object}`)

            nodes.remove([relationshipNode, refNode])
        }
        if (visible && isToManyRelationship) {
            for (let i = 0; i < relationship.length; i++) {
                const refNode = await loadEntityById(relationship[i].object)
                //merge with potential existing version to avoid state being lost
                _nodes.push({ ...refNode, ...nodes.get(relationship[i].object) })
                _edges.push(createEdge(`${selectedNode.id}_${relationshipName}`, refNode.id))
                _nodes.push(createRelationshipNode(selectedNode.ngsiObject, relationshipName))
                _edges.push(createEdge(selectedNode.id, `${selectedNode.id}_${relationshipName}`))
            }
        }
        if (!visible && isToManyRelationship) {
            const relationshipNode = nodes.get(`${selectedNode.id}_${relationshipName}`)
            const refNodes = relationship.map(r => {
                return nodes.get(`${r.object}`)
            })

            nodes.remove([relationshipNode, ...refNodes])
        }

        setSelectedNode(updatedSelectedNode)
        nodes.update(_nodes)
        edges.update(_edges)
    }

    return (
        <>
            <Helmet>
                <title>Canvas</title>
            </Helmet>
            <Container maxWidth={false}>
                <Grid
                    mt={1}
                    container
                    direction="row"
                    justifyContent="left"
                    alignItems="stretch"
                    spacing={3}
                >
                    <Grid item xs={6}>
                        <Grid
                            container
                            direction="row"
                            justifyContent="left"
                            alignItems="stretch"
                            spacing={3}
                        >
                            <Grid item xs={12}>
                                <EntityProfile
                                    node={selectedNode}
                                    reload={() => { loadEntityById(selectedNode.id as string) }}
                                />
                            </Grid>
                            <Grid xs={6} sm={6} item>
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
                            <Grid xs={6} sm={6} item>
                                <OwnerCard
                                    id={selectedNode?.ngsiObject?.id}
                                    listedOwner={selectedNode?.ngsiObject?.owner?.value}
                                    onClickTransfer={() => console.log("test")}
                                />
                            </Grid>

                            <Grid xs={6} sm={6} item>
                                <RelationshipCard
                                    loading={false}
                                    displayRelationshipState={selectedNode?.displayedRelationships}
                                    onToggleDisplayRelationship={(relationshipName, value) => {
                                        onToggleDisplayRelationship(relationshipName, value)
                                    }}
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item flex={1} xs={6}>
                        <Card style={{ flex: 1, width: '100%', padding: 15 }}>
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
                    </Grid>
                </Grid>
            </Container>
            <Footer />
        </>
    );
}

export default Canvas;
