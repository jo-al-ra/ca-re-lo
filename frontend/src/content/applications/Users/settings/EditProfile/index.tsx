import {
  Grid,
  Typography,
  CardContent,
  Card,
  Box,
  Divider,
} from '@mui/material';
import DoneTwoToneIcon from '@mui/icons-material/DoneTwoTone';
import Label from 'src/components/Label';
import { useRegisterReverse } from 'src/hooks/eth/ens/useRegisterReverse';
import { useWeb3MetaMask } from 'src/hooks/eth/useWeb3MetaMask';
import SingleTextField from './SingleTextField';
import { useSnackbar } from 'notistack';
import { useSetAvatar } from 'src/hooks/eth/ens/useSetAvatar';
import { useReadCareloOwner } from 'src/hooks/eth/ens/useReadCareloOwner';
import { useEffect, useState } from 'react';
import CloseTwoTone from '@mui/icons-material/CloseTwoTone';

function EditProfile() {
  const web3 = useWeb3MetaMask()
  const { registerAddress } = useRegisterReverse()
  const { setAvatar } = useSetAvatar()
  const { enqueueSnackbar } = useSnackbar()
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
              Personal Details
            </Typography>
            <Typography variant="subtitle2">
              Manage information related to your personal details in ENS
            </Typography>
          </Box>
        </Box>
        <Divider />
        <CardContent sx={{ p: 4 }}>
          <Typography variant="subtitle2">
            <Grid container spacing={0}>
              <SingleTextField
                title='Name'
                description='an easy to read name to be displayed instead of your address'
                value={web3.name}
                suffix=".carelo"
                onSubmit={async (value) => {
                  try {
                    await registerAddress(value)
                    enqueueSnackbar(`Updated your name to ${value}.carelo`, {
                      variant: "success"
                    })
                    web3.updateUserInfo(web3.account)
                  } catch (e) {
                    enqueueSnackbar(e.message ?? "Failed setting your name. Please try again", {
                      variant: "error"
                    })
                  }
                }} />
              <SingleTextField
                title='Avatar'
                description='Image to be displayed as a profile picture'
                value={web3.avatar}
                disabled={web3.name === "Unnamed User"}
                onSubmit={async (value) => {
                  try {
                    await setAvatar(value)
                    enqueueSnackbar(`Updated your avatar to ${value}`, {
                      variant: "success"
                    })
                    web3.updateUserInfo(web3.account)
                  } catch (e) {
                    enqueueSnackbar(e.message ?? "Failed setting your avatar. Please try again", {
                      variant: "error"
                    })
                  }
                }} />

              <Grid item xs={12} sm={4} md={3} textAlign={{ sm: 'right' }}>
                <Box pr={3} pb={2}>
                  controller status:
                </Box>
              </Grid>
              <Grid item xs={12} sm={8} md={9}>
                {web3.isCareloController ? (
                  <Label color="success">
                    <DoneTwoToneIcon fontSize="small" />
                    <b>Active</b>
                  </Label>
                )
                  :
                  (
                    <Label color="error">
                      <CloseTwoTone fontSize="small" />
                      <b>Suspended</b>
                    </Label>
                  )}
              </Grid>
            </Grid>
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  );
}

export default EditProfile;
