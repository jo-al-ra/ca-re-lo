import {
  Box,
  Button,
  Container,
  Grid,
  Typography
} from '@mui/material';

import { useNavigate } from 'react-router-dom';

import { styled } from '@mui/material/styles';
import { useWeb3MetaMask } from 'src/hooks/eth/useWeb3MetaMask';

const TypographyH1 = styled(Typography)(
  ({ theme }) => `
    font-size: ${theme.typography.pxToRem(50)};
`
);

const TypographyH2 = styled(Typography)(
  ({ theme }) => `
    font-size: ${theme.typography.pxToRem(17)};
`
);

const LabelWrapper = styled(Box)(
  ({ theme }) => `
    background-color: ${theme.colors.success.main};
    color: ${theme.palette.success.contrastText};
    font-weight: bold;
    border-radius: 30px;
    text-transform: uppercase;
    display: inline-block;
    font-size: ${theme.typography.pxToRem(11)};
    padding: ${theme.spacing(.5)} ${theme.spacing(1.5)};
    margin-bottom: ${theme.spacing(2)};
`
);

const MuiAvatar = styled(Box)(
  ({ theme }) => `
    width: ${theme.spacing(8)};
    height: ${theme.spacing(8)};
    border-radius: ${theme.general.borderRadius};
    background-color: #e5f7ff;
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto ${theme.spacing(2)};

    img {
      width: 60%;
      height: 60%;
      display: block;
    }
`
);

const TsAvatar = styled(Box)(
  ({ theme }) => `
    width: ${theme.spacing(8)};
    height: ${theme.spacing(8)};
    border-radius: ${theme.general.borderRadius};
    background-color: #dfebf6;
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto ${theme.spacing(2)};

    img {
      width: 60%;
      height: 60%;
      display: block;
    }
`
);

function Hero() {

  const web3WithWallet = useWeb3MetaMask()
  const navigate = useNavigate();

  const ProceedWithWalletButton = () => {
    if (web3WithWallet.active) {
      return (<Button
        size="large"
        variant="contained"
        onClick={() => {
          navigate("/dashboards/crypto")
        }}
      >
        Proceed with MetaMask
      </Button>)
    } else {
      return (<Button
        size="large"
        variant="contained"
        onClick={() => {
          web3WithWallet.activate().then(() => {
            navigate("/dashboards/crypto")
          })
        }}
      >
        Log in with MetaMask
      </Button>)
    }
  }

  return (
    <Container maxWidth="lg" sx={{ textAlign: 'center' }}>
      <Grid spacing={{ xs: 6, md: 10 }} justifyContent="center" alignItems="center" container>
        <Grid item md={10} lg={8} mx="auto">
          <LabelWrapper color="success">Version 0.0.1</LabelWrapper>
          <TypographyH1 sx={{ mb: 2 }} variant="h1">
            CaReLo Dashboard
          </TypographyH1>
          <TypographyH2
            sx={{ lineHeight: 1.5, pb: 4 }}
            variant="h4"
            color="text.secondary"
            fontWeight="normal"
          >
            Manage and investigate the shared audit trails of carbon removal processes in the Carbon Removal Log (CaReLo)
          </TypographyH2>
          <ProceedWithWalletButton />
          <Button
            sx={{ ml: 2 }}
            size="large"
            variant="text"
            onClick={() => {
              if (web3WithWallet.active) {
                web3WithWallet.deactivate()
              }
              navigate("/dashboards/crypto")
            }}
          >
            View as Guest
          </Button>
          <Grid container spacing={3} mt={5}>
            <Grid item md={6}>
              <MuiAvatar>
                <img src="/static/images/logo/material-ui.svg" alt="Material-UI" />
              </MuiAvatar>
              <Typography variant="h4">
                <Box sx={{ pb: 2 }}><b>Powered by Material-UI</b></Box><Typography component="span" variant="subtitle2"> - A simple and customizable component library to build faster, beautiful, andaccessible React apps.</Typography>
              </Typography>
            </Grid>
            <Grid item md={6}>
              <TsAvatar>
                <img src="/static/images/logo/typescript.svg" alt="Typescript" />
              </TsAvatar>
              <Typography variant="h4">
                <Box sx={{ pb: 2 }}><b>Built with Typescript</b></Box><Typography component="span" variant="subtitle2"> - Tokyo Free White features a modern technology stack and is built with React + Typescript.</Typography>
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Hero;
