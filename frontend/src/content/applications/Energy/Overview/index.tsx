import { Helmet } from 'react-helmet-async';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import { Grid, Container } from '@mui/material';
import Footer from 'src/components/Footer';
import EnergyDataGrid from './EnergyDataGrid';
import { useGetEntitiesByQuery } from 'src/hooks/api/ngsi-ld/useGetEntitiesByQuery';
import { useEffect, useState } from 'react';
import { Asset } from 'src/models/Asset';
import { useWeb3MetaMask } from 'src/hooks/eth/useWeb3MetaMask';
import EntityOverviewPageHeader from 'src/components/PageHeaders/EntityOverviewPageHeader';

const BiomassOverview = () => {
    const { makeRequest, loading, error, responseStatus } = useGetEntitiesByQuery()
    const [biomasses, setBiomasses] = useState<Asset[]>([])
    const web3 = useWeb3MetaMask();

    useEffect(() => {
        const query = web3.active ? `category=="energy";owner=="${web3.name}","${web3.account}"` : `category=="energy"`
        makeRequest({
            linkHeader: process.env.CONTEXT ?? "http://context/ngsi-context.jsonld",
            keyValues: true,
            query: query,
            type: "Asset"
        }).then(assets => setBiomasses(assets))
    }, [web3.active, web3.account, web3.name])



    return (
        <>
            <Helmet>
                <title>Energy - Overview</title>
            </Helmet>
            <PageTitleWrapper>
                <EntityOverviewPageHeader
                    entityCategory='Energy'
                    image="/static/images/entities/Energy.jpg"
                    categoryDescription='An energy source is almost always required to perform activities. Energy can have various forms such as electrical, thermal or chemical energy.'
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
                        <EnergyDataGrid assets={biomasses} />
                    </Grid>
                </Grid>
            </Container>
            <Footer />
        </>
    );
}

export default BiomassOverview;
