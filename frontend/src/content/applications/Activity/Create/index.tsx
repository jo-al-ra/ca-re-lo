import { Helmet } from 'react-helmet-async';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import { Grid, Container, Card } from '@mui/material';
import Footer from 'src/components/Footer';
import { Fragment, useEffect, useMemo, useState } from 'react';
import PageHeader from './PageHeader';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import CategoryPicker from './CategoryPicker';
import PickableInputTables from './PickableInputTables';
import { ActivityCategory, getActivityCategories } from './config';
import CreateOutputs from './CreateOutputs';
import AuthorizeTransactions from './AuthorizeTransactions';
import { useNavigate, useSearchParams } from 'react-router-dom';

const stepNames = ['Select Category', 'Select Inputs', 'Create Outputs', 'Confirm'];

export default function CreateActivity() {
    const navigate = useNavigate()
    const [searchParams, setSearchParams] = useSearchParams()
    const [activeStep, setActiveStep] = useState(0);
    const categories = getActivityCategories()
    const [category, setCategory] = useState<ActivityCategory>()
    const activityId = useMemo(() => {
        return `urn:ngsi-ld:activity:${category?.name}${Date.now()}`
    }, [category])
    const [nextDisabled, setNextDisabled] = useState(true)
    const [sufficientInputs, setSufficientInputs] = useState(false)
    const [sufficientOutputs, setSufficientOutputs] = useState(false)
    const [allTransactionsAuthorized, setAllTransactionsAuthorized] = useState(false)
    /**
     * key is the category of the output
     * value is the output in ngsi-ld format
     */
    const [outputs, setOutputs] = useState<{ [key: string]: any }>({})
    const [inputIds, setInputIds] = useState<string[]>([])
    useEffect(() => {
        if (activeStep === 0) {
            if (category) {
                setNextDisabled(false)
            } else {
                setNextDisabled(true)
            }
        } else if (activeStep === 1) {
            if (sufficientInputs) {
                setNextDisabled(false)
            } else {
                setNextDisabled(true)
            }
        } else if (activeStep === 2) {
            if (sufficientOutputs) {
                setNextDisabled(false)
            } else {
                setNextDisabled(true)
            }
        } else if (activeStep === 3) {
            if (allTransactionsAuthorized) {
                setNextDisabled(false)
            } else {
                setNextDisabled(true)
            }
        }
    }, [activeStep, category, sufficientInputs, sufficientOutputs, allTransactionsAuthorized])

    const handleNext = () => {
        if (activeStep === 3) {
            navigate(`/carelo/canvas?id=${activityId}`)
        }
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const renderStepContent = () => {
        if (activeStep === 0) {
            return <CategoryPicker
                availableCategories={
                    categories
                        .filter(c => {
                            const target = searchParams.get("producedAssetCategory")
                            if (target) {
                                return c.outputs.some(output => output.category === target)
                            } else {
                                return true
                            }
                        })
                        .map(c => c.name)}
                handleChangeCategory={(categoryName => {
                    setCategory(categories.find(c => c.name === categoryName))
                })}
                selectedCategory={category?.name} />
        } else if (activeStep === 1) {
            return <PickableInputTables
                category={category}
                onChange={((inputIds, sufficientInputs) => {
                    setInputIds(inputIds)
                    setSufficientInputs(sufficientInputs)
                })}
            />
        } else if (activeStep === 2) {
            return <CreateOutputs
                category={category}
                activityId={activityId}
                onSubmit={(asset, output) => {
                    let newOutputs = { ...outputs }
                    newOutputs[output.category] = asset
                    setOutputs(newOutputs)
                    const definedOutputs = Object.keys(newOutputs).length
                    const requiredOutputs = category.outputs.length
                    setSufficientOutputs(definedOutputs === requiredOutputs)
                }} />
        } else if (activeStep === 3) {
            return <AuthorizeTransactions
                inputIds={inputIds}
                activityId={activityId}
                outputs={Object.keys(outputs).map(category => outputs[category])}
                category={category.name}
                onAllAuthorized={() => setAllTransactionsAuthorized(true)}
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
                                    return (
                                        <Step key={label} {...stepProps}>
                                            <StepLabel >{label}</StepLabel>
                                        </Step>
                                    );
                                })}
                            </Stepper>
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
                                    <Button onClick={handleNext} disabled={nextDisabled}>
                                        {activeStep === stepNames.length - 1 ? 'Finish' : 'Next'}
                                    </Button>
                                </Box>
                            </Fragment>
                        </Card>
                    </Grid>
                </Grid>
            </Container>
            <Footer />
        </>
    );
}
