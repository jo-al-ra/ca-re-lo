import { Accordion, AccordionDetails, AccordionSummary, Box, Button, Card, CardContent, CardHeader, CardMedia, Divider, Grid, List, ListItem, ListItemButton, ListItemText, Typography } from "@mui/material"
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { FC, useEffect, useState } from "react";
import DetailsCardContent from "src/components/DetailsCardContent";
import Text from "src/components/Text"
import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';
import { useNavigate } from "react-router";
import { CustomNode } from "../types";
import { useGetEntitiesByQuery } from "src/hooks/api/ngsi-ld/useGetEntitiesByQuery";
import { Attestation } from "src/models/Attestation";
import { DetailsCardConfigItem } from "src/components/DetailsCardContent/config";
import { keyValues2contenthash } from "src/utils/ngsi-ld/conversion";
import { useGetEntityById } from "src/hooks/api/ngsi-ld/useGetEntityById";

import { useWeb3MetaMask } from "src/hooks/eth/useWeb3MetaMask";
import { styled } from '@mui/material/styles';



const CardCover = styled(Card)(
    ({ theme }) => `
      position: relative;
  
      .MuiCardMedia-root {
        height: ${theme.spacing(26)};
      }
  `
);

const CardCoverAction = styled(Box)(
    ({ theme }) => `
      position: absolute;
      right: ${theme.spacing(2)};
      bottom: ${theme.spacing(2)};
  `
);
interface AttestationsProps {
    node: CustomNode
}

const Attestations: FC<AttestationsProps> = ({ node }) => {
    const web3 = useWeb3MetaMask()
    const navigate = useNavigate()
    const getEntitiesByQuery = useGetEntitiesByQuery();
    const [attestations, setAttestations] = useState<Attestation[]>([
        {
            id: "urn:ngsi-ld:attestation:verification1",
            category: "verification",
            type: "Attestation",
            refersTo: [
                { object: "urn:ngsi-ld:asset:biomass2", contenthash: "test" },
                { object: "urn:ngsi-ld:asset:bioenergy2", contenthash: "test" }
            ],
            description: "Formally correct representation according to axioms defined by Standards Corp"
        },
        {
            id: "urn:ngsi-ld:attestation:challenge",
            type: "Attestation",
            category: "challenge",
            refersTo: [{ object: "urn:ngsi-ld:asset:biomass2", contenthash: "test" }],
            description: "The listed claim urn:ngsi-ld:claim:wasteclaim2 is invalid. I've seen the farmer mixing corn produced for energy purposes into the biomass."
        }
    ])

    const verifications = attestations.filter(attestation => attestation.category === "verification")
    const valid_verificationCount = verifications.filter(attestation => attestation.valid).length
    const expired_verificationCount = verifications.length - valid_verificationCount


    const validations = attestations.filter(attestation => attestation.category === "validation")
    const valid_validationCount = validations.filter(attestation => attestation.valid).length
    const expired_validationCount = validations.length - valid_validationCount

    const challenges = attestations.filter(attestation => attestation.category === "challenge")
    const valid_challengeCount = challenges.filter(attestation => attestation.valid).length
    const expired_challengeCount = challenges.length - valid_challengeCount

    const summary = {
        "verifications (expired)": `${valid_verificationCount} (${expired_verificationCount})`,
        "validations (expired)": `${valid_validationCount} (${expired_validationCount})`,
        "challenges (expired)": `${valid_challengeCount} (${expired_challengeCount})`
    }

    const summaryConfig: DetailsCardConfigItem = {
        listedProperties: [
            "verifications (expired)",
            "validations (expired)",
            "challenges (expired)"
        ],
        listedRelationships: []
    }

    useEffect(() => {
        if (node?.ngsiObject?.id) {
            getEntitiesByQuery.makeRequest({
                linkHeader: process.env.REACT_APP_CARELO_JSON_CONTEXT ?? "https://raw.githubusercontent.com/jo-al-ra/ca-re-lo/main/data-models/json-context.jsonld",
                keyValues: true,
                query: `refersTo[object]=="${node.ngsiObject.id}"`,
                type: "Attestation"
            }).then((response) => setAttestations(response))
        }

    }, [node])

    const renderAttestation = (attestation: Attestation) => {

        const renderRefersToRows = () => {
            return attestation.refersTo.map((refered) => {
                return (
                    <ListItem key={refered.object} component="div" disablePadding>
                        <ListItemButton>
                            <Text color="black">
                                <b>{`${refered.object}`}</b>
                            </Text>
                        </ListItemButton>
                    </ListItem>
                );
            })

        }

        return (
            <Accordion>
                <AccordionSummary

                    expandIcon={<ExpandMoreIcon />}
                    aria-controls={`panel${attestation.id}-content`}
                    id={`panel${attestation.id}-header`}
                >
                    <Typography>{attestation.id}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <DetailsCardContent
                        keyValuesObject={attestation}
                        hideUndefined
                        loading={getEntitiesByQuery.loading}
                        customSection={

                            <Grid container alignItems={"center"}>
                                <Grid item xs={12} sm={4} md={3} textAlign={{ sm: 'right' }}>
                                    <Box pr={3} pb={2} pt={2}>
                                        refers to:
                                    </Box>
                                </Grid>
                                <Grid item xs={12} sm={8} md={9}>
                                    <List>
                                        {renderRefersToRows()}
                                    </List>
                                </Grid>
                            </Grid>
                        }
                    />
                </AccordionDetails>
            </Accordion >
        )
    }

    return (
        <Card>
            <CardHeader
                title="Attestations"
            />
            <CardCover>
                <CardMedia image={"/static/images/entities/Attestation.jpg"} />
                {web3.active ? (
                    <CardCoverAction>
                        <Button
                            variant="contained"
                            component="span"
                            startIcon={<AddTwoToneIcon fontSize="small" />}
                            onClick={() => {
                                navigate("create")
                            }}
                            disabled={!web3.active}
                        >
                            {`Create Claim`}
                        </Button>
                    </CardCoverAction>
                ) : undefined}

            </CardCover>
            <CardContent>
                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <Typography>Summary</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <DetailsCardContent
                            keyValuesObject={summary}
                            hideUndefined
                            loading={getEntitiesByQuery.loading}
                            config={summaryConfig} />
                    </AccordionDetails>
                </Accordion >
                {attestations.map((attestation) => renderAttestation(attestation))}
            </CardContent>
        </Card>
    )

}

export default Attestations