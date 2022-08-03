import { Helmet } from 'react-helmet-async';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import { Grid, Container, Card } from '@mui/material';
import Footer from 'src/components/Footer';
import { Fragment, useMemo, useState } from 'react';
import PageHeader from './PageHeader';

import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CategoryPicker from './CategoryPicker';
import PickableInputTables from './PickableInputTables';
import { activityCategories } from './config';
import CreateOutputs from './CreateOutputs';
import AuthorizeTransactions from './AuthorizeTransactions';

const stepNames = ['Select Category', 'Select Inputs', 'Create Outputs', 'Confirm'];

export default function CreateActivity() {
    const [activeStep, setActiveStep] = useState(0);
    const [skipped, setSkipped] = useState(new Set<number>());
    const categories = activityCategories
    const [category, setCategory] = useState(categories[0])
    const activityId = useMemo(() => {
        return `urn:ngsi-ld:activity:${category.name}${Date.now()}`
    }, [category])
    /**
     * key is the category of the output
     * value is the output in ngsi-ld format
     */
    const [outputs, setOutputs] = useState<{ [key: string]: any }>({})
    const [inputIds, setInputIds] = useState<string[]>([])

    const isStepOptional = (step: number) => {
        return step === 1;
    };

    const isStepSkipped = (step: number) => {
        return skipped.has(step);
    };

    const handleNext = () => {
        let newSkipped = skipped;
        if (isStepSkipped(activeStep)) {
            newSkipped = new Set(newSkipped.values());
            newSkipped.delete(activeStep);
        }

        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setSkipped(newSkipped);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleSkip = () => {
        if (!isStepOptional(activeStep)) {
            // You probably want to guard against something like this,
            // it should never occur unless someone's actively trying to break something.
            throw new Error("You can't skip a step that isn't optional.");
        }

        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setSkipped((prevSkipped) => {
            const newSkipped = new Set(prevSkipped.values());
            newSkipped.add(activeStep);
            return newSkipped;
        });
    };

    const handleReset = () => {
        setActiveStep(0);
    };

    const renderStepContent = () => {
        if (activeStep === 0) {
            return <CategoryPicker
                availableCategories={categories.map(c => c.name)}
                handleChangeCategory={(categoryName => setCategory(categories.find(c => c.name === categoryName)))}
                selectedCategory={category.name} />
        } else if (activeStep === 1) {
            return <PickableInputTables category={category} onChange={(inputIds => {
                setInputIds(inputIds)
            })} />
        } else if (activeStep === 2) {
            return <CreateOutputs
                category={category}
                activityId={activityId}
                onSubmit={(asset, output) => {
                    let newOutputs = { ...outputs }
                    newOutputs[output.category] = asset
                    setOutputs(newOutputs)
                }} />
        } else if (activeStep === 3) {
            return <AuthorizeTransactions
                inputIds={inputIds}
                activityId={activityId}
                outputs={Object.keys(outputs).map(category => outputs[category])}
                category={category.name}
            />
        }
    }

    return (
        <>
            <Helmet>
                <title>Create Attestation</title>
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

                            <Stepper activeStep={activeStep}>
                                {stepNames.map((label, index) => {
                                    const stepProps: { completed?: boolean } = {};
                                    const labelProps: {
                                        optional?: React.ReactNode;
                                    } = {};
                                    if (isStepOptional(index)) {
                                        labelProps.optional = (
                                            <Typography variant="caption">Optional</Typography>
                                        );
                                    }
                                    if (isStepSkipped(index)) {
                                        stepProps.completed = false;
                                    }
                                    return (
                                        <Step key={label} {...stepProps}>
                                            <StepLabel {...labelProps}>{label}</StepLabel>
                                        </Step>
                                    );
                                })}
                            </Stepper>
                            {activeStep === stepNames.length ? (
                                <Fragment>
                                    <Typography sx={{ mt: 2, mb: 1 }}>
                                        All steps completed - you&apos;re finished
                                    </Typography>
                                    <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                                        <Box sx={{ flex: '1 1 auto' }} />
                                        <Button onClick={handleReset}>Reset</Button>
                                    </Box>
                                </Fragment>
                            ) : (
                                <Fragment>
                                    {renderStepContent()}
                                    <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                                        <Button
                                            color="inherit"
                                            disabled={activeStep === 0}
                                            onClick={handleBack}
                                            sx={{ mr: 1 }}
                                        >
                                            Back
                                        </Button>
                                        <Box sx={{ flex: '1 1 auto' }} />
                                        {isStepOptional(activeStep) && (
                                            <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                                                Skip
                                            </Button>
                                        )}
                                        <Button onClick={handleNext}>
                                            {activeStep === stepNames.length - 1 ? 'Finish' : 'Next'}
                                        </Button>
                                    </Box>
                                </Fragment>
                            )}
                        </Card>
                    </Grid>
                </Grid>
            </Container>
            <Footer />
        </>
    );
}


interface LocationState {
    initialRefersTo: {
        object: string,
        contenthash: string
    }[]

}
