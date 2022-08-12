import { Helmet } from 'react-helmet-async';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import { Grid, Container, Card, CardContent, Box } from '@mui/material';
import Footer from 'src/components/Footer';
import NgsiLDForm from 'src/components/Forms/NgsiLDForm';
import { useNavigate } from 'react-router';
import { useWeb3MetaMask } from 'src/hooks/eth/useWeb3MetaMask';
import { useCreateEntity } from 'src/hooks/combined/useCreateEntity';
import CreateEntityPageHeader from 'src/components/PageHeaders/CreateEntityPageHeader';
import CreateEntityCardHeader from 'src/components/CardHeaders/CreateEntityCardHeader';


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
                <CreateEntityPageHeader
                    entityCategory='Energy'
                    categoryDescription='Please fill out the form.'
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
                        <Card style={{ flex: 1, width: '100%' }}>
                            <CreateEntityCardHeader
                                image="/static/images/entities/Energy.jpg"
                            />
                            <CardContent>
                                <Box p={1}>
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
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Container>
            <Footer />
        </>
    );
}

export default CreateEnergy;
