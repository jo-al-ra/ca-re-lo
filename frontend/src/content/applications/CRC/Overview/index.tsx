import { Helmet } from 'react-helmet-async';
import { Grid, Container } from '@mui/material';
import Footer from 'src/components/Footer';
import { useGetEntitiesByQuery } from 'src/hooks/api/ngsi-ld/useGetEntitiesByQuery';
import { useEffect, useState } from 'react';
import { Asset } from 'src/models/Asset';
import { useWeb3MetaMask } from 'src/hooks/eth/useWeb3MetaMask';
import BiocharDataGrid from './CRCDataGrid';

const CRCOverview = () => {
    const { makeRequest, loading, error, responseStatus } = useGetEntitiesByQuery()
    const [crcEntities, setCrcEntities] = useState<Asset[]>([])
    const web3 = useWeb3MetaMask();

    useEffect(() => {
        const query = web3.active ? `category=="CRC";owner=="${web3.name}","${web3.account}"` : `category=="CRC"`
        makeRequest({
            linkHeader: process.env.REACT_APP_CARELO_JSON_CONTEXT ?? "http://context/json-context.jsonld",
            keyValues: true,
            query: query,
            type: "Asset"
        }).then(assets => setCrcEntities(assets))
    }, [web3.active, web3.account, web3.name])



    return (
        <>
            <Helmet>
                <title>CRC - Overview</title>
            </Helmet>
            <Container maxWidth={false} >
                <Grid
                    mt={1}
                    container
                    direction="row"
                    justifyContent="center"
                    alignItems="stretch"
                    spacing={3}
                >
                    <Grid item xs={12}>
                        <BiocharDataGrid assets={crcEntities} />
                    </Grid>
                </Grid>
            </Container>
            <Footer />
        </>
    );
}

export default CRCOverview;
