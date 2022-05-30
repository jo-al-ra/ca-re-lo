import { Helmet } from 'react-helmet-async';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import { Grid, Container } from '@mui/material';
import Footer from 'src/components/Footer';
import GeneratedForm from './GeneratedForm';
import PageHeader from './PageHeader';
import { useState } from 'react';
import { usePostEntity } from 'src/hooks/api/ngsi-ld/usePostEntity';

const placeholderText = "Select schema";


function CreateEntity() {

    const t = {
        "Building": "https://smart-data-models.github.io/dataModel.Building/Building/schema.json",
        "Asset": "https://raw.githubusercontent.com/jo-al-ra/ca-re-lo/main/data-models/Asset/schemaManualModified.json",
        "Activity": "https://smart-data-models.github.io/dataModel.Building/Building/schema.json",
        "Safeguard": "https://smart-data-models.github.io/dataModel.Building/Building/schema.json",
        "Claim": "https://smart-data-models.github.io/dataModel.Building/Building/schema.json",
        "Actor": "https://smart-data-models.github.io/dataModel.Building/Building/schema.json",

    }

    const [schemaName, setSchemaName] = useState<string>(placeholderText);

    return (
        <>
            <Helmet>
                <title>Create Entity</title>
            </Helmet>
            <PageTitleWrapper>
                <PageHeader availableSchemas={Object.keys(t)} selectedSchemaName={schemaName} handleChangeSchema={(s) => setSchemaName(s)} />
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
                        {schemaName === placeholderText ? <></> : <GeneratedForm schemaURL={t[`${schemaName}`]} />}
                    </Grid>
                </Grid>
            </Container>
            <Footer />
        </>
    );
}

export default CreateEntity;
