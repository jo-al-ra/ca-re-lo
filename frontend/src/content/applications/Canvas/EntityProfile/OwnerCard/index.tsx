import { FC, useEffect, useState } from "react";
import {
    Card,
    Grid,
    Box,
    CardContent,
    Typography,
    Link,
    CardActions,
    Button,
    Tooltip
} from '@mui/material';

import DoneAllTwoToneIcon from '@mui/icons-material/DoneAllTwoTone';
import ContentCopyTwoToneIcon from '@mui/icons-material/ContentCopyTwoTone';
import ErrorTwoToneIcon from '@mui/icons-material/ErrorTwoTone';
import { useFindLatestOwnerTx } from "src/hooks/eth/ens/useFindLatestOwnerTx";

export interface OwnerCardProps {
    listedOwner: string;
    onClickTransfer: () => void;
    id: string

}

interface OwnerCardState {
    ownerName?: string;
    ownerAddress?: string;
    ownerVerified?: boolean;
    blockscoutLink?: string;
    loading: boolean;
    tokenId?: string;
}



const OwnerCard: FC<OwnerCardProps> = (props) => {
    const [state, setState] = useState<OwnerCardState>({
        loading: true
    })
    const findLatestOwnerTx = useFindLatestOwnerTx();
    useEffect(() => {
        findLatestOwnerTx
            .findTx(props.id)
            .then(latestOwner => {
                setState({
                    tokenId: latestOwner.tokenId.toString(),
                    ownerName: latestOwner.ownerName,
                    ownerAddress: latestOwner.ownerAddress,
                    ownerVerified: props.listedOwner === latestOwner.ownerName || props.listedOwner === latestOwner.ownerAddress,
                    loading: false,
                    blockscoutLink: `http://localhost:4000/tx/${latestOwner.txHash}`
                })
            })
    }, [props.id, findLatestOwnerTx.findTx])
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
                            {state.ownerVerified ? "Ownership verified" : "Ownership unclear"}
                        </Typography>
                    </Grid>
                    <Grid item md={2}>
                        {
                            state.ownerVerified ?
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
                        owner:
                    </Typography>
                    <Grid container alignItems="center">
                        <Grid item xs={11}>
                            <Typography variant="subtitle2" noWrap mr={1}>
                                {state?.ownerName ?? state?.ownerAddress}
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
                        tokenId:
                    </Typography>
                    <Grid container alignItems="center">
                        <Grid item xs={11}>
                            <Typography variant="subtitle2" noWrap mr={1}>
                                {state.tokenId}
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
                        Transfer
                    </Button>
                </Tooltip>
            </CardActions>
        </Card>
    )
}

export default OwnerCard