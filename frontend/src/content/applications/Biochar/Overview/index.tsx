import { Helmet } from 'react-helmet-async';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import { Grid, Container } from '@mui/material';
import Footer from 'src/components/Footer';
import { useGetEntitiesByQuery } from 'src/hooks/api/ngsi-ld/useGetEntitiesByQuery';
import { useEffect, useState } from 'react';
import { Asset } from 'src/models/Asset';
import { useWeb3MetaMask } from 'src/hooks/eth/useWeb3MetaMask';
import BiocharDataGrid from './BiocharDataGrid';
import EntityOverviewPageHeader from 'src/components/PageHeaders/EntityOverviewPageHeader';

const BiocharOverview = () => {
    const { makeRequest, loading, error, responseStatus } = useGetEntitiesByQuery()
    const [biocharEntities, setBiocharEntities] = useState<Asset[]>([])
    const web3 = useWeb3MetaMask();

    useEffect(() => {
        const query = web3.active ? `category=="biochar";owner=="${web3.name}","${web3.account}"` : `category=="biochar"`
        makeRequest({
            linkHeader: process.env.CONTEXT ?? "http://context/ngsi-context.jsonld",
            keyValues: true,
            query: query,
            type: "Asset"
        }).then(assets => setBiocharEntities(assets))
    }, [web3.active, web3.account, web3.name])



    return (
        <>
            <Helmet>
                <title>Biochar - Overview</title>
            </Helmet>
            <PageTitleWrapper>
                <EntityOverviewPageHeader
                    categoryDescription='Biochar is a solid material created via a thermochemical conversion of biomass with limited presence of oxygen. It can be used as a renewable fuel or to sequester carbon.'
                    entityCategory='Biochar'
                    image="/static/images/entities/Biochar_2.jpg"
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
                        <BiocharDataGrid assets={biocharEntities} />
                    </Grid>
                </Grid>
            </Container>
            <Footer />
        </>
    );
}

export default BiocharOverview;
