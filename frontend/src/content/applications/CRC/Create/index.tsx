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
import CreateEntityPageHeader from 'src/components/CardHeaders/CreateEntityCardHeader';



function CreateCRC() {
    const { loading, create } = useCreateEntity();
    const postCoBrCallback = useCoBrCallback(process.env.REACT_APP_CARELO_NGSI_CONTEXT ?? "http://context/ngsi-context.jsonld")
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    const navigate = useNavigate();
    const web3 = useWeb3MetaMask()

    return (
        <>
            <Helmet>
                <title>Create Carbon Removal Credit</title>
            </Helmet>
            <PageTitleWrapper>
                <CreateEntityPageHeader
                    // categoryDescription='Carbon Removal Credits (CRCs) are issued for removing greenhouse gases from the atmosphere and preventing leakage of the captured gases for a long time.'
                    // entityCategory='CRC'
                    image="/static/images/entities/CRC.jpg"
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
                                    "ui:title": "CRC",
                                    "ui:submitButtonOptions": {
                                        props: {
                                            disabled: !web3.active
                                        },
                                        submitText: "Create",
                                        norender: false
                                    }
                                }}
                                defaultValues={{ name: "CRC #xxx", alternateName: "CRC #xxx", id: `urn:ngsi-ld:asset:crc${Date.now()}` }}
                                onSubmit={(object) => {
                                    const crc = {
                                        ...object,
                                        category: {
                                            type: "Property",
                                            value: "CRC"
                                        }
                                    }
                                    create(crc).then(() => {
                                        enqueueSnackbar(`Saved contenthash for ${crc.id}.carelo in carelo chain`, {
                                            variant: "success"
                                        })
                                        postCoBrCallback.makeRequest(crc).then(res2 => {
                                            enqueueSnackbar(`${crc.id} created in Context Broker`, {
                                                variant: "success"
                                            })
                                            navigate(`/carelo/canvas?id=${object.id}`)
                                        }).catch(e2 => {
                                            console.error(e2)
                                            enqueueSnackbar("Failed to create CRC in Context Broker", {
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
                        </Card>
                    </Grid>
                </Grid>
            </Container>
            <Footer />
        </>
    );
}

export default CreateCRC;
