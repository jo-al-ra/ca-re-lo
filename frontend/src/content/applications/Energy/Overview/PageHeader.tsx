import { Typography, Button, Grid } from '@mui/material';

import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';
import { useNavigate } from 'react-router';
import { useWeb3MetaMask } from 'src/hooks/eth/useWeb3MetaMask';

const PageHeader = () => {

  const navigate = useNavigate()
  const web3 = useWeb3MetaMask()

  const subtitle = web3.active ? `${web3.name}, these are your recent energy assets` : "These are all publicly available energy assets. Login to filter the view or create new ones"

  return (
    <Grid container justifyContent="space-between" alignItems="center">
      <Grid item>
        <Typography variant="h3" component="h3" gutterBottom>
          Energy
        </Typography>
        <Typography variant="subtitle2">
          {subtitle}
        </Typography>
      </Grid>
      <Grid item>
        <Button
          sx={{ mt: { xs: 2, md: 0 } }}
          variant="contained"
          startIcon={<AddTwoToneIcon fontSize="small" />}
          onClick={() => {
            navigate("create")
          }}
          disabled={!web3.active}
        >
          Create energy
        </Button>
      </Grid>
    </Grid>
  );
}

export default PageHeader;
