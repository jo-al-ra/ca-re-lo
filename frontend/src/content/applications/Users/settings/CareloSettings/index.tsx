import {
    Grid,
    Typography,
    CardContent,
    Card,
    Box,
    Divider,
} from '@mui/material';
import Text from 'src/components/Text';
import { useWeb3MetaMask } from 'src/hooks/eth/useWeb3MetaMask';
import { useReadCareloOwner } from 'src/hooks/eth/ens/useReadCareloOwner';
import { useEffect, useState } from 'react';
import AddControllerField from './AddControllerField';

function CareloSettings() {
    const web3 = useWeb3MetaMask()
    const { readCareloOwner } = useReadCareloOwner()
    const [careloOwner, setCareloOwner] = useState("not resolved yet")

    useEffect(() => {
        readCareloOwner().then(owner => {
            setCareloOwner(owner)
        })
    })


    return (
        <Grid item xs={12}>
            <Card>
                <Box
                    p={3}
                    display="flex"
                    alignItems="center"
                    justifyContent="space-between"
                >
                    <Box>
                        <Typography variant="h4" gutterBottom>
                            Carelo Settings
                        </Typography>
                        <Typography variant="subtitle2">
                            View details related to the carelo contract
                        </Typography>
                    </Box>
                </Box>
                <Divider />
                <CardContent sx={{ p: 4 }}>
                    <Typography variant="subtitle2">
                        <Grid container spacing={0}>
                            <Grid item xs={12} sm={4} md={3} textAlign={{ sm: 'right' }}>
                                <Box pr={3} pb={2}>
                                    owner
                                </Box>
                            </Grid>
                            <Grid item xs={11} sm={7} md={8}>
                                <Text color="black">
                                    <b>{careloOwner}</b>
                                </Text>
                            </Grid>
                            {careloOwner === web3.name || careloOwner === web3.account ? <AddControllerField /> : undefined}
                        </Grid>
                    </Typography>
                </CardContent>
            </Card>
        </Grid>
    );
}

export default CareloSettings;
