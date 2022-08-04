import { Helmet } from 'react-helmet-async';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import { Grid, Container, Card } from '@mui/material';
import Footer from 'src/components/Footer';
import { usePostEntity as useCoBrCallback } from 'src/hooks/api/ngsi-ld/usePostEntity';
import { useSnackbar } from 'notistack';
import NgsiLDForm from 'src/components/Forms/NgsiLDForm';
import { useNavigate } from 'react-router';
import { useCreateEntity } from 'src/hooks/eth/ens/useCreateEntity';
import { useWeb3MetaMask } from 'src/hooks/eth/useWeb3MetaMask';
import PageHeader from 'src/components/CreateEntityPageHeader';



function CreateBiogas() {
    const { loading, create } = useCreateEntity();
    const postCoBrCallback = useCoBrCallback("http://context/ngsi-context.jsonld")
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    const navigate = useNavigate();
    const web3 = useWeb3MetaMask()

    return (
        <>
            <Helmet>
                <title>Create biogas</title>
            </Helmet>
            <PageTitleWrapper>
                <PageHeader
                    categoryDescription='Biogas is a mixture of gases produced from organic matter, which can be used as fuel.'
                    entityCategory='Biogas'
                    image="/static/images/entities/Biogas.jpg"
                />
            </PageTitleWrapper>
            <Container>
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
                                    "ui:title": "Biogas",
                                    "ui:submitButtonOptions": {
                                        props: {
                                            disabled: !web3.active
                                        },
                                        submitText: "Create",
                                        norender: false
                                    }
                                }}
                                defaultValues={{ name: "Biogas #xxx", alternateName: "Biogas #xxx", id: `urn:ngsi-ld:asset:biogas${Date.now()}` }}
                                onSubmit={(object) => {
                                    const biogas = {
                                        ...object,
                                        category: {
                                            type: "Property",
                                            value: "biogas"
                                        }
                                    }
                                    create(biogas).then(() => {
                                        enqueueSnackbar(`Saved contenthash for ${biogas.id}.carelo in carelo chain`, {
                                            variant: "success"
                                        })
                                        postCoBrCallback.makeRequest(biogas).then(res2 => {
                                            enqueueSnackbar(`${biogas.id} created in Context Broker`, {
                                                variant: "success"
                                            })
                                            navigate(`/carelo/canvas?id=${object.id}`)
                                        }).catch(e2 => {
                                            console.log(e2)
                                            enqueueSnackbar("Failed to create biogas in Context Broker", {
                                                variant: "error"
                                            })
                                        })
                                    }).catch(e1 => {
                                        console.log(e1)
                                        enqueueSnackbar(e1.message, {
                                            variant: "error"
                                        })
                                    })
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

export default CreateBiogas;
