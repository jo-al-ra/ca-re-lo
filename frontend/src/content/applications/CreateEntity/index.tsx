import { Helmet } from 'react-helmet-async';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import { Grid, Container, Card } from '@mui/material';
import Footer from 'src/components/Footer';
import PageHeader from './PageHeader';
import { useState } from 'react';
import { usePostEntity as useCoBrCallback } from 'src/hooks/api/ngsi-ld/usePostEntity';
import { useSnackbar } from 'notistack';
import NgsiLDForm from 'src/components/Forms/NgsiLDForm';
import { useNavigate } from 'react-router';
import { formConfig } from 'src/utils/ngsi-ld/config';
import { useCreateEntity } from 'src/hooks/eth/ens/useCreateEntity';

const placeholderText = "Select schema";


function CreateEntity() {

    const [schemaName, setSchemaName] = useState<string>(placeholderText);
    const { loading, create } = useCreateEntity();
    const postCoBrCallback = useCoBrCallback("http://context/ngsi-context.jsonld")
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    const navigate = useNavigate();

    return (
        <>
            <Helmet>
                <title>Create Entity</title>
            </Helmet>
            <PageTitleWrapper>
                <PageHeader availableSchemas={Object.keys(formConfig)} selectedSchemaName={schemaName} handleChangeSchema={(s) => setSchemaName(s)} />
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
                        {schemaName === placeholderText ? <></>
                            :
                            <Card style={{ flex: 1, width: '100%', padding: 15 }}>
                                <NgsiLDForm
                                    type={schemaName}
                                    onSubmit={(object) => {
                                        create(object).then(() => {
                                            enqueueSnackbar("DLTtxReceipt created", {
                                                variant: "success"
                                            })
                                            postCoBrCallback.makeRequest(object).then(res2 => {
                                                enqueueSnackbar("Entity created in Context Broker", {
                                                    variant: "success"
                                                })
                                                navigate("/carelo/canvas", { state: { initialEntityId: object.id } })
                                            }).catch(e2 => {
                                                console.log(e2)
                                                enqueueSnackbar("Failed to create entity in Context Broker", {
                                                    variant: "error"
                                                })
                                            })
                                        }).catch(e1 => {
                                            console.log(e1)
                                            enqueueSnackbar(e1, {
                                                variant: "error"
                                            })
                                        })
                                    }}
                                />
                            </Card>}

                    </Grid>
                </Grid>
            </Container>
            <Footer />
        </>
    );
}

export default CreateEntity;
