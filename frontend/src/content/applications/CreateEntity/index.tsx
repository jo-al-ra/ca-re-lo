import { Helmet } from 'react-helmet-async';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import { Grid, Container } from '@mui/material';
import Footer from 'src/components/Footer';
import GeneratedForm from './GeneratedForm';
import PageHeader from './PageHeader';
import { useState } from 'react';
import schemas from 'src/utils/ngsi-ld/config';

const placeholderText = "Select schema";


function CreateEntity() {

    const [schemaName, setSchemaName] = useState<string>(placeholderText);

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
                        {schemaName === placeholderText ? <></> : <GeneratedForm schemaURL={schemas[`${schemaName}`]} />}
                    </Grid>
                </Grid>
            </Container>
            <Footer />
        </>
    );
}

export default CreateEntity;
