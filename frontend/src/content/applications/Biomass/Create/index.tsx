import { Helmet } from 'react-helmet-async';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import { Grid, Container, Card, CardContent, Box } from '@mui/material';
import Footer from 'src/components/Footer';
import { usePostEntity as useCoBrCallback } from 'src/hooks/api/ngsi-ld/usePostEntity';
import { useSnackbar } from 'notistack';
import NgsiLDForm from 'src/components/Forms/NgsiLDForm';
import { useNavigate } from 'react-router';
import { useCreateEntity } from 'src/hooks/eth/ens/useCreateEntity';
import { useWeb3MetaMask } from 'src/hooks/eth/useWeb3MetaMask';
import CreateEntityPageHeader from 'src/components/PageHeaders/CreateEntityPageHeader';
import CreateEntityCardHeader from 'src/components/CardHeaders/CreateEntityCardHeader';


function CreateBiomass() {
    const { loading, create } = useCreateEntity();
    const postCoBrCallback = useCoBrCallback(process.env.REACT_APP_CARELO_NGSI_CONTEXT ?? "http://context/ngsi-context.jsonld")
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    const navigate = useNavigate();
    const web3 = useWeb3MetaMask()

    return (
        <>
            <Helmet>
                <title>Create biomass</title>
            </Helmet>
            <PageTitleWrapper>
                <CreateEntityPageHeader
                    entityCategory='Biomass'
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
                                image="/static/images/entities/Biomass.jpg"
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
                                            "ui:title": "Biomass",
                                            "ui:submitButtonOptions": {
                                                props: {
                                                    disabled: !web3.active
                                                },
                                                submitText: "Create",
                                                norender: false
                                            }
                                        }}
                                        defaultValues={{ name: "Biomass #xxx", alternateName: "Biomasse #xxx", id: `urn:ngsi-ld:asset:biomass${Date.now()}` }}
                                        onSubmit={(object) => {
                                            const biomass = {
                                                ...object,
                                                category: {
                                                    type: "Property",
                                                    value: "biomass"
                                                }
                                            }
                                            create(biomass).then(() => {
                                                enqueueSnackbar(`Saved contenthash for ${biomass.id}.carelo in carelo chain`, {
                                                    variant: "success"
                                                })
                                                postCoBrCallback.makeRequest(biomass).then(res2 => {
                                                    enqueueSnackbar(`${biomass.id} created in Context Broker`, {
                                                        variant: "success"
                                                    })
                                                    navigate(`/carelo/canvas?id=${object.id}`)
                                                }).catch(e2 => {
                                                    console.error(e2)
                                                    enqueueSnackbar("Failed to create biomass in Context Broker", {
                                                        variant: "error"
                                                    })
                                                })
                                            }).catch(e1 => {
                                                console.error(e1)
                                                enqueueSnackbar(e1.message, {
                                                    variant: "error"
                                                })
                                            })
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

export default CreateBiomass;
