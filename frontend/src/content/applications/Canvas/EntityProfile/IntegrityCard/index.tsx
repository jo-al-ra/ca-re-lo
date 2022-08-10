import { FC } from "react";
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

export interface IntegrityCardProps {
    hash: string;
    blockscoutLink: string;
    verified: boolean;
    loading: boolean;
    dataProvider: string
}



const IntegrityCard: FC<IntegrityCardProps> = (props) => {
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
                            {props.verified ? "Integrity verified" : "Integrity violated"}
                        </Typography>
                    </Grid>
                    <Grid item md={2}>
                        {
                            props.verified ?
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
                        computed hash:
                    </Typography>
                    <Grid container alignItems="center">
                        <Grid item xs={11}>
                            <Typography variant="subtitle2" noWrap mr={1}>
                                {props.hash}
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
                        data provider:
                    </Typography>
                    <Grid container alignItems="center">
                        <Grid item xs={11}>
                            <Typography variant="subtitle2" noWrap mr={1}>
                                {props.dataProvider}
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

export default IntegrityCard