import { Accordion, AccordionDetails, AccordionSummary, Box, Button, Card, CardContent, CardHeader, Divider, Grid, Typography } from "@mui/material"
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { FC, useEffect, useState } from "react";
import DetailsCardContent from "src/components/DetailsCardContent";
import DoneTwoToneIcon from '@mui/icons-material/DoneTwoTone';
import CloseTwoTone from "@mui/icons-material/CloseTwoTone";
import Label from 'src/components/Label';
import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';
import { useNavigate } from "react-router";
import { CustomNode } from "../types";
import { useGetEntitiesByQuery } from "src/hooks/api/ngsi-ld/useGetEntitiesByQuery";

interface ClaimsProps {
    node: CustomNode
}

interface Claim {
    id: string;
    owner: string;
    dataProvider: string;
    category: "location" | "wasteMaterial" | "solidCarbonContent" | "carbonFootprint";
    type: "Claim";
    refersTo: string;
    dateCreated: string;
    dateModified: string;
    isWasteMaterial?: boolean;
    included: boolean;
    description?: string;
}
const Claims: FC<ClaimsProps> = ({ node }) => {
    const navigate = useNavigate()
    const getEntitiesByQuery = useGetEntitiesByQuery();
    const [claims, setClaims] = useState<Claim[]>([])
    const [includedClaims, setIncludedClaims] = useState<string[]>([])

    useEffect(() => {
        if (node?.ngsiObject?.id) {
            getEntitiesByQuery.makeRequest({
                linkHeader: "http://context/ngsi-context.jsonld",
                keyValues: true,
                query: `refersTo=="${node.ngsiObject.id}"`,
                type: "Claim"
            }).then((response) => setClaims(response))
        }
        if (Array.isArray(node?.ngsiObject?.hasClaims?.value)) {
            setIncludedClaims(node.ngsiObject.hasClaims.value)
        }
        else if (node?.ngsiObject?.hasClaims) {
            setIncludedClaims([node.ngsiObject.hasClaims?.value])
        }

    }, [node])

    console.log(includedClaims)

    const renderClaim = (claim: Claim) => {
        return (
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Typography>{claim.id}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <DetailsCardContent
                        keyValuesObject={claim}
                        hideUndefined
                        loading={getEntitiesByQuery.loading}
                        CustomSection={() => (
                            <>
                                <Grid item xs={12} sm={4} md={3} textAlign={{ sm: 'right' }}>
                                    <Box pr={3} pb={2}>
                                        waste status:
                                    </Box>
                                </Grid>
                                <Grid item xs={12} sm={8} md={9}>
                                    {claim.isWasteMaterial ? (
                                        <Label color="success">
                                            <DoneTwoToneIcon fontSize="small" />
                                            <b>waste material</b>
                                        </Label>
                                    )
                                        :
                                        (
                                            <Label color="error">
                                                <CloseTwoTone fontSize="small" />
                                                <b>no waste material</b>
                                            </Label>
                                        )}
                                </Grid>
                                <Grid item xs={12} sm={4} md={3} textAlign={{ sm: 'right' }}>
                                    <Box pr={3} pb={2}>
                                        included in reference:
                                    </Box>
                                </Grid>
                                <Grid item xs={12} sm={8} md={9}>
                                    {includedClaims.includes(claim.id) ? (
                                        <Label color="success">
                                            <DoneTwoToneIcon fontSize="small" />
                                            <b>included</b>
                                        </Label>
                                    )
                                        :
                                        (
                                            <Label color="error">
                                                <CloseTwoTone fontSize="small" />
                                                <b>excluded</b>
                                            </Label>
                                        )}
                                </Grid>
                            </>
                        )
                        } />
                </AccordionDetails>
            </Accordion >
        )
    }

    return (
        <Card>
            <CardHeader
                title="Claims"
                action={<Button
                    sx={{ mt: { xs: 2, md: 0 } }}
                    variant="contained"
                    startIcon={<AddTwoToneIcon fontSize="small" />}
                    onClick={() => {
                        console.log("navigating")
                        navigate("/carelo/claim/create", {
                            state: {
                                initialRefersTo: node.ngsiObject.id
                            }
                        })
                    }}
                >
                    Create Claim
                </Button>}
            />
            <Divider />
            <CardContent>
                {claims.map((claim) => renderClaim(claim))}
            </CardContent>
        </Card>
    )

}

export default Claims