import { FC, useEffect, useState } from "react";
import {
    Card,
    Grid,
    Box,
    CardContent,
    Typography,
    Link,
    Button,
    CardActions,
    Tooltip
} from '@mui/material';

import DoneAllTwoToneIcon from '@mui/icons-material/DoneAllTwoTone';
import ContentCopyTwoToneIcon from '@mui/icons-material/ContentCopyTwoTone';
import ErrorTwoToneIcon from '@mui/icons-material/ErrorTwoTone';
import { useFindLatestContenthashTx } from "src/hooks/eth/ens/useFindLatestContenthashTx";
import { keyValues2contenthash } from "src/utils/ngsi-ld/conversion";
import { useGetEntityById } from "src/hooks/api/ngsi-ld/useGetEntityById";

export interface IntegrityCardProps {
    id: string;
    onIntegrityVerified: (integrityProven: boolean) => void;
}

interface IntegrityCardState {
    storedContenthash?: string;
    computedContenthash?: string;
    blockscoutLink?: string;
    verified?: boolean;
    loading: boolean;
    dataProvider?: string;
}



const IntegrityCard: FC<IntegrityCardProps> = (props) => {
    const findLatestContenthashTx = useFindLatestContenthashTx()
    const { makeRequest, error, responseStatus } = useGetEntityById(process.env.REACT_APP_CARELO_JSON_CONTEXT ?? "http://context/json-context.jsonld")
    const [state, setState] = useState<IntegrityCardState>({ loading: true })

    const verifyIntegrity = async () => {
        const latestContenthash = await findLatestContenthashTx.findTx(props.id)
        const computedContenthash = await keyValues2contenthash(
            await makeRequest(props.id, true),
            process.env.REACT_APP_CARELO_JSON_CONTEXT ?? "https://raw.githubusercontent.com/jo-al-ra/ca-re-lo/main/data-models/json-context.jsonld"
        )
        const integrityProven = computedContenthash === latestContenthash.contenthash
        props.onIntegrityVerified(integrityProven)
        setState({
            storedContenthash: latestContenthash.contenthash,
            computedContenthash: computedContenthash,
            blockscoutLink: `http://localhost:4000/tx/${latestContenthash?.txHash}`,
            verified: computedContenthash === latestContenthash.contenthash,
            loading: false,
            dataProvider: latestContenthash.dataProvider
        })
    }

    useEffect(() => {
        verifyIntegrity()
    }, [props.id, findLatestContenthashTx.findTx])

    if (state.loading) {
        return (
            <Typography>
                loading
            </Typography>
        )
    }
    return (
        <Card sx={{ px: 1 }}>
            <CardContent>
                <Grid container alignItems="center">
                    <Grid item md={10}>
                        <Typography variant="h3" noWrap>
                            {state.verified ? "Integrity verified" : "Integrity violated"}
                        </Typography>
                    </Grid>
                    <Grid item md={2}>
                        {
                            state.verified ?
                                <DoneAllTwoToneIcon color="success" fontSize="large" />
                                :
                                <ErrorTwoToneIcon color="error" fontSize="large" />
                        }
                    </Grid>
                </Grid>
                <Link
                    href={state.blockscoutLink}
                    target="_blank"
                    rel="noreferrer noopener"
                >
                    check on blockscout
                </Link>
                <Box sx={{ pt: 3 }}>
                    <Typography variant="h5" gutterBottom noWrap>
                        data provider:
                    </Typography>
                    <Grid container alignItems="center">
                        <Grid item xs={11}>
                            <Typography variant="subtitle2" noWrap mr={1}>
                                {state.dataProvider}
                            </Typography>

                        </Grid>
                        <Grid item xs={1}>
                            <ContentCopyTwoToneIcon
                                fontSize="small"
                                color="action" //TODO onclick
                            />
                        </Grid>
                    </Grid>
                </Box>
                <Box sx={{ pt: 3 }}>
                    <Typography variant="h5" gutterBottom noWrap>
                        computed hash:
                    </Typography>
                    <Grid container alignItems="center">
                        <Grid item xs={11}>
                            <Typography variant="subtitle2" noWrap mr={1}>
                                {state.computedContenthash}
                            </Typography>

                        </Grid>
                        <Grid item xs={1}>
                            <ContentCopyTwoToneIcon
                                fontSize="small"
                                color="action" //TODO onclick
                            />
                        </Grid>
                    </Grid>
                </Box>
            </CardContent>
            <CardActions>
                <Tooltip title="not implemented yet">
                    <Button
                        variant="contained"
                        component="span"
                    >
                        Edit
                    </Button>
                </Tooltip>
            </CardActions>
        </Card>
    )
}

export default IntegrityCard