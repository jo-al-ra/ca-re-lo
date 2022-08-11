import { Typography, Box, Tooltip, IconButton, Card, CardMedia, Button } from '@mui/material';
import { FC } from 'react';
import { styled } from '@mui/material/styles';
import ArrowBackTwoToneIcon from '@mui/icons-material/ArrowBackTwoTone';
import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';
import { useNavigate } from 'react-router';
import { useWeb3MetaMask } from 'src/hooks/eth/useWeb3MetaMask';

interface PageHeaderProps {
    className?: string;
    entityCategory: string;
    image: string;
    categoryDescription: string
}

const CardCover = styled(Card)(
    ({ theme }) => `
      position: relative;
  
      .MuiCardMedia-root {
        height: ${theme.spacing(30)};
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


const EntityOverviewPageHeader: FC<PageHeaderProps> = (props) => {
    const web3 = useWeb3MetaMask()
    const navigate = useNavigate()

    const loggedInSubtitle = `${web3.name}, below are ${props.entityCategory} entities owned by you. New entities can be created directly using the button. However, it is recommended to create new entities by selecting the inputs first and creating an activity.`
    const loggedOutSubtitle = `Below are all publicly available ${props.entityCategory} entities. Login to filter the view or create new ones`

    const subtitle = web3.active ? loggedInSubtitle : loggedOutSubtitle

    return (
        <>
            <CardCover>
                <CardMedia image={props.image} />
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
                            {`Create ${props.entityCategory}`}
                        </Button>
                    </CardCoverAction>
                ) : undefined}

            </CardCover>
            <Box display="flex" mb={3} mt={1} ml={1}>
                <Box>
                    <Typography variant="h3" component="h3" gutterBottom>
                        {`${props.entityCategory} Entities`}
                    </Typography>
                    <Typography variant="subtitle2">
                        {props.categoryDescription}
                    </Typography>
                </Box>
            </Box>
        </>
    );
}

export default EntityOverviewPageHeader;
