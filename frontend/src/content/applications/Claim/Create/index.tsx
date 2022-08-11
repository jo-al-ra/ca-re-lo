import { Helmet } from 'react-helmet-async';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import { Grid, Container, Card } from '@mui/material';
import Footer from 'src/components/Footer';
import { useMemo } from 'react';
import { usePostEntity as useCoBrCallback } from 'src/hooks/api/ngsi-ld/usePostEntity';
import { useSnackbar } from 'notistack';
import NgsiLDForm from 'src/components/Forms/NgsiLDForm';
import { useCreateEntity } from 'src/hooks/eth/ens/useCreateEntity';
import PageHeader from './PageHeader';
import { useNavigate, useSearchParams } from 'react-router-dom';

function CreateClaim() {
    const { loading, create } = useCreateEntity();
    const postCoBrCallback = useCoBrCallback(process.env.REACT_APP_CARELO_NGSI_CONTEXT ?? "http://context/ngsi-context.jsonld")
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams()
    const refersTo = useMemo(() => {
        const refersToParam = searchParams.get("refersTo")
        return refersToParam
    }, [searchParams])

    const name = "X Certificate"
    const alternateName = "X Zertifikat"

    return (
        <>
            <Helmet>
                <title>Create Claim</title>
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
                                type={"Claim"}
                                defaultValues={
                                    {
                                        refersTo: refersTo,
                                        id: `urn:ngsi-ld:claim:claim${Date.now()}`,
                                        name: name,
                                        alternateName: alternateName
                                    }
                                }
                                uiSchemaOverrides={{
                                    "ui:title": "Claim",
                                }}
                                onSubmit={(object) => {
                                    create(object).then(() => {
                                        enqueueSnackbar(`Saved contenthash for ${object.id}.carelo in carelo chain`, {
                                            variant: "success"
                                        })
                                        postCoBrCallback.makeRequest(object).then(res2 => {
                                            enqueueSnackbar(`${object.id} created in Context Broker`, {
                                                variant: "success"
                                            })
                                            navigate("/carelo/canvas", { state: { initialEntityId: object.id } })
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
                        </Card>
                    </Grid>
                </Grid>
            </Container>
            <Footer />
        </>
    );
}

export default CreateClaim;
