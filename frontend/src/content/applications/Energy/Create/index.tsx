import { Helmet } from 'react-helmet-async';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import { Grid, Container, Card } from '@mui/material';
import Footer from 'src/components/Footer';
import { usePostEntity as useCoBrCallback } from 'src/hooks/api/ngsi-ld/usePostEntity';
import { useSnackbar } from 'notistack';
import NgsiLDForm from 'src/components/Forms/NgsiLDForm';
import { useNavigate } from 'react-router';
import { useWeb3MetaMask } from 'src/hooks/eth/useWeb3MetaMask';
import PageHeader from './PageHeader';
import { useCreateEntity } from 'src/hooks/combined/useCreateEntity';


function CreateEnergy() {
    const createEntity = useCreateEntity()
    const navigate = useNavigate();
    const web3 = useWeb3MetaMask()

    return (
        <>
            <Helmet>
                <title>Create energy</title>
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
                        <Card style={{ flex: 1, width: '100%', padding: 15 }}>
                            <NgsiLDForm
                                type={"Asset"}
                                uiSchemaOverrides={{
                                    category: {
                                        "ui:widget": "hidden",
                                    },
                                    consumedVia: {
                                        "ui:widget": "hidden",
                                    },
                                    "ui:title": "Energy",
                                    "ui:submitButtonOptions": {
                                        props: {
                                            disabled: !web3.active
                                        },
                                        submitText: "Create",
                                        norender: false
                                    }
                                }}
                                defaultValues={{ name: "Energy #xxx", alternateName: "Energie #xxx", id: `urn:ngsi-ld:asset:energy${Date.now()}` }}
                                onSubmit={(object) => {
                                    const energy = {
                                        ...object,
                                        category: {
                                            type: "Property",
                                            value: "energy"
                                        }
                                    }
                                    createEntity.makeRequests(energy).then(() =>
                                        navigate(`/carelo/canvas?id=${object.id}`)
                                    )
                                }}
                            />
                        </Card>
                    </Grid>
                </Grid>
            </Container>
            <Footer />
        </>
    );
}

export default CreateEnergy;
