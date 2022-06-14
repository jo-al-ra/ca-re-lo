import { Helmet } from 'react-helmet-async';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import { Grid, Container } from '@mui/material';
import Footer from 'src/components/Footer';
import GeneratedForm from './GeneratedForm';
import PageHeader from './PageHeader';
import { useState } from 'react';
import schemas from 'src/utils/ngsi-ld/config';
import { usePostEntity as useCoBrCallback } from 'src/hooks/api/ngsi-ld/usePostEntity';
import { usePostEntity as useCaMaCallback } from 'src/hooks/api/canis-major/usePostEntity';
import { useSnackbar } from 'notistack';

const placeholderText = "Select schema";


function CreateEntity() {

    const [schemaName, setSchemaName] = useState<string>(placeholderText);
    const postCoBrCallback = useCoBrCallback("http://context/ngsi-context.jsonld")
    const postCaMaCallback = useCaMaCallback("http://context/ngsi-context.jsonld")
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();

    return (
        <>
            <Helmet>
                <title>Create Entity</title>
            </Helmet>
            <PageTitleWrapper>
                <PageHeader availableSchemas={Object.keys(schemas)} selectedSchemaName={schemaName} handleChangeSchema={(s) => setSchemaName(s)} />
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
                            <GeneratedForm
                                schemaURL={schemas[`${schemaName}`]}
                                onSubmit={(object) => {
                                    postCaMaCallback.makeRequest(object).then(res1 => {
                                        enqueueSnackbar("DLTtxReceipt created", {
                                            variant: "success"
                                        })
                                        postCoBrCallback.makeRequest(object).then(res2 => {
                                            enqueueSnackbar("Entity created in Context Broker", {
                                                variant: "success"
                                            })
                                        }).catch(e2 => {
                                            console.log(e2)
                                            enqueueSnackbar("Failed to create entity in Context Broker", {
                                                variant: "error"
                                            })
                                        })
                                    }).catch(e1 => {
                                        console.log(e1)
                                        enqueueSnackbar("Failed to create DLTtxReceipt", {
                                            variant: "error"
                                        })
                                    })
                                }}
                            />}
                    </Grid>
                </Grid>
            </Container>
            <Footer />
        </>
    );
}

export default CreateEntity;
