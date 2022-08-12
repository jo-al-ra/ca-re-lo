import { Box, Button, Divider, Grid, Typography } from "@mui/material"
import { FC, useState } from "react"
import CreateEntityCardHeader from "src/components/CardHeaders/CreateEntityCardHeader";
import NgsiLDForm from "src/components/Forms/NgsiLDForm"
import { useWeb3MetaMask } from "src/hooks/eth/useWeb3MetaMask";
import { ActivityCategoryOutput } from "../config"
import { categories } from 'src/config/categories';

export interface SingleOutputProps {
    output: ActivityCategoryOutput;
    activityId: string;
    onSubmit: (ngsiLdObject: any, output: ActivityCategoryOutput) => void;
}

const SingleOutput: FC<SingleOutputProps> = ({ output, activityId, onSubmit }) => {
    const [outputDefined, setOutputDefined] = useState(false)
    const web3 = useWeb3MetaMask()

    if (outputDefined) {
        return (
            <Box pt={2}>
                <CreateEntityCardHeader image={categories[output.category]?.image} />
                <Grid container justifyContent="space-between" alignItems="center">
                    <Grid item>
                        <Typography variant="h3" component="h3" gutterBottom>
                            {output.category}
                        </Typography>
                        <Typography variant="subtitle2">
                            You have defined the produced {output.category}. You will be asked to authorize the creation in the next step.
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Button
                            sx={{ mt: { xs: 2, md: 0 } }}
                            variant="contained"
                            onClick={() => setOutputDefined(false)}
                        >
                            Reset
                        </Button>
                    </Grid>
                </Grid>
                <Divider />
            </Box>
        )
    }
    return (
        <Box pt={2}>
            <CreateEntityCardHeader image={categories[output.category]?.image} />
            <Grid item xs={12} pb={5}>
                <NgsiLDForm
                    type={output.type}
                    uiSchemaOverrides={{
                        category: {
                            "ui:widget": "hidden",
                        },
                        consumedVia: {
                            "ui:widget": "hidden",
                        },
                        producedVia: {
                            "ui:disabled": true
                        },
                        "ui:title": output.category,
                        "ui:submitButtonOptions": {
                            props: {
                                disabled: !web3.active
                            },
                            submitText: "Confirm",
                            norender: false
                        }
                    }}
                    defaultValues={{ ...output.defaultValues, producedVia: activityId }}
                    onSubmit={(object) => {
                        const producedAsset = {
                            ...object,
                            category: {
                                type: "Property",
                                value: output.category
                            }
                        }
                        setOutputDefined(true)
                        onSubmit(producedAsset, output)
                    }}
                />
            </Grid>
        </Box>)
}

export default SingleOutput