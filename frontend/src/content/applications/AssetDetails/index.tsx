import { Helmet } from 'react-helmet-async';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import { Grid, Container } from '@mui/material';
import Footer from 'src/components/Footer';
import { useParams } from 'react-router';
import GeneratedForm from './GeneratedForm';
import PageHeader from './PageHeader';
import { SmartDataModelsXXXdataModelXXXSchema } from 'src/models/SmartDataModelsXXXdataModelXXXSchema ';


function ApplicationsAssetDetails() {
    let { id } = useParams();

    const asset: SmartDataModelsXXXdataModelXXXSchema = {
        id: "urn:ngsi-ld:Asset:asset001",
        type: "Asset",
        description: "demo asset description",
        name: "demo Asset 1"
    }



    return (
        <>
            <Helmet>
                <title>AssetDetails - Applications</title>
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
                        <GeneratedForm asset={asset} />
                    </Grid>
                </Grid>
            </Container>
            <Footer />
        </>
    );
}

export default ApplicationsAssetDetails;
