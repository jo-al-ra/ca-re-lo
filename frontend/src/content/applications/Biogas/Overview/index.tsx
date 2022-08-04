import { Helmet } from 'react-helmet-async';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import { Grid, Container } from '@mui/material';
import Footer from 'src/components/Footer';
import { useGetEntitiesByQuery } from 'src/hooks/api/ngsi-ld/useGetEntitiesByQuery';
import { useEffect, useState } from 'react';
import { Asset } from 'src/models/Asset';
import { useWeb3MetaMask } from 'src/hooks/eth/useWeb3MetaMask';
import BiogasDataGrid from './BiogasDataGrid';
import EntityOverviewPageHeader from 'src/components/PageHeaders/EntityOverviewPageHeader';

const BiogasOverview = () => {
    const { makeRequest, loading, error, responseStatus } = useGetEntitiesByQuery()
    const [biogasEntities, setBiogasEntities] = useState<Asset[]>([])
    const web3 = useWeb3MetaMask();

    useEffect(() => {
        const query = web3.active ? `category=="biogas";owner=="${web3.name}","${web3.account}"` : `category=="biogas"`
        makeRequest({
            linkHeader: process.env.CONTEXT ?? "http://context/ngsi-context.jsonld",
            keyValues: true,
            query: query,
            type: "Asset"
        }).then(assets => setBiogasEntities(assets))
    }, [web3.active, web3.account, web3.name])



    return (
        <>
            <Helmet>
                <title>Biogas - Overview</title>
            </Helmet>
            <PageTitleWrapper>
                <EntityOverviewPageHeader
                    categoryDescription='Biogas is a mixture of gases produced from organic matter, which can be used as fuel.'
                    entityCategory='Biogas'
                    image="/static/images/entities/Biogas.jpg"
                />
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
                        <BiogasDataGrid assets={biogasEntities} />
                    </Grid>
                </Grid>
            </Container>
            <Footer />
        </>
    );
}

export default BiogasOverview;
