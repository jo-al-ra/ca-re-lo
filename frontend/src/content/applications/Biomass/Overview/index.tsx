import { Helmet } from 'react-helmet-async';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import { Grid, Container } from '@mui/material';
import Footer from 'src/components/Footer';
import PageHeader from './PageHeader';
import BiomassDataGrid from './BiomassDataGrid';
import { useGetEntities } from 'src/hooks/api/ngsi-ld/useGetEntities';

const BiomassOverview = () => {


    const { data, loading, error, refresh } = useGetEntities<any>("Asset", "http://context/ngsi-context.jsonld")



    return (
        <>
            <Helmet>
                <title>Biomass - Overview</title>
            </Helmet>
            <PageTitleWrapper>
                <PageHeader />
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
                        <BiomassDataGrid assets={data} />
                    </Grid>
                </Grid>
            </Container>
            <Footer />
        </>
    );
}

export default BiomassOverview;
