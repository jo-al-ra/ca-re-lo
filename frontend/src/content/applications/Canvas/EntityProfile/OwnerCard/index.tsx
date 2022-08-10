import { FC, useState } from "react";
import {
    Card,
    Grid,
    Box,
    CardContent,
    Typography,
    Link
} from '@mui/material';

import DoneAllTwoToneIcon from '@mui/icons-material/DoneAllTwoTone';
import ContentCopyTwoToneIcon from '@mui/icons-material/ContentCopyTwoTone';
import ErrorTwoToneIcon from '@mui/icons-material/ErrorTwoTone';

export interface OwnerCardProps {
    ownerName: string;
    ownerAddress: string;
    ownerVerified: boolean;
    onClickTransfer: () => void;
    blockscoutLink: string;
    loading: boolean;

}



const OwnerCard: FC<OwnerCardProps> = (props) => {
    if (props.loading) {
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
                            {props.ownerVerified ? "Ownership verified" : "Ownership unclear"}
                        </Typography>
                    </Grid>
                    <Grid item md={2}>
                        {
                            props.ownerVerified ?
                                <DoneAllTwoToneIcon color="success" fontSize="large" />
                                :
                                <ErrorTwoToneIcon color="error" fontSize="large" />
                        }
                    </Grid>
                </Grid>
                <Link
                    href={props.blockscoutLink}
                    target="_blank"
                    rel="noreferrer noopener"
                >
                    check on blockscout
                </Link>
                <Box sx={{ pt: 3 }}>
                    <Typography variant="h5" gutterBottom noWrap>
                        name of the owner:
                    </Typography>
                    <Grid container alignItems="center">
                        <Grid item xs={11}>
                            <Typography variant="subtitle2" noWrap mr={1}>
                                {props.ownerName}
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
                        address of the owner:
                    </Typography>
                    <Grid container alignItems="center">
                        <Grid item xs={11}>
                            <Typography variant="subtitle2" noWrap mr={1}>
                                {props.ownerAddress}
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
        </Card>
    )
}

export default OwnerCard